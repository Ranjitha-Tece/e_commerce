const cartController=require('../controllers/cartController')
const express=require('express')
const router=express.Router();
// const auth = require('../middlewares/auth');

router.post('/' ,cartController.createCart)
router.get('/' ,cartController.getCart)
router.delete('/:product_id',cartController.deleteCart);
module.exports=router