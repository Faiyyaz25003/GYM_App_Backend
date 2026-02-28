import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    gymName: { type: String, required: true },
    gymAddress: { type: String, required: true },
    gender: { type: String, required: true },
    profilePhoto: { type: String },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);