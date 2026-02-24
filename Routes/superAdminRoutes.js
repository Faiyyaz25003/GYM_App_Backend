import express from "express";
import {
    createSuperAdmin,
    loginSuperAdmin,
} from "../Controller/superAdminController.js";

const router = express.Router();

router.post("/create", createSuperAdmin);
router.post("/login", loginSuperAdmin);

export default router;