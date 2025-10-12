import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  resumeUrl: {
    type: String, // cloud link  
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  feedback: {
    type: String, 
  },
  missingSkills: [{
    type: String,
  }],
}, { timestamps: true });

export default mongoose.model("Resume", resumeSchema);
