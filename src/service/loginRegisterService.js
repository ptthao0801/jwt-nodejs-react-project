import db from "../models/models/index";
import bcrypt from 'bcryptjs';

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
        phone: hashPassword.phone
    })

    return {
        EM: 'A user is successfully created!',
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

module.exports = {
    registerNewUser
}