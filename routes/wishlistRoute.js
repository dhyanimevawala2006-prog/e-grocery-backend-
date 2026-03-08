const express = require("express")
const router = express.Router()
const Wishlist = require("../models/wishlistModel")

// ADD TO WISHLIST
router.post("/wishlist", async (req,res)=>{

  const exist = await Wishlist.findOne({
    userId:req.body.userId,
    productId:req.body.productId
  })

  if(exist){
    return res.json({message:"Already in wishlist"})
  }

  const data = new Wishlist(req.body)
  await data.save()

  res.json({message:"Added to wishlist"})
})


// GET USER WISHLIST
router.get("/wishlist/:userId", async(req,res)=>{

  const data = await Wishlist.find({
    userId:req.params.userId
  })

  res.json(data)
})


// REMOVE ITEM
router.delete("/wishlist/:id", async(req,res)=>{

  await Wishlist.findByIdAndDelete(req.params.id)

  res.json({message:"Removed"})
})

module.exports = router