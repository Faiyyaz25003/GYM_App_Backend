import Admin from "../Models/adminModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

/* ================= REGISTER ================= */


/* 🔐 Function to Generate Random Password */
const generatePassword = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$";
  let password = "";
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

/* ================= REGISTER ================= */

export const registerAdmin = async (req, res) => {
  try {
    const {
      fullName,
      email,
      mobile,
      gymName,
      gymAddress,
      gender,
    } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin)
      return res.status(400).json({ message: "Admin already exists" });

    // 🔐 Generate Password Automatically
    const autoPassword = generatePassword();

    const hashedPassword = await bcrypt.hash(autoPassword, 10);

    const newAdmin = new Admin({
      fullName,
      email,
      mobile,
      gymName,
      gymAddress,
      gender,
      password: hashedPassword,
      profilePhoto: req.file ? req.file.path : "",
    });

    await newAdmin.save();

    /* ======= Nodemailer ======= */

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

await transporter.sendMail({
  from: `"Gym Management System" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "🎉 Welcome to Gym Admin Panel - Account Created Successfully",
  html: `
  <div style="font-family: Arial, sans-serif; background-color:#f4f6f9; padding:30px;">
    
    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 5px 15px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background:linear-gradient(135deg,#1e3c72,#2a5298); padding:20px; text-align:center; color:white;">
        <h1 style="margin:0;">🏋️ Gym Admin Panel</h1>
        <p style="margin:5px 0 0;">Welcome to Your Fitness Management System</p>
      </div>

      <!-- Body -->
      <div style="padding:30px;">
        <h2 style="color:#333;">Hello ${fullName}, 👋</h2>
        
        <p style="color:#555; line-height:1.6;">
          Congratulations! 🎉 Your <b>Gym Admin Account</b> has been successfully created.
          You can now manage members, trainers, schedules, and more.
        </p>

        <div style="background:#f1f3f6; padding:15px; border-radius:8px; margin:20px 0;">
          <p style="margin:5px 0;"><b>📧 Email:</b> ${email}</p>
          <p style="margin:5px 0;"><b>🔑 Temporary Password:</b> ${autoPassword}</p>
        </div>

        <p style="color:#777;">
          ⚠️ For security reasons, please login and change your password immediately.
        </p>

        <div style="text-align:center; margin-top:25px;">
          <a href="#" 
             style="background:#2a5298; color:white; padding:12px 25px; 
                    text-decoration:none; border-radius:5px; font-weight:bold;">
             Login Now
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="background:#f4f6f9; text-align:center; padding:15px; font-size:12px; color:#888;">
        <p style="margin:0;">© ${new Date().getFullYear()} Gym Management System</p>
        <p style="margin:5px 0 0;">Stay Strong 💪 Stay Fit</p>
      </div>

    </div>
  </div>
  `,
});
    res.status(201).json({
      message: "Admin Registered Successfully",
      autoPassword, // optional (testing ke liye)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= LOGIN ================= */

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      admin,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET PROFILE ================= */

export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select("-password");
    if (!admin)
      return res.status(404).json({ message: "Admin not found" });

    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};