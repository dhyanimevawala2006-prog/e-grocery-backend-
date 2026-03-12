const adminController = require("../controllers/adminController");
const express = require("express");
const router = express.Router();

router.post("/login", adminController.loginAdmin);
router.post("/create", adminController.createAdmin);

module.exports = router;
