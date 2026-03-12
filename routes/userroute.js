const uController = require("../controllers/usercontroller");
<<<<<<< HEAD
const User = require("../models/userModel");
=======
>>>>>>> 3e75daaee25af5e356bf628a92546edaae09b2f2
const express = require("express");
const router = express.Router();

router.post("/send-otp", uController.sendOtp);
router.post("/verify-otp", uController.verifyOtp);

<<<<<<< HEAD
=======
// router.post("/register", uController.registerUser);
>>>>>>> 3e75daaee25af5e356bf628a92546edaae09b2f2
router.post("/login", uController.loginUser);

router.get("/all", uController.getAllUsers);

<<<<<<< HEAD
router.get("/users", async(req,res)=>{
    try {
        const users = await User.find();
        res.json(users);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
})

router.delete("/delete-user/:id", async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({message:"User Deleted"});
    } catch(err) {
        res.status(500).json({message: err.message});
    }
})

=======
>>>>>>> 3e75daaee25af5e356bf628a92546edaae09b2f2
module.exports = router;
