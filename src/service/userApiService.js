import db from '../models/models/index';
import {checkEmailExist, checkPhoneExist, hashUserPassword} from './loginRegisterService';

const getAllUser = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ['id', 'username', 'email', 'phone', 'sex'],
            include: {model: db.Group, attributes: ['name', 'description']}
        });
        console.log(">>> check users: ", users)
        if (users){
            return {
                EM: 'Pulled data successfully!',
                EC: 0,
                DT: users
            }
        } else {
            return {
                EM: 'Cant get data!',
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'Something is wrong in service',
            EC: 1,
            DT: []
        }
    }
}

const getUserWithPagination = async (page, limit) => {
    try {
        let offSet = (page - 1) * limit;

        const {count, rows} = await db.User.findAndCountAll({
            offset: offSet,
            limit: limit,
            attributes: ['id', 'username', 'email', 'phone', 'sex', 'address'],
            include: {model: db.Group, attributes: ['name', 'description', 'id']},
            order: [['id', 'DESC']]
        })

        let totalPages = Math.ceil(count/limit);

        console.log('check total pages: ', totalPages)

        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }

        return {
            EM: 'Success',
            EC: 0,
            DT: data
        }

    } catch (error) {
        console.log(error)
        return {
            EM: 'Something is wrong in service',
            EC: 1,
            DT: []
        }
    }
}

const createNewUser = async (data) => {
    try {
        //check if email/phone exists
        let isEmailExist = await checkEmailExist(data.email);
        if(isEmailExist === true){
            return {
                EM: 'Email already exists',
                EC: 1,
                DT: 'email'
            }
        }

        let isPhoneExist = await checkPhoneExist(data.phone);
        if(isPhoneExist === true){
            return {
                EM: 'Phone number already exists',
                EC: 1,
                DT: 'phone'
            }
        }
        //hash password
        let hashPassword = hashUserPassword(data.password);

        await db.User.create({...data, password: hashPassword})
        return {
            EM: 'Successully created a new user!',
            EC: 0,
            DT: data
        }
    } catch (error) {
        console.log(error)
    }
}

const updateUser = async (data) => {
    try {
        if(!data.groupId){
            return {
                EM: 'Error with empty GroupId',
                EC: 1,
                DT: 'group'
            }
        }
        let user = await db.User.findOne({
            where: {id: data.id}
        })
        if(user){
            //update
            await user.update({
                username: data.username,
                address: data.address,
                sex: data.sex,
                groupId: data.groupId
            })
            return {
                EM: 'Saved changes!',
                EC: 0,
                DT: user
            }
        } else {
            //not found
            return {
                EM: 'User not found',
                EC: 2,
                DT: ''
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'Something is wrong in service update',
            EC: 1,
            DT: []
        }
    }
}

const deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({
            where: {id: id}
        })

        if(user){
            await user.destroy();
            return {
                EM: 'Deleted user successfully!',
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: 'User not found',
                EC: 2,
                DT: []
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'Something is wrong in service',
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    getAllUser, createNewUser, updateUser, deleteUser, getUserWithPagination
}