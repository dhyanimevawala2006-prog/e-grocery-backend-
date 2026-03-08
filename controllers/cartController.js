const Cart = require("../models/cartModel");

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
      const itemIndex = cart.items.findIndex(
        item => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        // product exists → increase quantity
        cart.items[itemIndex].quantity += quantity ? quantity : 1;
      } else {
        // new product → push to items
        cart.items.push({
          productId,
          quantity: quantity || 1
        });
      }
    }

    await cart.save();

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

    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId
    );

    await cart.save();

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
};