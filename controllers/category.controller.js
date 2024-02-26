const Category = require("../models/category.model")


/**
 * Controller to create a new category
 */
exports.createNewCategory = async (req,res)=>{
    try{
        const data = {
            name : req.body.name,
            description : req.body.description    
        }
    
        const category = await Category.create(data);
        console.log(`#### New category '${category.name}' created ####`);
        res.status(201).send(category);


    }catch(err){
        console.log("#### Error while creating new category #### ", err);
        res.status(500).send({
            message : "Internal server error while creating new category"
        });
    }
}

/**
 * Controller to fetch all the categories
 */
exports.getAllCategories = async (req,res)=>{
    try{
        const categories = await Category.find();
    
        res.status(200).send(categories);
    
     }catch(err){
        console.log("#### Error while getting all categories ####", err.message);
        res.status(500).send({
            message : "Internal server error while getting all categories"
        })
    }
 }

 /**
  * Get a category based on the name 
  */

 exports.getSingleCategory = async (req,res)=>{

    try{
        const category = await Category.find({name : req.params.category_name})
    
        res.status(200).send(category);
 
     }catch(err){
        console.log(`#### Error while getting the category with name = ${req.params.category_name} ####`, err.message);
        res.status(500).send({
            message : "Internal server error while getting the category"
        })
    }
 
 }


 /**
  * Updating a category
  */
 exports.editCategory = async (req,res)=>{
    try{
        const category = await Category.findOne({name : req.params.category_name})
 
        category.name = req.body.name ? req.body.name : category.name
        category.description = req.body.description ? req.body.description : category.description
        
        console.log(category)
        const updatedCategory = await category.save();
 
        console.log(`#### Category '${updatedCategory.name}' data updated ####`);
        res.status(200).send(updatedCategory);
 
     }catch(err){
        console.log("#### Error while updating category data #### ", err.message);
        res.status(500).send({
            message : "Internal server error while updating category data"
        });
    }
 }

