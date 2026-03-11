const u_service = require("../services/userService");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const request = require("request");

// ================= LOGIN USER =================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (password !== user.password) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    res.status(200).json({
      message: "Login successful",
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

// ================= SEND OTP =================
const sendOtp = async (req, res) => {
  try {
    const { email, mobileno } = req.body;

    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const mobileExists = await User.findOne({ mobileno });

    if (mobileExists) {
      return res.status(400).json({
        message: "Mobile number already registered",
      });
    }

    var options = {
      method: "POST",
      url: `https://cpaas.messagecentral.com/verification/v3/send?countryCode=91&customerId=C-D0F60D108A4D45C&flowType=SMS&mobileNumber=${mobileno}`,
      headers: {
        authToken:
          "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDLUQwRjYwRDEwOEE0RDQ1QyIsImlhdCI6MTc3MzIyMjA2OCwiZXhwIjoxOTMwOTAyMDY4fQ.a-M-2pALKCvPMlwe3O-Cb1WUG0UJQB8hfVNgGdvjzKiRbo7mMKoNercpu5dANSdm1qNWAIPqjrS3bk0LYIyC4g",
      },
    };

    request(options, function (error, response) {
      if (error) {
        return res.status(500).json({
          message: "OTP sending failed",
        });
      }

      const data = JSON.parse(response.body);

      res.status(200).json({
        message: "OTP sent successfully",
        verificationId: data.data.verificationId,
      });
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ================= VERIFY OTP =================
const verifyOtp = async (req, res) => {
  try {
    const { verificationId, otp, userData } = req.body;

    var options = {
      method: "GET",
      url: `https://cpaas.messagecentral.com/verification/v3/validateOtp?countryCode=91&mobileNumber=${userData.mobileno}&verificationId=${verificationId}&customerId=C-D0F60D108A4D45C&code=${otp}`,
      headers: {
        authToken:
          "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDLUQwRjYwRDEwOEE0RDQ1QyIsImlhdCI6MTc3MzIyMjA2OCwiZXhwIjoxOTMwOTAyMDY4fQ.a-M-2pALKCvPMlwe3O-Cb1WUG0UJQB8hfVNgGdvjzKiRbo7mMKoNercpu5dANSdm1qNWAIPqjrS3bk0LYIyC4g",
      },
    };

    request(options, async function (error, response) {
      if (error) {
        return res.status(500).json({
          message: "OTP verification failed",
        });
      }

      const result = JSON.parse(response.body);

      if (result.responseCode === 200) {
        const newUser = await u_service.add(userData);

        return res.status(200).json({
          message: "Registration successful",
          data: newUser,
        });
      } else {
        return res.status(400).json({
          message: "Invalid OTP",
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ================= GET USERS =================
const getAllUsers = async (req, res) => {
  try {
    const all = await u_service.get();

    res.status(200).json({
      message: "ALL USERS",
      data: all,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  sendOtp,
  verifyOtp,
  getAllUsers,
  loginUser,
};
