import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    beforeImage: {
      type: String,
      required: true,
    },
    afterImage: {
      type: String,
      required: true,
    },
    weightLoss: String,
    waistReduce: String,
    fatLoss: String,
    improvement: String,
    summary: String,
  },
  { timestamps: true }
);

export default mongoose.model("Progress", progressSchema);