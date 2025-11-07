import fs from "fs/promises";
import fetch from "node-fetch";
import { parsePdf } from "../utils/pdfParser.js";

export async function analyzeResume(req, res) {
  try {
    // 1 . get plain text
    let resumeText = "";
    if (req.file) {
      resumeText = await parsePdf(req.file.path);
      await fs.unlink(req.file.path);
    } else if (req.body.text) {
      resumeText = req.body.text;
    } else {
      return res.status(400).json({ message: "No resume provided" });
    }

    // 2 . call Python AI service
    const aiResp = await fetch(`${process.env.PYTHON_SERVICE_URL}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resume_text: resumeText })
    });

    if (!aiResp.ok) {
      const errText = await aiResp.text();
      console.error("AI service error:", aiResp.status, errText);
      return res.status(502).json({ message: "AI service unavailable" });
    }

    const data = await aiResp.json();
    res.json(data);

  } catch (err) {
    console.error("AnalyzeResume error:", err);
    res.status(500).json({ message: "Server error" });
  }
}