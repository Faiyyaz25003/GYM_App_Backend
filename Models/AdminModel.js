import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    mobile: String,
    gymName: String,
    gymAddress: String,
    gender: String,
    subscriptionMonths: Number,
    startDate: Date,
    endDate: Date,
    profilePhoto: String,
    password: String,
    role: {
      type: String,
      default: "admin",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);