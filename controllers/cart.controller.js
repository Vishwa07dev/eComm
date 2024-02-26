const Category = require("../models/category.model");
const Product = require("../models/product.model")
const Cart = require("../models/cart.model")


/**
 * Controller to create a new cart
 */
exports.createNewCart = async (req, res) => {
    try {
        const cart = await Cart.create({});
        console.log(`#### New Cart '${cart._id}' created ####`);
        res.status(201).send(cart);
    } catch (err) {
        console.log("#### Error while creating new cart #### ", err);
        res.status(500).send({
            message: "Internal server error while creating new cart"
        });
    }
}


/**
 * Update the cart
 */
exports.updateCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({_id : req.params.id});

        cart.products = req.body.products ? req.body.products : cart.products
        
        if(cart.products){
            let cost = 0
            for( p of cart.products ){
                console.log(p)
                prod =  await Product.findOne({name : p})
                console.log(prod.cost)
                cost += prod.cost
            }
            console.log(cost)
            cart.total_cost = cost
        }
        
        updated_cart = await cart.save()
        console.log(`#### Cart '${cart._id}' updated ####`);
        res.status(200).send(cart);
    } catch (err) {
        console.log("#### Error while updating the cart #### ", err);
        res.status(500).send({
            message: "Internal server error while updating the cart"
        });
    }
}