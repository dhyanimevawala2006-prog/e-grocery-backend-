const uController = require("../controllers/usercontroller");
const express = require("express");
const router = express.Router();

router.post("/send-otp", uController.sendOtp);
router.post("/verify-otp", uController.verifyOtp);

// router.post("/register", uController.registerUser);
router.post("/login", uController.loginUser);

router.get("/all", uController.getAllUsers);

module.exports = router;
