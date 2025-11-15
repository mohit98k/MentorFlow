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

//right now this resume model has no use cause i dont want to show the user its all previous uploaded resume 
//will think about it later