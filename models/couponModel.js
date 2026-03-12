const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({

  code:{
    type:String,
    required:true,
    unique:true
  },

  discountType:{
    type:String,
    enum:["flat","percentage"],
    required:true
  },

  discountValue:{
    type:Number,
    required:true
  },

  minOrderAmount:{
    type:Number,
    default:0
  },

  maxDiscount:{
    type:Number
  },

  expiryDate:{
    type:Date,
    required:true
  },

  usedBy:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"users"
    }
  ],

  isActive:{
    type:Boolean,
    default:true
  }

},{timestamps:true});

module.exports = mongoose.model("coupons",couponSchema);