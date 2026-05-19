import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["Present", "Absent"], default: "Present" }
});

export default mongoose.model("Attendance", attendanceSchema);
