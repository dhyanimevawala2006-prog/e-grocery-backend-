const mongoose = require("mongoose");
const Admin = require("./models/adminModel");

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/grocery_db")
  .then(() => {
    console.log("MongoDB connected");
    createDefaultAdmin();
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

async function createDefaultAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: "admin@grocery.com" });
    
    if (existingAdmin) {
      console.log("Admin already exists!");
      process.exit(0);
    }

    // Create new admin
    const admin = new Admin({
      username: "Admin",
      email: "admin@grocery.com",
      password: "admin123",
      role: "admin",
    });

    await admin.save();
    console.log("✅ Admin created successfully!");
    console.log("Email: admin@grocery.com");
    console.log("Password: admin123");
    console.log("\n⚠️  Please change the password after first login!");
    
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
}
