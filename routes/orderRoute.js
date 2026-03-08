const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/place", orderController.placeOrder);
router.get("/myorder/:userId", orderController.getUserOrders);
router.get("/allorder", orderController.getAllOrders);

module.exports = router;