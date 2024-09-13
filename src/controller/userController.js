import userApiService from '../service/userApiService';

const readFunc = async (req, res) => {
    try {
        let data = await userApiService.getAllUser();
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server', //error message
            EC: '-1', //error code
            DT: '' //data
        })
    }
}

const createFunc = async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server', //error message
            EC: '-1', //error code
            DT: '' //data
        })
    }
}

const updateFunc = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server', //error message
            EC: '-1', //error code
            DT: '' //data
        })
    }
}

const deleteFunc = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server', //error message
            EC: '-1', //error code
            DT: '' //data
        })
    }
}

module.exports = {
    readFunc, createFunc, updateFunc, deleteFunc
}