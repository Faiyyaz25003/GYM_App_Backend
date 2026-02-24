import Trainer from "../Models/TrainerModel.js";

// ✅ Create Trainer
export const createTrainer = async (req, res) => {
  try {
    const { name, phone, email, experience, specialization, salary } = req.body;

    // Basic validation
    if (!name || !phone || !email) {
      return res.status(400).json({ success: false, message: "Name, Phone, and Email are required!" });
    }

    const existing = await Trainer.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "Trainer with this email already exists!" });
    }

    const trainer = await Trainer.create({
      name,
      phone,
      email,
      experience,
      specialization,
      salary,
    });

    res.status(201).json({ success: true, trainer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Get All Trainers
export const getTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find().sort({ createdAt: -1 });
    res.json({ success: true, trainers });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Delete Trainer
export const deleteTrainer = async (req, res) => {
  try {
    const { id } = req.params;
    await Trainer.findByIdAndDelete(id);
    res.json({ success: true, message: "Trainer deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};