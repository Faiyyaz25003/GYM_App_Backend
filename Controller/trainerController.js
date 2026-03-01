import Trainer from "../Models/trainerModels.js";
import fs from "fs";

/* CREATE */
export const createTrainer = async (req, res) => {
  try {
    const photo = req.file ? req.file.filename : "";

    const trainer = new Trainer({
      ...req.body,
      photo,
    });

    await trainer.save();
    res.status(201).json(trainer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* GET ALL */
export const getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.json(trainers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* UPDATE */
export const updateTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);

    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    if (req.file) {
      if (trainer.photo) {
        fs.unlinkSync(`uploads/${trainer.photo}`);
      }
      trainer.photo = req.file.filename;
    }

    Object.assign(trainer, req.body);
    await trainer.save();

    res.json(trainer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* DELETE */
export const deleteTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);

    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    if (trainer.photo) {
      fs.unlinkSync(`uploads/${trainer.photo}`);
    }

    await trainer.deleteOne();
    res.json({ message: "Trainer Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
