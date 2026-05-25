import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  method: String,
  planName: { type: String, default: "Monthly" },
  status: { type: String, enum: ["Paid", "Pending"] }
}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);
