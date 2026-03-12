const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
<<<<<<< HEAD

  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true
  },

  items:[
    {
      productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"products"
      },
      quantity:{
        type:Number,
        default:1
      }
    }
  ],

  total:{
    type:Number,
    required:true
  },

  address:{
    name:String,
    phone:String,
    address:String,
    city:String
  },

  status:{
    type:String,
    default:"Pending"
  },

  createdAt:{
    type:Date,
    default:Date.now
  }

});

module.exports = mongoose.model("orders",orderSchema);
=======
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    default: "COD" // COD / ONLINE
  },
  orderStatus: {
    type: String,
    enum: ["Pending", "Placed", "Shipped", "Delivered", "Cancelled"],
    default: "Placed"
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model("orders", orderSchema);
>>>>>>> 3e75daaee25af5e356bf628a92546edaae09b2f2
