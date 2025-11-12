import express from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {addJob,updateJob,removeJob} from "../controllers/job.controller.js";

const router = express.Router();

// Jobs
router.post("/jobs",verifyJWT,addJob);
router.delete("/jobs/:id",verifyJWT,removeJob);
router.put("/jobs/:id",verifyJWT,updateJob);

export default router;