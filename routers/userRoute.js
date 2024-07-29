const express=require('express')
const router=express.Router();
const userController=require('../controller/userController')
router.post('/users',userController.createUser);
router.post('/login',userController.loginUser);
router.get('/data',userController.getAllUsers);
router.put('/update/:id',userController.updateUsers)
module.exports=router;