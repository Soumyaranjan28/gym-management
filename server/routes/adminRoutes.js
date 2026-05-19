import express from "express";
import bcrypt from "bcryptjs";

import User from "../models/User.js";

import upload from "../middleware/upload.js";

import {
  getDashboardStats,
  uploadPhoto,
  getAllMembers,
} from "../controllers/adminController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================
   ADMIN DASHBOARD
========================= */

router.get("/dashboard", protect, adminOnly, (req, res) => {
  res.json({
    message: "Welcome Admin",
    admin: req.user.name,
  });
});

/* =========================
   DASHBOARD STATS
========================= */

router.get("/stats", protect, adminOnly, getDashboardStats);

/* =========================
   GET ALL MEMBERS
========================= */

router.get("/members", protect, adminOnly, async (req, res) => {
  try {
    const members = await User.find({
      role: "member",
      isApproved: true,
    });

    res.status(200).json(members);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error fetching members",
    });
  }
});

/* =========================
   UPLOAD MEMBER PHOTO
========================= */

router.put(
  "/upload-photo/:id",

  protect,

  adminOnly,

  upload.single("photo"),

  uploadPhoto,
);

/* =========================
   ADD MEMBER
========================= */

router.post(
  "/add-member",

  protect,

  adminOnly,

  async (req, res) => {
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
        $or: [{ email }, { username }],
      });

      if (existingUser) {
        return res.status(400).json({
          message: "Member already exists",
        });
      }

      // HASH PASSWORD

      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(password, salt);

      // CREATE MEMBER

      const user = await User.create({
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
        message: "Member Added Successfully",

        user,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  },
);

/* =========================
   REMOVE MEMBER
========================= */

router.delete(
  "/members/:id",

  protect,

  adminOnly,

  async (req, res) => {
    try {
      const member = await User.findById(req.params.id);

      if (!member) {
        return res.status(404).json({
          message: "Member not found",
        });
      }

      await User.findByIdAndDelete(req.params.id);

      res.json({
        message: "Member removed successfully",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  },
);

/* =========================
   PENDING USERS
========================= */

router.get(
  "/pending",

  protect,

  adminOnly,

  async (req, res) => {
    try {
      const users = await User.find({
        role: "member",
        isApproved: false,
      });

      res.json(users);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Error fetching pending users",
      });
    }
  },
);

/* =========================
   APPROVE USER
========================= */

router.put(
  "/approve/:id",

  protect,

  adminOnly,

  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      user.isApproved = true;

      await user.save();

      res.json({
        message: "User approved",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  },
);

/* =========================
   REJECT USER
========================= */

router.delete(
  "/reject/:id",

  protect,

  adminOnly,

  async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);

      res.json({
        message: "User rejected",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  },
);

export default router;
