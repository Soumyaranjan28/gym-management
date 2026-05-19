import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const createAdmin = async () => {
  try {
    const hashed = await bcrypt.hash("admin123", 10);

    const admin = await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      phone: "9999999999",
      password: hashed,
      role: "admin",
      isApproved: true,
      isActive: true,
      membership,
      admissionDate,
      dueDate,
    });

    console.log("Admin Created:", admin.email);

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

createAdmin();
