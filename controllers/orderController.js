const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
<<<<<<< HEAD


// CREATE ORDER
exports.createOrder = async(req,res)=>{

  try{

    const {userId,items,total,address} = req.body;

    const order = await Order.create({
      userId,
      items,
      total,
      address
    });
        await Cart.findOneAndDelete({ userId });


    res.status(201).json({
      message:"Order placed successfully",
      data:order
    });

  }catch(error){
    res.status(500).json({error:error.message});
  }

};


// GET USER ORDERS
exports.getUserOrders = async(req,res)=>{

  try{

    const orders = await Order.find({userId:req.params.userId})
    .populate("items.productId")
    .sort({createdAt:-1});

    res.json({
      message:"User Orders",
      data:orders
    });

  }catch(error){
    res.status(500).json({error:error.message});
  }

};


// GET ALL ORDERS (ADMIN)
exports.getAllOrders = async(req,res)=>{

  try{

    const orders = await Order.find()
    .populate("items.productId")
    .populate("userId")
    .sort({createdAt:-1});

    res.json({
      message:"All Orders",
      data:orders
    });

  }catch(error){
    res.status(500).json({error:error.message});
  }

};


// UPDATE ORDER STATUS
exports.updateOrderStatus = async(req,res)=>{

  try{

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {status:req.body.status},
      {new:true}
    );

    res.json({
      message:"Order status updated",
      data:order
    });

  }catch(error){
    res.status(500).json({error:error.message});
  }

=======
const Product = require("../models/productmodel");

// ================= PLACE ORDER =================
exports.placeOrder = async (req, res) => {
  try {
    const { userId, address, paymentMethod } = req.body;

    if (!userId || !address) {
      return res.status(400).json({
         message: "userId and address are required"
      });
    }

    // find user cart
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty"
      });
    }

    // calculate total amount
    let totalAmount = 0;

    cart.items.forEach(item => {
      const price = item.productId.price || 0;
      totalAmount += price * item.quantity;
    });

    // create order
    const newOrder = new Order({
      userId,
      items: cart.items.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity
      })),
      totalAmount,
      address,
      paymentMethod: paymentMethod || "COD"
    });

    await newOrder.save();

    // clear cart after order
    await Cart.findOneAndDelete({ userId });

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// ================= GET USER ORDERS =================
exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId })
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// ================= GET USER ORDERS =================
exports.getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find()

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
>>>>>>> 3e75daaee25af5e356bf628a92546edaae09b2f2
};