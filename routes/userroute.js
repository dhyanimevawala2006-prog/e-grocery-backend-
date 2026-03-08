const uController=require('../controllers/usercontroller')
const express=require('express')
const router=express.Router()

router.post('/register',uController.registerUser)
router.get('/all',uController.getAllUsers)
router.post('/login',uController.loginUser)

module.exports=router;