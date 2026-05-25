import express from "express";

import Attendance from "../models/Attendance.js";

const router = express.Router();



// MARK ATTENDANCE
router.post("/mark", async (req, res) => {

  try {

    const {
      memberId,
      name,
      email,
    } = req.body;

    const today = new Date().toLocaleDateString();

    // CHECK IF ALREADY MARKED
    const alreadyMarked =
      await Attendance.findOne({
        memberId,
        date: today,
      });

    if (alreadyMarked) {
      return res.json({
        success: false,
        message:
          "Attendance already marked today",
      });
    }

    // CREATE ATTENDANCE
    const attendance =
      await Attendance.create({
        memberId,
        name,
        email,
        date: today,
        checkInTime:
          new Date().toLocaleTimeString(),
      });

    res.json({
      success: true,
      message:
        "Attendance marked successfully",
      attendance,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});



// GET ALL ATTENDANCE
router.get("/all", async (req, res) => {

  try {

    const attendance =
      await Attendance.find().sort({
        _id: -1,
      });

    res.json({
      success: true,
      attendance,
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