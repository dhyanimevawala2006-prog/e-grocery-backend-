const express = require("express");
const router = express.Router();

const couponController = require("../controllers/couponController");


// ADMIN CREATE COUPON
router.post("/create",couponController.createCoupon);

// APPLY COUPON
router.post("/apply",couponController.applyCoupon);

// GET COUPONS
router.get("/all",couponController.getCoupons);

module.exports = router;