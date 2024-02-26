/**
 * This file will be the start point of the application.
 */
const serverConfig = require('./configs/server.config');
const dbConfig = require('./configs/db.config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const User = require('./models/user.model');
app.use(express.json());



/**
 * DB  Connection initialization
 */
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error", ()=>{
     console.log("error while connecting to DB");
 });
 db.once("open",()=>{
    console.log("connected to Mongo DB ")
    init()
 });



/**
 * initializing the DB
 */
async function init() {


    var user = await User.findOne({ userId: "admin" });

    if (user) {
         console.log("Admin user already present");
        return;
    }

    try {

        user = await User.create({
            name: "Vishwa",
            userId: "admin", // It should be atleat 16, else will throw error
            email: "kankvish@gmail.com",  // If we don't pass this, it will throw the error
            userType: "ADMIN",
            password :bcrypt.hashSync("Welcome1", 8) //this field should be hidden from the end user

        });
        console.log(user);

    } catch (e) {
        console.log(e.message);
    }

}

/**
 * routes
 */
require('./routes/auth.routes')(app)
require('./routes/category.routes')(app)
require('./routes/product.routes')(app)
require('./routes/cart.routes')(app)


/**
 * Starting the express server
 */
app.listen(serverConfig.PORT, () => {
    console.log(`Application started on the port num : ${serverConfig.PORT}`);
})