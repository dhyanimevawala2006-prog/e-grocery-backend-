const uController = require("../controllers/usercontroller");
const User = require("../models/userModel");
const express = require("express");
const router = express.Router();

// OTP
router.post("/send-otp", uController.sendOtp);
router.post("/verify-otp", uController.verifyOtp);

// LOGIN
router.post("/login", uController.loginUser);

// GET ALL USERS (Controller)
router.get("/all", uController.getAllUsers);

// GET USERS (Direct DB)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE USER
router.delete("/delete-user/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
