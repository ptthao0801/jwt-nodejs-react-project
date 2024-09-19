import { where } from "sequelize";
import db from "../models/models/index";
import bcrypt from 'bcryptjs';
import {Op} from "sequelize";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail}
    })

    if(user){
        return true;
    }

    return false;
}

const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone}
    })

    if(user){
        return true;
    }

    return false;
}

const registerNewUser = async (rawUserData) => {
    try {
        //check if email/phone exists
        let isEmailExist = await checkEmailExist(rawUserData.email);
        if(isEmailExist === true){
            return {
                EM: 'Email already exists',
                EC: 1
            }
        }

        let isPhoneExist = await checkPhoneExist(rawUserData.phone);
        if(isPhoneExist === true){
            return {
                EM: 'Phone number already exists',
                EC: 1
            }
        }
        //hash password
        let hashPassword = hashUserPassword(rawUserData.password);

        //create new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            password: hashPassword,
            phone: rawUserData.phone
        })

        return {
            EM: 'Your account is successfully created!',
            EC: 0
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'Something is wrong in service',
            EC: -2
        }
    }
}

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);
}

const handleUserLogin = async (rawData) => {
    try {
        //check if email/phone exists
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    {email: rawData.valueLogin},
                    {phone: rawData.valueLogin}
                ]
            }
        })
        console.log('>>> user: ', user)

        //if user exists -> check password
        if(user){
            console.log('User found!')
            let isCorrectPassword = checkPassword(rawData.password, user.password)
            if(isCorrectPassword === true) {
                return {
                    EM: 'Login successully!',
                    EC: 0,
                    DT: ''
                }
            } else {
                console.log(">>> WRONG PASSWORD! with email address/phone: ", rawData.valueLogin)
                return {
                    EM: 'Your email address/password is incorrect!',
                    EC: -1,
                    DT: ''
                }
            }
        } else {
            console.log(">>> WRONG EMAIL ADDRESS/PHONE", rawData.valueLogin)
            return {
                EM: 'Your email address/password is incorrect!',
                EC: -1,
                DT: ''
            }
        }            
        
        // true -> home
        
    } catch (error) {
        console.log(error)
        return {
            EM: 'something is wrong in service', //error message
            EC: '-1', //error code
            DT: '' //data
        }
    }
}

module.exports = {
    registerNewUser,
    handleUserLogin
}