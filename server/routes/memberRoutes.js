import express from "express";
import bcrypt from "bcryptjs";

import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================
   MEMBER PROFILE
========================= */

router.get("/profile", protect, async (req, res) => {

  try {

    res.json({
      success: true,
      member: req.user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

/* =========================
   ADD MEMBER
========================= */

router.post("/add", protect, async (req, res) => {

  try {

    const {
      fullName,
      email,
      phone,
      address,
      age,
      weight,
      emergencyContact,
      membership,
      username,
      password,
      admissionDate,
      dueDate,
    } = req.body;

    // CHECK EXISTING USER
    const existingUser = await User.findOne({
      $or: [
        { email },
        { username },
      ],
    });

    if (existingUser) {

      return res.status(400).json({
        success: false,
        message: "Member already exists",
      });
    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // CREATE MEMBER
    const member = await User.create({

      name: fullName,

      email,

      phone,

      address,

      age,

      weight,

      emergencyContact,

      membership,

      username,

      password: hashedPassword,

      admissionDate,

      dueDate,

      role: "member",

      isApproved: true,
    });

    res.status(201).json({
      success: true,
      message: "Member Added Successfully",
      member,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

export default router;
