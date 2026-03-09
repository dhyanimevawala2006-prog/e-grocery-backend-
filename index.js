const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

const productRoute = require("./routes/productroute");
const userRoute = require("./routes/userroute");
const cartRoute = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoute");
const wishlistRoute = require("./routes/wishlistRoute");

const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/upload", express.static("upload"));

// ROUTES
app.use("/api", productRoute);
app.use("/api", userRoute);
app.use("/api", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api", wishlistRoute);

// DATABASE
mongoose
  .connect("mongodb://localhost:27017/grocery_db")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
