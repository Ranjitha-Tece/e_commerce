const ordercontroller = require('../controllers/orderController')
const express = require('express');
const auth = require('../middlewares/auth')
const router = express.Router();
router.post('/',ordercontroller.createorder)
module.exports=router;