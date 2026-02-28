import express from "express";
import {
    createTrainer,
    getAllTrainers,
    updateTrainer,
    deleteTrainer,
} from "../Controller/trainerController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/create", upload.single("photo"), createTrainer);
router.get("/all", getAllTrainers);
router.put("/update/:id", upload.single("photo"), updateTrainer);
router.delete("/delete/:id", deleteTrainer);

export default router;