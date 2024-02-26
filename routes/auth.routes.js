const authController = require('../controllers/auth.controller')

const {validateUserRequestBodies} = require('../middlewares')


module.exports = (app)=>{
    app.post("/ecomm/api/v1/auth/signup", [validateUserRequestBodies.signUpBody], authController.signup)
    app.post("/ecomm/api/v1/auth/signin", [validateUserRequestBodies.signInBody], authController.signin)

}