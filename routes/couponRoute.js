const express = require("express");
const router = express.Router();

const couponController = require("../controllers/couponController");

// ADMIN CREATE COUPON
router.post("/create", couponController.createCoupon);

// APPLY COUPON
router.post("/apply", couponController.applyCoupon);

// GET COUPONS
router.get("/all", couponController.getCoupons);

// UPDATE COUPON
router.put("/update/:id", couponController.updateCoupon);

// DELETE COUPON
router.delete("/delete/:id", couponController.deleteCoupon);

module.exports = router;
