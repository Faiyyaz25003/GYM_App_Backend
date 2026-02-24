import express from "express";
import { createTrainer, getTrainers, deleteTrainer } from "../Controller/trainerController.js";

const router = express.Router();

// Create trainer
router.post("/", createTrainer);

// Get all trainers
router.get("/", getTrainers);

// Delete trainer
router.delete("/:id", deleteTrainer);

export default router;