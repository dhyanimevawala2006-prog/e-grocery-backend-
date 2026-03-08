const express = require('express');
const router = express.Router();
const cart_Controller = require('../controllers/cartController');

// ================= ADD TO CART =================
router.post('/addtocart', cart_Controller.addToCart)
router.get('/getcart/:userId', cart_Controller.getUserCart)
router.delete('/removecart', cart_Controller.removeFromCart)

module.exports = router;