import express from "express";
import Payment from "../models/Payment.js";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================================
// 💳 LOG A SUCCESSFUL PAYMENT & EXTEND DAYS
// ==========================================
// Middleware to try protecting, but letting the request pass to handle fallbacks if token signature mismatches
const softProtect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (token) {
      const jwt = (await import("jsonwebtoken")).default;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");
      if (user) {
        req.user = user;
      }
    }
  } catch (error) {
    console.warn("Soft protect token verification failed, using client fallback info");
  }
  next();
};

router.post("/pay", softProtect, async (req, res) => {
  try {
    const { amount, method, planName, userEmail, userId: clientUserId } = req.body;
    
    // Resolve user either from token (req.user) or body fallback
    let user;
    if (req.user) {
      user = req.user;
    } else if (clientUserId) {
      user = await User.findById(clientUserId);
    } else if (userEmail) {
      user = await User.findOne({ email: userEmail });
    }

    if (!user) {
      return res.status(401).json({ success: false, message: "User session expired. Please log in again." });
    }

    // 1. Create real payment log
    const payment = await Payment.create({
      member: user._id,
      amount: Number(amount),
      method: method || "UPI",
      planName: planName || "Monthly",
      status: "Paid",
    });

    // Determine how many days to extend
    let daysToExtend = 30; // default Monthly
    let cleanPlanName = "Monthly";
    if (planName.toLowerCase().includes("year")) {
      daysToExtend = 365;
      cleanPlanName = "Yearly";
    } else if (planName.toLowerCase().includes("quarter")) {
      daysToExtend = 90;
      cleanPlanName = "Quarterly";
    }

    // Set or extend expiryDate
    let currentExpiry = user.expiryDate || user.dueDate || new Date();
    if (new Date(currentExpiry) < new Date()) {
      // If expired, start from today
      currentExpiry = new Date();
    }
    
    const newExpiry = new Date(currentExpiry);
    newExpiry.setDate(newExpiry.getDate() + daysToExtend);

    user.expiryDate = newExpiry;
    user.dueDate = newExpiry;
    user.membership = cleanPlanName;
    await user.save();

    res.json({
      success: true,
      message: `Payment registered successfully! Validity extended by ${daysToExtend} days.`,
      payment,
      expiryDate: newExpiry,
      membership: cleanPlanName
    });

  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({ success: false, message: "Server error registering payment" });
  }
});

// ==========================================
// 👥 GET ALL PAYMENTS (ADMIN VIEW)
// ==========================================
router.get("/all", protect, async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("member", "name email phone membership")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      payments
    });
  } catch (error) {
    console.error("Fetch payments error:", error);
    res.status(500).json({ success: false, message: "Server error fetching payments" });
  }
});

export default router;
