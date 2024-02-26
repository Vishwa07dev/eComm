const  mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({

    products : {
        type : [String],
        default : []
    },
    total_cost : {
        type : Number,
        default : 0
    }


},{ timestamps : true , versionKey : false})

module.exports = mongoose.model("Cart" , cartSchema);