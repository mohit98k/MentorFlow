import express from "express"
const router=express.Router();
import {registerUser,loginUser,logOutUser,updateUserInfo,addSkill,removeSkill,getCurrentUser} from "../controllers/user.controller.js";
import {addJob,updateJob,removeJob} from "../controllers/job.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

router.post("/register",registerUser);

router.post("/login",loginUser);

//secured routes

router.post("/logout",verifyJWT,logOutUser);
router.get("/user",verifyJWT,getCurrentUser);

// User Profile
router.put("/user",verifyJWT,updateUserInfo);

// Skills
router.post("/skills",verifyJWT,addSkill);
router.delete("/skills/:skill",verifyJWT,removeSkill);

// Jobs
router.post("/jobs",verifyJWT,addJob);
router.delete("/jobs/:id",verifyJWT,removeJob);
router.put("/jobs/:id",verifyJWT,updateJob);

export default router;