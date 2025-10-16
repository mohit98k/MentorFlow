import mongoose, { mongo } from "mongoose";
const jobSchema=mongoose.Schema({

    user:{//this store only the user’s _id in the Job document, not the whole user object.
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    company:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        default:"Remote",
    },
    salary:{
        type:Number,
        default:0,
    },
    status:{
        type:String,
        enum: ["Applied", "Interview", "In Review", "Offer Received", "Rejected"],
        default:"Applied",
    },

},{timestamps:true});

export default mongoose.model("Job",jobSchema);