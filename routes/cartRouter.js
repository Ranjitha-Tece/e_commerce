const express = require('express');
const cartcontroller = require('../controllers/cartController');
const auth = require('../middlewares/auth');

const router = express.Router();
router.post('/',cartcontroller.createcart);
router.get('/',cartcontroller.getcart);
router.delete('/:product_id',cartcontroller.deletecart)
module.exports = router