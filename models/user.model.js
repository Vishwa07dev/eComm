const mongoose = require("mongoose");
const constants = require('../utils/constants');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        lowercase: true, // it will covert the email into the lower case and then store in the db,
        minLength: 10,  // anything less than 10 will fail
        unique: true

    },
    
    userType: {
        type: String,
        required: true,
        default: constants.userTypes.customer,
        enum : [constants.userTypes.customer, constants.userTypes.admin]
    }
    

},{
    timestamps: true, versionKey: false
})


module.exports = mongoose.model("User", userSchema);