const userController=require('../controllers/userController')
const express=require('express')
const router=express.Router();
 
router.post('/',userController.createUsers)
router.get('/', userController.getUsers)

module.exports=router