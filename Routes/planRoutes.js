import express from "express";
import {
    createPlan,
    getPlans,
    deletePlan,
} from "../Controller/planController.js";

const router = express.Router();

/* CREATE PLAN */
router.post("/", createPlan);

/* GET ALL PLANS */
router.get("/", getPlans);

/* GET ALL PLANS */
router.get("/", getPlans);

/* DELETE PLAN */
router.delete("/:id", deletePlan);

export default router;