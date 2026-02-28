import User from "../Models/userModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generatePassword } from "../utils/generatePassword.js"
import { sendEmail } from "../utils/sendEmail.js"
import { generateQRCode } from "../utils/craeteRQ.js"

/* ================= REGISTER ================= */
export const registerUser = async (req, res) => {
  try {
    const {
      fullName,
      photo,
      mobile,
      email,
      gender,
      membershipPlan,
      startDate,
      endDate,
      paymentStatus,
      assignedTrainer,
      height,
      weight,
    } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email already exists" });

    const autoPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(autoPassword, 10);

    const user = new User({
      fullName,
      photo,
      mobile,
      email,
      password: hashedPassword,
      gender,
      membershipPlan,
      startDate,
      endDate,
      paymentStatus,
      assignedTrainer,
      height,
      weight,
    });

    // Generate QR
    const qr = await generateQRCode(user);
    user.qrCode = qr;

    await user.save();

    // Send Email
    await sendEmail(email, autoPassword);

    res.json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= LOGIN ================= */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= GET PROFILE ================= */
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};