const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config')
const User = require('../models/user.model')
const constants = require('../utils/constants')


const verifyToken = (req,res,next)=>{
    const token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({
            message : "no token provided! Access prohibited"
        })
    }

    jwt.verify(token, authConfig.secret, async (err, decoded)=>{
        if(err){
            return res.status(401).send({
                message : "UnAuthorised!"
            })
        }
        const user = await User.findOne({userId : decoded.id});
        if(!user){
            return res.status(400).send({
                message : "The user that this token belongs to does not exist"
            })
        }
        req.user = user;
        next();
    })
}

const isAdmin = async (req,res,next)=>{
    const user = req.user;
    if (user && user.userType == constants.userTypes.admin){
        next();
    }else{
        return res.status(403).send({
            message : "only ADMIN users are allowed to access this endpoint"
        })
    }
}

const authJwt = {
    verifyToken,
    isAdmin   
}

module.exports = authJwt