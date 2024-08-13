const productController=require('../controllers/productController')
const express=require('express')
const router=express.Router();
// const auth = require('../middlewares/auth')


router.get('/',productController.getProducts)
router.post('/',productController.createProducts)
router.delete('/',productController.deleteProducts)

module.exports=router