require('dotenv').config();
import jwt from 'jsonwebtoken';

const nonSecurePaths = ['/', '/login', '/register'];

const createJWT = (payload) => {
    let key = process.env.JWT_SECRETKEY
    let token = null;
    
    try {
        token = jwt.sign(payload, key);
    } catch (error) {
        console.log(error)
    }
    return token;
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRETKEY;
    let decoded = null;

    try {
        decoded = jwt.verify(token, key);
    } catch (error) {
        console.log(error);
    }
    return decoded;
}

const checkUserJWT = (req, res, next) => {
    if(nonSecurePaths.includes(req.path)) return next();

    let cookies = req.cookies;
    if(cookies && cookies.jwt){
        let token = cookies.jwt;
         let decoded = verifyToken(token)
         if(decoded){
            // add them tham so user vao req
            req.user = decoded;
            req.token = token;
            next();
         } else {
            return res.status(401).json({
                EC: -1,
                DT: '',
                EM: 'User not authenticated.'
            })
         }
        console.log('>>> My JWT: ', cookies.jwt)
    } else {
        return res.status(401).json({
            EC: -1,
            DT: '',
            EM: 'User not authenticated.'
        })
    }
    
}

const checkUserPermission = (req, res, next) => {
    if(nonSecurePaths.includes(req.path) || req.path === '/account') return next();

    if (req. user){
        let email = req.user.email
        let roles = req.user.groupWithRoles.Roles
        let currentUrl = req.path

        if(!roles || roles.length === 0) {
            return res.status(403).json({
                EC: -1,
                DT: '', 
                EM: 'No permission to access.'
            })
        }
        let canAccess = roles.some(item => item.url === currentUrl)
        if(canAccess === true){
            next();
        } else {
            return res.status(403).json({
                EC: -1,
                DT: '',
                EM: 'Not permitted to access.'
            })
        }
    } else {
        return res.status(401).json({
            EC: -1,
            DT: '',
            EM: 'User not authenticated.'
        })
    }
}

module.exports = {
    createJWT, verifyToken, checkUserJWT, checkUserPermission
}