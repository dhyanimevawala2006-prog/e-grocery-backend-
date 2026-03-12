const Cart = require("../models/cartModel");
<<<<<<< HEAD
const Food = require("../models/productmodel");


// ADD TO CART
exports.addToCart = async (req, res) => {
  try {

    const { userId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {

      cart = new Cart({
        userId,
        items: [{
          productId,
          quantity: Number(quantity)
        }]
      });

    } else {

=======

exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // check required fields
    if (!userId || !productId) {
      return res.status(400).json({
        message: "userId and productId are required"
      });
    }

    // find cart of user
    let cart = await Cart.findOne({ userId });

    // if cart not exists, create new cart
    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity: quantity || 1 }]
      });
    } else {
      // check if product already in cart
>>>>>>> 3e75daaee25af5e356bf628a92546edaae09b2f2
      const itemIndex = cart.items.findIndex(
        item => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
<<<<<<< HEAD

        cart.items[itemIndex].quantity += Number(quantity);

      } else {

        cart.items.push({
          productId,
          quantity: Number(quantity)
        });

      }

=======
        // product exists → increase quantity
        cart.items[itemIndex].quantity += quantity ? quantity : 1;
      } else {
        // new product → push to items
        cart.items.push({
          productId,
          quantity: quantity || 1
        });
      }
>>>>>>> 3e75daaee25af5e356bf628a92546edaae09b2f2
    }

    await cart.save();

<<<<<<< HEAD
    const populatedCart = await Cart.findOne({ userId })
      .populate("items.productId");

    res.json({
      message: "Food added to cart",
      data: populatedCart
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCart = async (req, res) => {

  try {

    const { userId } = req.params;

    const cart = await Cart.findOne({ userId })
      .populate("items.productId");

    if (!cart) {
      return res.json({
        message: "Cart empty",
        data: []
      });
    }

    res.json({
      message: "User Cart",
      data: cart
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};
exports.increaseQty = async (req, res) => {

  try {

    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });

    const item = cart.items.find(
      item => item.productId.toString() === productId
    );

    if (item) {
      item.quantity += 1;
    }

    await cart.save();

    res.json({
      message: "Quantity increased",
      data: cart
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};
exports.decreaseQty = async (req, res) => {

  try {

    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });

    const item = cart.items.find(
      item => item.productId.toString() === productId
    );

    if (item && item.quantity > 1) {
      item.quantity -= 1;
    }

    await cart.save();

    res.json({
      message: "Quantity decreased",
      data: cart
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};
exports.removeItem = async (req, res) => {

  try {

    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });

=======
    res.status(200).json({
      message: "Product added to cart successfully",
      cart
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// ================= REMOVE FROM CART =================
exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

>>>>>>> 3e75daaee25af5e356bf628a92546edaae09b2f2
    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId
    );

    await cart.save();

<<<<<<< HEAD
    res.json({
      message: "Item removed",
      data: cart
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};
exports.clearCart = async (req, res) => {

  try {

    const { userId } = req.body;

    await Cart.findOneAndDelete({ userId });

    res.json({
      message: "Cart cleared"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

=======
    res.status(200).json({
      message: "Item removed from cart",
      cart
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// ================= GET USER CART =================
exports.getUserCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId })
      .populate("items.productId"); // get product details

    if (!cart) {
      return res.status(404).json({
        message: "Cart is empty"
      });
    }

    res.status(200).json(cart);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
>>>>>>> 3e75daaee25af5e356bf628a92546edaae09b2f2
};