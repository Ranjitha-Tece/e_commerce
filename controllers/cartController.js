const Cart=require("../models/cartModel");
const products = require('../models/ProductModel')
exports.createcart= async(req,res)=>{
    const {user_id}=req.user
    const {product_id,quantity}=req.body
     let cart=await Cart.findOne({user_id});

    if(!cart){
        cart = new Cart({
            user_id,
            products:[
                {
                product_id,
                quantity,
            },]
        });
    }else{
    const productindex = cart.products.findIndex((pro=>pro.product_id === product_id));
    if(!productindex > -1){
        cart.products.push({product_id,quantity});
        }else{
            cart.products[productindex].quantity = quantity;
        }
    }
    cart.save();
    res.status(201).json({message:"cart added",cart});

}

exports.getcart=async(req,res)=>{
    const {user_id}=req.user;

    const cart=await Cart.findOne({user_id});
    if(!cart){
       res.status(404).json({message:"cart is empty"});
    }
    try{
       let subtotal =0;
       const cartItems = await Promise.all(
       cart.products.map(async (product)=>{
           const productdetails= await products.findOne({id: product.product_id});
           subtotal +=productdetails.price*product.quantity;
           return{
            product_id: productdetails.id,
            title: productdetails.title,
            description: productdetails.description,
            price: productdetails.price,
            image: productdetails.image,
            quantity: product.quantity,
           };
       }));
       res.status(200).json({cartItems:cartItems,subtotal});
   
    }catch(err){
       console.error(err);
    }
};

exports.deletecart=async(req,res)=>{
    const {user_id}=req.user;
    const product_id = req.params.product_id;

    const cart=await Cart.findOne({user_id});
     if(!cart){
     return  res.status(404).json({message:"cart is empty"});
    }
    const isProductValid = cart.products.find(
        (product)=>product_id === product.product_id
    );
    if(!isProductValid){
        return res.status(404).json({ message:"Product not found in cart"});
    }
    if(cart.products.length <= 1){
        await Cart.deleteOne({user_id});
        return res.status(200).json({message:"Cart deleted successfully"});
    }else{
        cart.products= cart.products.filter((prod)=>prod.id != product_id);
        cart.save();
        res.status(200).json({message:"Cart deleted successfully"});
    }
};