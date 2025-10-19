import Job from "../models/job.model.js";
import User from "../models/user.model.js";

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
        return res.status(500).json({message:"failed to add job"});        
    }
}

const updateJob = async (req,res)=>{
    //get the job id form the param , Frontend uses the Job _id when sending an update request.
    //ensure the user is authorize to edit the job means its his job
    //now get the info that the user wants to update 
    //update them in db and save
    // return the new updated job in response

    try{
        const jobId = req.params.id;

        const job = await Job.findOne({ _id: jobId, user: req.user._id });  
        if (!job) {
        return res.status(404).json({ message: "Job not found or unauthorized" });
        }

        const { title, company, location, salary, status, description } = req.body;

        if (title) job.title = title;
        if (company) job.company = company;
        if (location) job.location = location;
        if (salary) job.salary = salary;
        if (status) job.status = status;
        if (description) job.description = description;

        await job.save();

        return res.status(200).json(
            {
                success:true,
                message:"the job has been updated",
                job:job,
            }
        )

    }catch(error){
        console.log('failed to update job');
        return res.status(500).json({message:"failed to update job"});
        
    }
}

const removeJob=async(req,res)=>{
    //get the job id
    //find the user 
    //check if the user is authorize to delete the job
    //delete the job and its ref formt he user model too
    //reurn response

    try{
        const jobId=req.params.id;
        const userId = req.user._id;

        // Check if job belongs to the current user
        const job = await Job.findOne({ _id: jobId, user: userId });

        if (!job) {
        return res.status(404).json({
            success: false,
            message: "Job not found or unauthorized",
        });
        }

        // Delete the job
        await job.deleteOne();
        //remove the ref form db
        await User.findByIdAndUpdate(userId, {
        $pull: { jobs: jobId },//$pull removes any value from an array that matches a condition.
        });

        return res.status(200).json({
        success: true,
        message: "Job removed successfully",
        });

    }catch(error){
        console.log('failed to remove job');
        return res.status(500).json({message:"failed to remove job"});
        
    }
}


export default {addJob,updateJob,removeJob};