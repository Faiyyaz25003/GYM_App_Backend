import SuperAdmin from "../Models/SuperAdminModel.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

// 🔥 Generate Random Password
const generatePassword = () => {
  return Math.random().toString(36).slice(-8);
};

//////////////////////////////////////////////////////////
// ✅ CREATE SUPER ADMIN
//////////////////////////////////////////////////////////

export const createSuperAdmin = async (req, res) => {
  try {
    const { fullName, email, mobileNumber, role } = req.body;

    if (!fullName || !email || !mobileNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await SuperAdmin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const plainPassword = generatePassword();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    const newAdmin = await SuperAdmin.create({
      fullName,
      email,
      mobileNumber,
      role: role || "superadmin",
      password: hashedPassword,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Gym App" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "SuperAdmin Account Created",
      html: `
        <h2>Welcome ${fullName}</h2>
        <p>Your account has been created successfully.</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Password:</strong> ${plainPassword}</p>
        <p>Please login and change your password.</p>
      `,
    });

    res.status(201).json({
      success: true,
      message: "SuperAdmin created & email sent successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//////////////////////////////////////////////////////////
// ✅ LOGIN API
//////////////////////////////////////////////////////////

export const loginSuperAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔎 Check email
    const user = await SuperAdmin.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 🔐 Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 🔑 Generate JWT Token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};