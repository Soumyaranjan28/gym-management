import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
  },

  date: {
    type: String,
  },

  checkInTime: {
    type: String,
  },

  status: {
    type: String,
    default: "Present",
  },
});

export default mongoose.model(
  "Attendance",
  attendanceSchema
);