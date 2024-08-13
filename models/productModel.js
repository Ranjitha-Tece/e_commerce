const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    id:String,
    title:String,
    price:Number,
    category:String,
    image:String,
    rating:{
        rate:Number,
        count:Number
    }
})

const Product = new mongoose.model('Product',ProductSchema)

module.exports = Product;