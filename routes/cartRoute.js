const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/add", cartController.addToCart);
router.get("/:userId", cartController.getCart);

router.put("/increase", cartController.increaseQty);
router.put("/decrease", cartController.decreaseQty);

router.delete("/remove", cartController.removeItem);
router.delete("/clear", cartController.clearCart);

module.exports = router;