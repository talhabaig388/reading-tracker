const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const readerRoutes = require("./routes/readerRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");

dotenv.config();

const app = express();



// Middleware
app.use(cors());
app.use(express.json());

// 🔥 DEBUG MIDDLEWARE
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});



// ✅ MongoDB Connection (VERY IMPORTANT)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Error:", err);
    process.exit(1);
  }
};

connectDB();

// Routes
console.log("Loading auth routes...");
const authRoutes = require("./routes/authRoutes");
console.log("Auth routes loaded");

app.use("/api/auth", authRoutes);
app.use("/api/readers", readerRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});