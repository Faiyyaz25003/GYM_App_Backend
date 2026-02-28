import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema(
  {
    exerciseName: { type: String, required: true },
    video: { type: String }, // store video URL
    shortDescription: { type: String },
    muscleGroup: { type: String },
    equipmentRequired: { type: String },
    difficultyLevel: { type: String },
    exerciseType: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Exercise", exerciseSchema);