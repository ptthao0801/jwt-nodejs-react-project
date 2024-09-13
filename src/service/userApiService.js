import db from '../models/models/index';

const getAllUser = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ['id', 'username', 'email', 'phone', 'sex'],
            include: {model: db.Group, attributes: ['name', 'description']},
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
        console.log(error)
    }
}

const createNewUser = async (data) => {
    try {
        await db.User.create({})
    } catch (error) {
        console.log(error)
    }
}

const updateUser = async (data) => {
    try {
        let user = await db.user.findOne({
            where: {id: data.id}
        })
        if(user){
            //update
            user.save({

            })
        } else {
            //not found
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async (id) => {
    try {
        await db.User.delete({
            where: {id: id}
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllUser, createNewUser, updateUser, deleteUser
}