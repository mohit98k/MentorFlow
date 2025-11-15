import mongoose from "mongoose";
const roadMapSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String, 
    },
    resources:[{
        type:String,
    }],
    milestones: [{
        type:String,
    }],
    progress:{//not needed for the mvp
        type:Number,
        default:0,
    },

},{timestamps:true});
export default mongoose.model("RoadMap",roadMapSchema);