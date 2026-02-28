import express from "express";
import {
    createExercise,
    getExercises,
    getExerciseById,
    updateExercise,
    deleteExercise,
} from "../Controller/exerciseController.js";

const router = express.Router();

/* CREATE */
router.post("/", createExercise);

/* GET ALL */
router.get("/", getExercises);

/* GET SINGLE */
router.get("/:id", getExerciseById);

/* UPDATE */
router.put("/:id", updateExercise);

/* DELETE */
router.delete("/:id", deleteExercise);

export default router;