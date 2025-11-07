import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import resumeRoutes from "./routes/resume.js";
import aiRoutes from "./routes/aiRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import { createProxyMiddleware } from "http-proxy-middleware";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();

//  Enable CORS for frontend
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());

//  Resume & AI routes only (no login now)
app.use("/resume", resumeRoutes);
app.use("/ai", aiRoutes);

//  Forward AI requests to FastAPI (Gemini backend)
app.use(
  "/ai",
  createProxyMiddleware({
    target: "http://localhost:8000", // FastAPI service
    changeOrigin: true,
    pathRewrite: { "^/ai": "/api" }
  })
);

//  Root route for sanity check
app.get("/", (req, res) => {
  res.send("🚀 Resume Analyzer API (no login) is running");
});

//  Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ API ready on port ${PORT}`));
