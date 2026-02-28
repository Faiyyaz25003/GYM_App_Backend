import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  planId: { type: String, required: true, unique: true },
  planName: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  goalType: String,
  workoutFrequency: String,
  accessType: String,
  trainerSupport: String,
  dietPlan: String,
  groupClasses: String,
  progressTracking: String,
  status: { type: String, default: "Active" },
  createdDate: { type: Date, default: Date.now },
  isPopular: { type: Boolean, default: false }
});

export default mongoose.model("Plan", planSchema);