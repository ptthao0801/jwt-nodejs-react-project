import loginRegisterService from '../service/loginRegisterService';

const testApi = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'test api'
    })
}

const handleRegister = async (req, res) => {
    // validate from server
    try {
        //req.body: email, phone, username, password
        if(!req.body.email || !req.body.phone || !req.body.password){
            return res.status(200).json({
                EM: 'missing required parameters', //error message
                EC: '1', //error code
                DT: '' //data
            })
        }

        //check password length
        if(req.body.password && req.body.password.length <4){
            return res.status(200).json({
                EM: 'Password must contain more than 3 letters', //error message
                EC: '-1', //error code
                DT: '' //data
            })
        }

        //service: create user
        let data = await loginRegisterService.registerNewUser(req.body)

        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: '' //data
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'error from server', //error message
            EC: '-1', //error code
            DT: '' //data
        })
    }
    // console.log('call me', req.body)
}

const handleLogin = async (req, res) => {
    try {
        let data = await loginRegisterService.handleUserLogin(req.body)
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT //data
        })
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
    testApi,
    handleRegister,
    handleLogin
}