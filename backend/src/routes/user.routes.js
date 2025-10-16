import express from "express"
const router=express.Router();
import {registerUser,loginUser,logOutUser,getCurrentUser} from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

router.post("/register",registerUser);

router.post("/login",loginUser);

//secured routes

router.post("/logout",verifyJWT,logOutUser);
router.get("/current-user",verifyJWT,getCurrentUser);


export default router;