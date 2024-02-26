require('dotenv').config();
const User = require('../models/user.model');
const constants = require('../utils/constants')

const isValidEmail = (email)=>{ // checks valid email format
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

const isValidPassword = (password)=>{ // checks password meets requirements
    return password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{10,25}$/);
}


const signUpBody = async (req,res,next)=>{

    try{
        if (!req.body.name){
            return res.status(400).send({
                message : "Failed! User name is not provided"
            });
        }
    
        if (!req.body.userId){
            return res.status(400).send({
                message : "Failed! UserId is not provided"
            });
        }

        const user = await User.findOne({userId: req.body.userId});
    
        if (user){
            return res.status(400).send({
                message : "Failed! userId is already taken"
            });
        }

        if (!req.body.password){
            return res.status(400).send({
                message : "Failed! Password is not provided"
            });
        }
    
        if (!isValidPassword(req.body.password)){
            return res.status(400).send({
                message : "Failed! Not a valid password. Password must be 10 to 25 characters containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
            });
        }
    
        if (!req.body.email){
            return res.status(400).send({
                message : "Failed! Email is not provided"
            });
        }
    
        if (!isValidEmail(req.body.email)){
            return res.status(400).send({
                message : "Failed! Not a valid email id"
            });
        }

        if (req.body.userType == constants.userTypes.admin){
            return res.status(400).send({
                message : "ADMIN registration is not allowed"
            });
        }
    
        const userTypes = [constants.userTypes.customer];
    
        if ( req.body.userType && !userTypes.includes(req.body.userType)){
            return res.status(400).send({
                message : "UserType provided is not correct. Possible correct values : CUSTOMER "
            });
        }
    
        next();

    }catch(err){
        console.log("#### Error while velidating sign-up request body ##### ", err.message);
        res.status(500).send({
            message : "Internal server error while sign-up validation"
        });
    }

}

const signInBody = (req, res, next) => {

    if (!req.body.userId) {
        return res.status(400).send({
            message: "Failed ! UserId is not provided"
        })
    }

    if (!req.body.password) {
        return res.status(400).send({
            message: "Failed ! Password is not provided"
        })
    }

    next();

}

const validateUserRequestBodies = {
    signUpBody,
    signInBody,
};

module.exports = validateUserRequestBodies