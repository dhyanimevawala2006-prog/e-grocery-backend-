<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/add", cartController.addToCart);
router.get("/:userId", cartController.getCart);

router.put("/increase", cartController.increaseQty);
router.put("/decrease", cartController.decreaseQty);

router.delete("/remove", cartController.removeItem);
router.delete("/clear", cartController.clearCart);
=======
const express = require('express');
const router = express.Router();
const cart_Controller = require('../controllers/cartController');

// ================= ADD TO CART =================
router.post('/addtocart', cart_Controller.addToCart)
router.get('/getcart/:userId', cart_Controller.getUserCart)
router.delete('/removecart', cart_Controller.removeFromCart)
>>>>>>> 3e75daaee25af5e356bf628a92546edaae09b2f2

module.exports = router;