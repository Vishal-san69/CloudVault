require("dotenv").config();

const { checkS3Connection } = require("./config/s3");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");
const documentRoutes = require("./routes/document.routes");

const pool = require("./config/db");
const authRoutes = require("./routes/auth.routes");

const app = express();

// Middleware MUST come before routes
app.use(helmet());

app.use(cors({
  origin: process.env.CLIENT_URL,
}));

app.use(express.json({ limit: "1mb" }));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
}));

// Authentication routes
app.use("/api/auth", authRoutes);

app.use("/api/documents", documentRoutes);
// Health check
app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");

    res.status(200).json({
      success: true,
      message: "CloudVault AI API is running",
      database: "connected",
    });
  } catch (error) {
    console.error("Database health check failed:", error);

    res.status(503).json({
      success: false,
      message: "Database connection failed",
    });
  }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`CloudVault AI API running on port ${PORT}`);

  await checkS3Connection();
});