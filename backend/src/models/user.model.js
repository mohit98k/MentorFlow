import mongoose from "mongoose";
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
    jobs:[{
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

export default mongoose.model("User",userSchema);