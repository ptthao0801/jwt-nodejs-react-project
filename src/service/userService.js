import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import Bluebird from 'bluebird';
import db from '../models/models';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password);
    try {
        await db.User.create({
            email: email,
            password: hashPass,
            username: username
        })
    } catch (error) {
        console.log(error)
    }
}

const getUserList = async () => {
    // Create the connection to database
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: Bluebird
    });
    let user = [];
  
    const [rows, fields] = await connection.execute('SELECT * FROM user');
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
        const [rows, fields] = await connection.execute('DELETE FROM user WHERE id=?', [id]); 
        return rows  
    } catch (error) {
        console.log(error)
    }
}

const getUserById = async (id) => {
    // Create the connection to database
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: Bluebird
    });
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM user WHERE id=?', [id]); 
        return rows  
    } catch (error) {
        console.log(error)
    }
}

const updateUserInfor = async (email, username, id) => {
    // Create the connection to database
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: Bluebird
    });
    try {
        const [rows, fields] = await connection.execute('UPDATE user SET email = ?, username = ? WHERE id = ?', [email, username, id]); 
        return rows  
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUserInfor
}