import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true
}));
app.use(cookieParser()); 
// Root Route
app.get("/", (req, res) => {
  res.json({ message: "API Running 🚀" });
});



// Routes
app.use("/api/auth", authRoutes);


// MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");
    console.log(`📦 Host: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ DB Connection Failed");
    process.exit(1);
  }
};

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});



