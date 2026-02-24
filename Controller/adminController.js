  import Admin from "../Models/AdminModel.js";
  import bcrypt from "bcryptjs";
  import nodemailer from "nodemailer";
  import jwt from "jsonwebtoken";

  // 🔥 Generate Random Password
  const generatePassword = () => {
    return Math.random().toString(36).slice(-8);
  };

  //////////////////////////////////////////////////////////
  // ✅ REGISTER ADMIN
  //////////////////////////////////////////////////////////

  export const registerAdmin = async (req, res) => {
    try {
      const {
        fullName,
        email,
        mobile,
        gymName,
        gymAddress,
        gender,
        subscriptionMonths,
        startDate,
        endDate,
        profilePhoto,
      } = req.body;

      if (
        !fullName ||
        !email ||
        !mobile ||
        !gymName ||
        !gymAddress ||
        !gender ||
        !subscriptionMonths ||
        !startDate ||
        !endDate
      ) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      const existing = await Admin.findOne({ email });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: "Email already registered",
        });
      }

      // 🔐 Generate & Hash Password
      const plainPassword = generatePassword();
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(plainPassword, salt);

      const newAdmin = await Admin.create({
        fullName,
        email,
        mobile,
        gymName,
        gymAddress,
        gender,
        subscriptionMonths,
        startDate,
        endDate,
        profilePhoto,
        password: hashedPassword,
      });

      ////////////////////////////////////////////////////////
      // 📧 EMAIL CONFIGURATION
      ////////////////////////////////////////////////////////

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Fitness Club" <${process.env.MAIL_USER}>`,
        to: email,
        subject: "Gym Admin Account Created Successfully",
        html: `
          <h2>Welcome ${fullName}</h2>
          <p>Your Gym Admin account has been created.</p>
          <p><strong>Gym:</strong> ${gymName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Password:</strong> ${plainPassword}</p>
          <p>Subscription Valid Till: ${new Date(endDate).toDateString()}</p>
          <br/>
          <p>Please login and change your password.</p>
        `,
      });

      res.status(201).json({
        success: true,
        message: "Admin registered & email sent successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  //////////////////////////////////////////////////////////
  // ✅ LOGIN ADMIN
  //////////////////////////////////////////////////////////

  export const loginAdmin = async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Admin.findOne({ email });

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      // 🔥 AUTO BLOCK IF SUBSCRIPTION EXPIRED
      if (new Date(user.endDate) < new Date()) {
        user.isBlocked = true;
        await user.save();
      }

      if (user.isBlocked) {
        return res.status(403).json({
          success: false,
          message: "Your subscription has expired or account is blocked",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Invalid email or password",
        });
      }

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
          gymName: user.gymName,
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

  //////////////////////////////////////////////////////////
  // ✅ GET ALL ADMINS (AUTO BLOCK IF EXPIRED)
  //////////////////////////////////////////////////////////

  export const getAllAdmins = async (req, res) => {
    try {
      const today = new Date();

      // 🔥 Auto block expired admins
      await Admin.updateMany(
        {
          endDate: { $lt: today },
        },
        {
          $set: { isBlocked: true },
        }
      );

      const admins = await Admin.find()
        .select("-password")
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        total: admins.length,
        admins,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  //////////////////////////////////////////////////////////
  // ✅ BLOCK / UNBLOCK ADMIN (SUPERADMIN)
  //////////////////////////////////////////////////////////

  export const blockAdmin = async (req, res) => {
    try {
      const { isBlocked } = req.body;

      const admin = await Admin.findById(req.params.id);

      if (!admin) {
        return res.status(404).json({
          success: false,
          message: "Admin not found",
        });
      }

      admin.isBlocked = isBlocked;
      await admin.save();

      res.status(200).json({
        success: true,
        message: isBlocked
          ? "Admin blocked successfully"
          : "Admin unblocked successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  //////////////////////////////////////////////////////////
  // Delete Admin
  //////////////////////////////////////////////////////////
  export const deleteAdmin = async (req, res) => {
    try {
      const admin = await Admin.findById(req.params.id);

      if (!admin) {
        return res.status(404).json({
          success: false,
          message: "Admin not found",
        });
      }

      await admin.deleteOne();

      res.status(200).json({
        success: true,
        message: "Admin deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };  