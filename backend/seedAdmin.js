require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/edubridge");

    const adminEmail = "yadavgaurav332005@gmail.com";
    let adminUser = await User.findOne({ email: adminEmail });

    if (adminUser) {
      if (adminUser.role !== "admin") {
        adminUser.role = "admin";
        await adminUser.save();
        console.log(`Updated existing user ${adminEmail} to admin role.`);
      } else {
        console.log(`User ${adminEmail} is already an admin.`);
      }
    } else {
      // Create new admin
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("admin123", salt);

      adminUser = await User.create({
        name: "Gaurav Yadav",
        email: adminEmail,
        password: hashedPassword,
        role: "admin"
      });
      console.log(`Created new admin user ${adminEmail} with password: 'admin123'`);
    }

    process.exit();
  } catch (err) {
    console.error("Failed to seed admin:", err);
    process.exit(1);
  }
};

seedAdmin();
