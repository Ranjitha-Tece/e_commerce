const productController= require('../controllers/productController')
const express= require('express');
const router = express.Router();
const auth = require('../middlewares/auth')

router.get("/",productController.getProducts)
router.post("/",productController.createProduct)


module.exports=router