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
    let users = [];
    users = await db.User.findAll();
    return users;

    // Create the connection to database
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: Bluebird
    // });
  
    // const [rows, fields] = await connection.execute('SELECT * FROM user');
    // return rows
}

const deleteUser = async (userId) => {
    // Delete everyone named "Jane"
    await db.User.destroy({
        where: {
        id: userId,
        },
    });
    // Create the connection to database
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: Bluebird
    // });
    // try {
    //     const [rows, fields] = await connection.execute('DELETE FROM user WHERE id=?', [id]); 
    //     return rows  
    // } catch (error) {
    //     console.log(error)
    // }
}

const getUserById = async (userId) => {
    let user = {};
    user = await db.User.findOne({
        where: {id: userId}
    })
    return user;
    // Create the connection to database
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: Bluebird
    // });
    // try {
    //     const [rows, fields] = await connection.execute('SELECT * FROM user WHERE id=?', [id]); 
    //     return rows  
    // } catch (error) {
    //     console.log(error)
    // }
}

const updateUserInfor = async (userEmail, userUsername, userId) => {
    // Change everyone without a last name to "Doe"
    await db.User.update(
        { 
            email: userEmail, 
            username: userUsername,
        },
        {
        where: {
            id: userId,
        },
        },
    );
    // Create the connection to database
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: Bluebird
    // });
    // try {
    //     const [rows, fields] = await connection.execute('UPDATE user SET email = ?, username = ? WHERE id = ?', [email, username, id]); 
    //     return rows  
    // } catch (error) {
    //     console.log(error)
    // }
}

module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUserInfor
}