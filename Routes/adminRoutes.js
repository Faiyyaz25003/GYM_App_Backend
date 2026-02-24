import express from "express";
import {
    registerAdmin,
    loginAdmin,
    getAllAdmins,
    deleteAdmin,
    blockAdmin,
} from "../Controller/adminController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔓 Public
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/all", protect, getAllAdmins);

// 🔥 DELETE ADMIN
router.delete("/:id", protect, deleteAdmin);

router.put("/block/:id", protect, blockAdmin);

export default router;