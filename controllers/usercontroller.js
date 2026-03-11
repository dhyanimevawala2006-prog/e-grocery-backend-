const u_service = require("../services/userService");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// ================= LOGIN USER =================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Compare password
    // const isMatch = await bcrypt.compare(password, user.password);

    if (password !== user.password) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    // Create JWT Token
    // const token = jwt.sign(
    //   { id: user._id, email: user.email },
    //   "your_secret_key",   // change to env key in production
    //   { expiresIn: "7d" }
    // );

    res.status(200).json({
      message: "Login successful",
      //   token: token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        mobileno: user.mobileno,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const newUser = await u_service.add(req.body);

    res.status(200).json({
      message: "User registered successfully",
      data: newUser,
    });
  } catch (err) {
    // Duplicate key error
    if (err.code === 11000) {
      if (err.keyPattern.email) {
        return res.status(400).json({
          message: "Email already registered",
        });
      }

      if (err.keyPattern.mobileno) {
        return res.status(400).json({
          message: "Mobile number already registered",
        });
      }
    }

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const all = await u_service.get();
    res.status(200).json({ message: "ALL USERS", data: all });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = { registerUser, getAllUsers, loginUser };
