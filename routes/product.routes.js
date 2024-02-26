const productController = require("../controllers/product.controller")
const {authJwt} = require('../middlewares')

module.exports = (app)=>{
    app.post("/ecomm/api/v1/products", [authJwt.verifyToken, authJwt.isAdmin, ], productController.createNewProduct);
    app.get("/ecomm/api/v1/products", [authJwt.verifyToken], productController.getAllProducts);
}