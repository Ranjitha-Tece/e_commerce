const Product=require('../models/productModel')
const { v4: uuidv4 } = require('uuid');

exports.getProducts=async(req,res)=>{
    try{
        const products=await Product.find();
        res.send(products);
    }
    catch(err){
        console.log(err);
    }
}
exports.createProducts=async(req,res)=>{
    const{title,description,price,category,rating,image}=req.body;
    const product=new Product({
        id:uuidv4(),
        title,
        description,
        price,
        category,
        rating,
        image,
    })
    await product.save();
    res.status(200).json("product created successfully");
}

exports.deleteProducts=async(req,res)=>{
    const {id}=req.params;
    try{
        const deleteproduct=await Product.findByIdAndDelete(id)
        if(!deleteproduct)
        {
            return res.status(404).json( "Product not found" );
        }
        res.status(200).json("Product deleted successfully" );
    }
    catch(err)
    {
        console.log(err);
    }}