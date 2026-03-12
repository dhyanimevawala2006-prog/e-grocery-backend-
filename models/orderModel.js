const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],

  total: {
    type: Number,
    required: true,
  },

  discount: {
    type: Number,
    default: 0,
  },

  couponCode: {
    type: String,
  },

  finalTotal: {
    type: Number,
  },

  address: {
    name: String,
    phone: String,
    address: String,
    city: String,
  },

  status: {
    type: String,
    default: "Pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  discount: {
    type: Number,
    default: 0,
  },

  couponCode: {
    type: String,
  },

  finalTotal: {
    type: Number,
  },
});

module.exports = mongoose.model("orders", orderSchema);
