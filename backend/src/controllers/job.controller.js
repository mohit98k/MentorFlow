import Job from "../models/job.model";
import User from "../models/user.model";

const addJob=async(req,res)=>{
     //get the job details from the user 
     //get the user id
     //find the user 
     //create a new job doc
     //attach the job id to the user 
    try{
        const{title,company,location,salary,status}=req.body;

        const userId=req.user._id;
        if (!userId) {
                return res.status(401).json({ message: "Unauthorized" });
        }

        const job=await Job.create({
            title,
            company,
            location,
            salary,
            status,
            user:userId,
        })

        const user=await User.findByIdAndUpdate(
            userId,
            {$push:{jobs: job._id}},//pushes the created job id to the array of jobs in user
            { new: true } // return updated user
        )

        return res.status(201).json({
            message: "Job added successfully",
            job,
            userJobs: user.jobs
        });


    }catch(error){
        console.log('failed to add job');
        return res.status(500).json({"message:failed to add job"});        
    }
}

const updateJob=async(req,res)=>{
    
}