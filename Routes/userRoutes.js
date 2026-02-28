import express from "express";
import {
    registerUser,
    loginUser,
    getProfile,
} from "../Controller/userController.js";
import { protect } from "../middleware/authMiddleware1.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);

export default router;