import express from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { uploadResume } from "../middlewares/upload.middleware.js";
import { reviewResume } from "../controllers/resume.controller.js";

const router = express.Router();

router.post("/upload", verifyJWT, uploadResume.single("resume"), reviewResume);

export default router;
