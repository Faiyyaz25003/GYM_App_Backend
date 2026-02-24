import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  experience: {
    type: Number,
    default: 0,
  },
  specialization: {
    type: String,
    default: "",
  },
  salary: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const Trainer = mongoose.model("Trainer", trainerSchema);
export default Trainer;