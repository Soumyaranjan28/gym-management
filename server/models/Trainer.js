import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  experience: Number,
  phone: String
}, { timestamps: true });

export default mongoose.model("Trainer", trainerSchema);
