import db from "../models/models/index";

const getGroups = async () => {
    try {
        let data = await db.Group.findAll({
            order: [['name', 'ASC']]
        });
        if (data){
            return {
                EM: 'Pulled group data successfully!',
                EC: 0,
                DT: data
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

module.exports = {
    getGroups
}