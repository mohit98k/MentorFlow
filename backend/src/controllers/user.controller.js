import mongoose from "mongoose";
import User from "../models/user.model.js"



//////////////////////////////register user///////////////////////////////////////

const registerUser=async (req,res)=>{
    try{
         const {userName,password,email,fullName,}=req.body;

        if(!userName || !password || !email || !fullName ){
            console.log("all fields are required");
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser=await User.findOne({
            $or:[{userName}, {email}]
        })
        if(existingUser){
                console.log("the user already exists");
                return res.status(400).json({ message: "User already exists" });
            }
        
        const newUser=await User.create({
            fullName,
            email,
            password,
            userName:userName.toLowerCase(),
        })

        const createdUser=await User
        .findById(newUser._id)
        .select("-password -refreshToken");

         return  res.status(201).json({
            message: "User created successfully",
            user: createdUser,
            });
    }catch(error){
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
                 
                
}


///////////////////////////////////////log in user///////////////////////////////////

const loginUser=async (req,res)=>{
    try{
        const {userName,email,password}=req.body;
        if(!(userName||email) || !password){
            console.log("username / email and pass are required ");
            return res.status(400).json({message:"usrename / email and password is required"});
        }

        const user=await User.findOne({
            $or:[{userName},{email}]
        });
        if(!user){
            console.log("user not found buddy");
            return res.status(400).json({message:"the user doesnt exist"});
        }

        const isPasswordValid=await user.isPassCorrect(password);
        if(!isPasswordValid){
            console.log("the enterd passs is not correct ");
            return res.status(400).json({message:"the entered pass is incorrect"});
        }

        const accessToken =await user.generateAccessToken();               
        const refreshToken= await user.generateRefreshToken();

        user.refreshToken=refreshToken;
        await user.save({validateBeforeSave:false});

        const loggedInUser=await User.findById(user._id).select("-password -refreshToken");

        const options={
            httpOnly:true, //cookie not accessible via JS on frontend
            secure:true    //cookie only sent over HTTPS (important in production)
        }

        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json({//sends both token in json for frontend testing not mandatory but good practice
            user:loggedInUser,accessToken,refreshToken
        })
    }catch(error){
        console.error("Error in loginUser:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}



//////////////////////////////////log out user//////////////////////////////////////

 const logOutUser=async(req,res)=>{
    try{
        const userID=req.user._id;
        if (!userID) {
                return res.status(401).json({ message: "Unauthorized" });
        }

         const u= await User.findByIdAndUpdate(
                        userID,
                        {
                           $unset: { refreshToken: "" }
                        }
                    );
        const options={
                httpOnly:true,
                secure:true,
            }
         return res.status(200)
                    .clearCookie("accessToken", options)
                    .clearCookie("refreshToken", options)
                    .json({
                         message: "User logged out successfully",
                         user: null,
                     });
    }catch(error){
        console.log('error in logging out',error.message);
        return res.status(401).json({message:"error in logging out"});
    }
 }



/////////////////////////////////// find current user /////////////////////////////
const getCurrentUser=async (req ,res)=>{
         try{
             if (!req.user) {
                return res.status(401).json({ success: false, message: "Unauthorized access" });
             }
             
             return res.status(200).json({
                 success:true,
                 message: "User fetched successfully",
                 user: req.user,   // this is attached by verifyJWT middleware
             });
 
         }catch(er){
             console.log("error while finding the current user ");
             return res.status(500).json({message:"error while finding the current user "});
         }
}







export default {registerUser,loginUser,logOutUser,getCurrentUser};