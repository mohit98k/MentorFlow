import express from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {generatePath}from "../controllers/roadmap.controller.js";
import { removeRoadmap } from "../controllers/roadmap.controller.js";
const router = express.Router();

//roadmaps
router.post("/generate",verifyJWT,generatePath);
router.delete("/remove/:id",verifyJWT,removeRoadmap);

export default router;