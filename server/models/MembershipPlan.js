import mongoose from "mongoose";

const membershipPlanSchema = new mongoose.Schema({
  name: String,
  price: Number,
  duration: Number,
  features: [String]
}, { timestamps: true });

export default mongoose.model("MembershipPlan", membershipPlanSchema);
