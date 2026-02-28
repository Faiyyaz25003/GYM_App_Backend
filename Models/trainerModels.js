import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    photo: { type: String },
    mobile: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    specialization: { type: String },
    experience: { type: String },
    certification: { type: String },
    shiftTiming: { type: String },
    salary: { type: Number },
    joiningDate: { type: Date },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Trainer", trainerSchema);