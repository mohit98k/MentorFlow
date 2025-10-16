import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema=new mongoose.Schema({

    userName:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:[true,"email is reqired"],
        lowercase:true,
        unique:true,
        trim:true,
    },
    fullName:{
        type:String,
        required:[true,"fullname is reqired"],
        trim:true,
    },
    resumeScore:{
        type:Number,
        default:0,
    },
    skills:[{
        type:String,
        trim:true,
    }],
    jobsAppliedCount:{
        type:Number,
        default:0,
    },
    activeLearningPaths:{
        type:Number,
        default:0,
    },
    jobs:[{//this store only the Job _ids in the User’s jobs array, not the full job documents.
        type: mongoose.Schema.Types.ObjectId,
        ref:"Job",
    }],
    roadMaps:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"RoadMap",
    }],
    refreshToken:{
        type:String,
    },


},{timestamps:true});


userSchema.pre("save", async function (next){

    if(this.isModified("password")){//if the password field has been modified only then ...
        this.password=await bcrypt.hash(this.password,10);
        next();
    }

    else return next();
    
});

userSchema.methods.isPassCorrect= async function (enterdpass){
    return await bcrypt.compare(enterdpass,this.password);
}

userSchema.methods.generateAccessToken=async function(){
    return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" } // access token valid for 15 minutes
  );
}

userSchema.methods.generateRefreshToken=async function(){
    return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" } // refresh token valid for 7 days
  );
}



export default mongoose.model("User",userSchema);