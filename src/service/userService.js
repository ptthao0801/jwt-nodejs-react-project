import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import Bluebird from 'bluebird';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password);
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: Bluebird
    });

    const [rows, fields] = await connection.execute('INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, hashPass, username]);
    // console.log(rows)
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
  
    const [rows, fields] = await connection.execute('SELECT * FROM users');
    return rows
}

const deleteUser = async (id) => {
    // Create the connection to database
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: Bluebird
    });
    try {
        const [rows, fields] = await connection.execute('DELETE FROM users WHERE id=?', [id]); 
        return rows  
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createNewUser, getUserList, deleteUser
}