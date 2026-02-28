import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import planRoutes from "./Routes/planRoutes.js";
import exerciseRoutes from "./Routes/exerciseRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
import trainerRoutes from "./Routes/trainerRoutes.js";
import userRoutes from "./Routes/userRoutes.js";

dotenv.config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/users", userRoutes);





// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});