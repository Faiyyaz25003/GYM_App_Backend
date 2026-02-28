import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    photo: String,
    mobile: String,
    email: { type: String, unique: true },
    password: String,
    gender: String,
    membershipPlan: String,
    startDate: Date,
    endDate: Date,
    paymentStatus: {
      type: String,
      enum: ["Paid", "Unpaid"],
      default: "Unpaid",
    },
    assignedTrainer: String,
    height: Number,
    weight: Number,
    qrCode: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);