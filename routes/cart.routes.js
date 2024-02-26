const cartController = require("../controllers/cart.controller")
const {authJwt} = require('../middlewares')

module.exports = (app)=>{
    app.post("/ecomm/api/v1/carts", [authJwt.verifyToken ], cartController.createNewCart);
    app.put("/ecomm/api/v1/carts/:id", [authJwt.verifyToken ], cartController.updateCart);
}