const express=require('express');
const Order=require("../controllers/orderController")
const router=express.Router();
// const auth=require("../middlewares/auth");

router.post("/",Order.createorder);
router.get("/",Order.getOrder)
module.exports=router