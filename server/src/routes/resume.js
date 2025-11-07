import {Router} from "express";
import multer from "multer";
import auth from "../middleware/auth.js";
import {analyzeResume} from "../controllers/resumeController.js";

const upload=multer({dest:"uploads/"}); const r=Router();
r.post("/analyze",auth,upload.single("file"),analyzeResume);
export default r;