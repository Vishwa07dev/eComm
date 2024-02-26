const categoryController = require("../controllers/category.controller")
const {authJwt} = require('../middlewares')

module.exports = (app)=>{
    app.post("/ecomm/api/v1/categories", [authJwt.verifyToken, authJwt.isAdmin, ], categoryController.createNewCategory);
    app.get("/ecomm/api/v1/categories", [authJwt.verifyToken ], categoryController.getAllCategories);
    app.get("/ecomm/api/v1/categories/:category_name", [authJwt.verifyToken ], categoryController.getSingleCategory);
    app.put("/ecomm/api/v1/categories/:category_name", [authJwt.verifyToken, authJwt.isAdmin ], categoryController.editCategory);
 }