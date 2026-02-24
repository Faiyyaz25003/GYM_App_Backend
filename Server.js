import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import progressRoutes from "./Routes/progressRoutes.js";
import superAdminRoutes from "./Routes/superAdminRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
import trainerRoutes from "./Routes/trainerRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/api/progress", progressRoutes);
app.use("/api/superadmin", superAdminRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/trainers", trainerRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT , "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});