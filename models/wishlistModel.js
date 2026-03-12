const mongoose = require("mongoose")

const wishlistSchema = new mongoose.Schema({

userId:String,
productId:String,
pname:String,
description:String,
price:Number,
pic:String

})

module.exports = mongoose.model("wishlist",wishlistSchema)