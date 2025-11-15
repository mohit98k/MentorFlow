import express from "express";
import verifyJWT from "../middlewares/auth.middleware.js";

import {generatePath}from "../controllers/roadmap.controller.js";
const router = express.Router();
//roadmaps
router.get("/",verifyJWT,generatePath);
export default router;