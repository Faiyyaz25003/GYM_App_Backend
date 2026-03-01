import express from "express";
import {
  createSchedule,
  getSchedules,
  getSingleSchedule,
  updateSchedule,
  deleteSchedule,
} from "../Controller/scheduleController.js";

const router = express.Router();

router.post("/", createSchedule);
router.get("/", getSchedules);
router.get("/:id", getSingleSchedule);
router.put("/:id", updateSchedule);
router.delete("/:id", deleteSchedule);

export default router;