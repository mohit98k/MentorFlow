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
    techStack:[{
        type:String,
    }],
    milestones: [{
        milestoneTitle: { type: String, required: true },
        description: { type: String },
        completed: { type: Boolean, default: false },
    }],
    progress:{
        type:Number,
        default:0,
    },

},{timestamps:true});
export default mongoose.model("RoadMap",roadMapSchema);