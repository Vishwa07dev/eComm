const Category = require("../models/category.model");
const Product = require("../models/product.model")


/**
 * Controller to create a new category
 */
exports.createNewProduct = async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            cost: req.body.cost
        }

        const product = await Product.create(data);
        console.log(`#### New product '${product.name}' created ####`);
        try {
            const category = await Category.findOne({ name: product.category })
            category.products.push(product.name)
            await category.save()
        } catch (err) {
            console.log("#### Error while updating the category #### ", err);
            return res.status(500).send({
                message: "Internal server error while updating the category of the product"
            });
        }
        res.status(201).send(product);


    } catch (err) {
        console.log("#### Error while creating new product #### ", err);
        res.status(500).send({
            message: "Internal server error while creating new product"
        });
    }
}


/**
 * Controller to fetch all the products
 */
exports.getAllProducts = async (req,res)=>{
    try{

        queryObj = {}

        if(req.query.category){
            queryObj.category = req.query.category
        }
        const products = await Product.find(queryObj);
    
        res.status(200).send(products);
    
     }catch(err){
        console.log("#### Error while getting all products ####", err.message);
        res.status(500).send({
            message : "Internal server error while getting all products"
        })
    }
 }