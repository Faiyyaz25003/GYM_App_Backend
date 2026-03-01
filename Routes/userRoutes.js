import express from "express";
import {
    registerUser,
    loginUser,
    getProfile,
    getAllUsers,
    updateUser,
    deleteUser,
} from "../Controller/userController.js";
import { protect } from "../middleware/authMiddleware1.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);

/* ===== ADMIN ROUTES ===== */
router.get("/", protect, getAllUsers);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

export default router;