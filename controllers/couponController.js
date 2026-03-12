const Coupon = require("../models/couponModel");

// CREATE COUPON (ADMIN)
exports.createCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);

    res.json({
      message: "Coupon created",
      data: coupon,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE COUPON
exports.updateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json({
      message: "Coupon updated",
      data: coupon,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE COUPON
exports.deleteCoupon = async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);

    res.json({
      message: "Coupon deleted",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// APPLY COUPON
exports.applyCoupon = async (req, res) => {
  try {
    const { code, userId, cartTotal } = req.body;

    const coupon = await Coupon.findOne({ code, isActive: true });

    if (!coupon) {
      return res.status(400).json({ message: "Invalid Coupon" });
    }

    if (new Date() > coupon.expiryDate) {
      return res.status(400).json({ message: "Coupon expired" });
    }

    if (cartTotal < coupon.minOrderAmount) {
      return res.status(400).json({
        message: `Minimum order ₹${coupon.minOrderAmount}`,
      });
    }

    if (coupon.usedBy.includes(userId)) {
      return res.status(400).json({
        message: "Coupon already used",
      });
    }

    let discount = 0;

    if (coupon.discountType === "flat") {
      discount = coupon.discountValue;
    }

    if (coupon.discountType === "percentage") {
      discount = (cartTotal * coupon.discountValue) / 100;

      if (coupon.maxDiscount) {
        discount = Math.min(discount, coupon.maxDiscount);
      }
    }

    const finalTotal = cartTotal - discount;

    res.json({
      message: "Coupon Applied",
      discount,
      finalTotal,
      couponCode: coupon.code,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL COUPONS
exports.getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });

    res.json({
      data: coupons,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
