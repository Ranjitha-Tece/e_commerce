const Order=require("../models/orderModel");
const User =require("../models/userModel")
const Cart=require("../models/cartModel");

exports.createorder=async(req,res)=>{
    // const {user_id}=req.user;
    const{customerName,customerAddress,phoneNo,product_id,quantity,OrderDate,DeliveryDate}=req.body;
    // let cart=await Cart.findOne({user_id});
    // if(!cart){
    //     return res.status(404).json({message:"Cart not found"});
    // }

    const { user_id} = req.user;
    let user =await User.findOne({_id:user_id});
    const email=user.email


    try{
        const order=new Order({
            user_id,
            customerName,
            email,
            customerAddress,
            phoneNo,
            product_id,
            quantity,
            OrderDate,
            DeliveryDate,
        });
        
        await order.save();
        res.status(200).json("Order created successfully");
    }catch (err) {
        res.status(500).json({ message: "Failed to create order", error: err });
    
}
}
exports.getOrder=async(req,res)=>{
    const {user_id}=req.user;
    try{
        const orders=await Order.find({user_id});
        res.status(200).json(orders);
        }
        catch(err){
            console.log(err);
            res.status(400).json({message:"Error fetching orders"});
            }

}