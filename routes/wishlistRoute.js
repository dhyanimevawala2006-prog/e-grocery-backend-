const express = require("express");
const router = express.Router();
const Wishlist = require("../models/wishlistModel");
const mongoose = require("mongoose");

/*
ADD TO WISHLIST
Ensures no duplicate for same user/product
*/
router.post("/wishlist", async (req, res) => {
  try {
    const { userId, productId, pname, description, price, pic } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const exist = await Wishlist.findOne({
      userId,
      productId,
    });

    if (exist) {
      return res.json({ message: "Already in wishlist" });
    }

    const data = new Wishlist({
      userId,
      productId,
      pname,
      description,
      price,
      pic,
    });

    await data.save();

    res.json({ message: "Added to wishlist", item: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*
GET USER WISHLIST
Always returns array sorted by newest
*/
router.get("/wishlist/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const data = await Wishlist.find({ userId }).sort({ _id: -1 }).lean();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*
REMOVE ITEM FROM WISHLIST
*/
router.delete("/wishlist/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    await Wishlist.findByIdAndDelete(id);

    res.json({ message: "Removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
