import express from "express";
import { analyzeProgress, getAllProgress } from "../Controller/progressController.js";

const router = express.Router();

router.post("/analyze", analyzeProgress);
router.get("/", getAllProgress);

export default router;