const  mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true,
        unique: true
    },
    description : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    cost : {
        type : Number,
        required : true
    }


},{ timestamps : true , versionKey : false})

module.exports = mongoose.model("Product" , productSchema);