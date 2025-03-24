import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import adminRoutes from "./routes/admin.routes";
import studentRoutes from "./routes/student.routes";
import { setupSwagger } from "./config/swagger.config";
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/student", studentRoutes);

// Database connection
connectDB();
setupSwagger(app); 
export default app;

