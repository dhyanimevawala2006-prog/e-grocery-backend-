const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/place", orderController.placeOrder);
router.get("/myorders/:userId", orderController.getUserOrders);
router.get("/allorders", orderController.getAllOrders);

module.exports = router;