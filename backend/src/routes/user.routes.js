import express from "express"
const router=express.Router();
import {registerUser,loginUser,logOutUser} from "../controllers/user.controller";
import verifyJWT from "../middlewares/auth.middleware";

router.post("/register",registerUser);

router.post("/login",loginUser);

//secured routes

router.post("/logout",verifyJWT,logOutUser);
