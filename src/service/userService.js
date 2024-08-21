import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import Bluebird from 'bluebird';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = (email, password, username) => {
    let hashPass = hashUserPassword(password);

    //connect to database
    connection.query(
        'INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, hashPass, username],
        function(err, results, fields) {
          console.log(results); // results contains rows returned by server
        }
    );
}

const getUserList = async () => {
    // Create the connection to database
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: Bluebird
    });
    let users = [];
    // connection.query(
    //     'SELECT * FROM users', 
    //     function(err, results, fields) {
    //         if (err) {
    //             console.log(err);
    //             return users;
    //         }
    //         users = results;
    //         return users;
    //     }
    // );
    const [rows, fields] = await connection.execute('SELECT * FROM users');
    return rows
}

module.exports = {
    createNewUser, getUserList
}