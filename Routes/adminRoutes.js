import express from "express";
import {
    registerAdmin,
    loginAdmin,
    getAdminProfile,
} from "../Controller/adminController.js";
import multer from "multer";

const router = express.Router();

/* Multer Setup */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/register", upload.single("profilePhoto"), registerAdmin);
router.post("/login", loginAdmin);
router.get("/profile/:id", getAdminProfile);

export default router;