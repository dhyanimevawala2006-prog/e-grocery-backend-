const express = require("express");
const router = express.Router();
<<<<<<< HEAD

const orderController = require("../controllers/orderController");


// CREATE ORDER
router.post("/create",orderController.createOrder);

// GET USER ORDERS
router.get("/user/:userId",orderController.getUserOrders);

// GET ALL ORDERS (ADMIN)
router.get("/all",orderController.getAllOrders);

// UPDATE STATUS
router.put("/status/:id",orderController.updateOrderStatus);

=======
const orderController = require("../controllers/orderController");

router.post("/place", orderController.placeOrder);
router.get("/myorder/:userId", orderController.getUserOrders);
router.get("/allorder", orderController.getAllOrders);
>>>>>>> 3e75daaee25af5e356bf628a92546edaae09b2f2

module.exports = router;