import mongoose from "mongoose";
import User from "../models/user.model.js"



//////////////////////////////register user///////////////////////////////////////

export const registerUser=async (req,res)=>{
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

        console.log('new user created '+ createdUser.userName);
        

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

export const loginUser=async (req,res)=>{
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
            secure:process.env.NODE_ENV === "production", // only true in prod    
        }
        console.log('logged in successfully '+ loggedInUser.userName); 
        
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

 export const logOutUser=async(req,res)=>{
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
        console.log(u.userName + " is geeting logged out");
        
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



////////////////////////////////// update User Info (email and full name only) //////////////////////////////////////
export const updateUserInfo=async(req,res)=>{
    //find the user ref
    //fetch the user form db
    //update its info , save
    //return new updated user 
    try{
        const userID=req.user._id;
        if (!userID) {
                return res.status(401).json({ message: "Unauthorized" });
        }
        
        const {email,fullName,}=req.body;
        if (!email && !fullName) {
            return res.status(400).json({ message: "No fields provided to update" });
        }

        // Check if email already exists (if being updated)
        if (email) {
        const emailExists = await User.findOne({ email });
        if (emailExists && emailExists._id.toString() !== userID.toString()) {
            return res.status(400).json({ message: "Email already in use" });
        }
        }

        const updatedUser = await User.findByIdAndUpdate(
        userID,
        { $set: { ...(email && { email }), ...(fullName && { fullName }) } },
        { new: true }
        ).select("-password -refreshToken");

        console.log('updated user info of '+updatedUser.userName);
        console.log('new info : email -> ' + email +" fullName-> "+ fullName);
        
        

        return res.status(200).json(
            {
                success:true,
                message:"the info has been updated",
                user:updatedUser,
            }
        )


    }catch(error){
        console.log('couldnt update user info'+error.message);
        return res.status(500).json({message:"couldnt update user info"});
        
    }
}


////////////////////////////////// add User skills //////////////////////////////////////
export const addSkill=async(req,res)=>{
    //get the id 
    //get the skill
    //update and save
    //return new user
    try{
        const userID=req.user._id;

        const {skill}=req.body;
        if (!skill || skill.trim() === "") {
           return res.status(400).json({ message: "Skill is required" });
        }

        const user=await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // avoid duplicate skills
        if (user.skills.includes(skill)) {
            return res.status(400).json({ message: "Skill already exists" });
        }

        user.skills.push(skill);
        console.log(skill+" added to user "+ user.userName +" as skill ");
        
        await user.save();

        const safeUser = user.toObject();
        delete safeUser.password;
        delete safeUser.refreshToken;

        return res.status(200).json({
        success: true,
        message: "Skill added successfully",
        user: safeUser,
        });


    }catch(error){
        console.log('failed to add skill');
        return res.status(500).json({message:"failed to update skill"});
        
    }
}





////////////////////////////////// delete User skills //////////////////////////////////////

export const removeSkill = async (req, res) => {
  try {
    const userID = req.user._id;//auth middleware helped here
    const { skill } = req.params;

    if (!skill || skill.trim() === "") {
      return res.status(400).json({ message: "Skill is required" });
    }

    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // check if skill exists
    const skillIndex = user.skills.indexOf(skill);
    if (skillIndex === -1) {
      return res.status(400).json({ message: "Skill not found" });
    }
    
    // remove skill
    user.skills.splice(skillIndex, 1); //splice(startIndex, deleteCount)
    await user.save();

    //log
    console.log('the skill : '+skill+" was removed from user "+user.userName);
    
    // clean user before sending back
    const safeUser = user.toObject();
    delete safeUser.password;
    delete safeUser.refreshToken;

    return res.status(200).json({
      success: true,
      message: "Skill removed successfully",
      user: safeUser,
    });

  } catch (error) {
    console.error("Failed to remove skill:", error);
    return res.status(500).json({ message: "Failed to remove skill" });
  }
};



/////////////////////////////////// find current user or dashboard user /////////////////////////////

export const getCurrentUser=async (req ,res)=>{
         try{
             if (!req.user) {
                return res.status(401).json({ success: false, message: "Unauthorized access" });
             }
             console.log("fetching the user info of " + req.user.userName);
             
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