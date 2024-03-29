const constants = require("../utils/constants");
const User = require("../models/user.model");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");



/**
 * Controller for the signup flow
 */
exports.signup = async (req, res) => {
    /**
     * Inside the sign up call
     */
    const userObj = {
        name: req.body.name,
        userId: req.body.userId,
        email: req.body.email,
        userType: req.body.userType,
        password: bcrypt.hashSync(req.body.password, 8),
    }

    try {
        const userCreated = await User.create(userObj);
        const postResponse = {
            name : userCreated.name,
            userId : userCreated.userId,
            email: userCreated.email,
            userType : userCreated.userType,
            createdAt : userCreated.createdAt,
            updatedAt : userCreated.updatedAt
        }
        res.status(201).send(postResponse);
    } catch (err) {
        console.err("Some error while saving the user in db", err.message);
        res.status(500).send({
            message: "Some internal error while inserting the element"
        })
    }

}


/**
 * Controller for the sign in flow
 */

exports.signin = async (req, res)=> {

    //Fetch the user based on the userId
    //Validating the userId 
    const user = await User.findOne({ userId: req.body.userId });
    console.log(user);
    if (user == null) {
        res.status(400).send({
            message: "Failed! Userid doesn't exist!"
        });
        return;
    }

    
    //Checkig if the password matches
    var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      console.log(user.userId)
      var token = jwt.sign({ id: user.userId }, config.secret, {
        expiresIn: 120 // 2 minutes
      });

      res.status(200).send({
        name : user.name,
        userId : user.userId,
        email: user.email,
        userType : user.userType,
        accessToken : token
      })
   
}