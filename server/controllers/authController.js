import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      phone,
      password: hashed,
      role: "member",
      isApproved: false,
    });

    res.status(201).json({
      message: "Registered! Wait for admin approval",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // const user = await User.findOne({ email });
    const user = await User.findOne({
      $or: [{ email: email }, { username: email }],
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🔥 BLOCK LOGIN IF NOT APPROVED
    if (user.role === "member" && user.isApproved !== true) {
      return res.status(403).json({
        message: "Your account is waiting for admin approval",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      token,
      role: user.role,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
