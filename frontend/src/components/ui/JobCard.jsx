import { Briefcase, Trash2 } from "lucide-react";
import { deleteJob } from "../../api/axios";
import { updateJob } from "../../api/axios";
import { SquarePen } from 'lucide-react';
import { useState } from "react";
import { Save } from 'lucide-react';

const JobCard = ({ job,onDelete }) => {
  const { title, company, location, status, salary } = job;
  const [openMenu,setOpenMenu]=useState(false);

    const [newTitle,setNewTitle]=useState(title);
    const [newCompany,setNewCompany]=useState(company);
    const [newLocation,setNewLocation]=useState(location);
    const [newSalary,setNewSalary]=useState(salary);
    const [newStatus,setNewStatus]=useState(status);

  const handleDelete=async()=>{
    try{
      const res=await deleteJob(job._id);
      onDelete(job.title)
      console.log(res); 
    }catch(err){
      console.log(err);
    }
  }


  const handleUpdate=async(jobid)=>{
    setOpenMenu(false);
    try{
      const payload = {
      title: newTitle,
      company: newCompany,
      location: newLocation,
      salary: newSalary,
      status: newStatus
      };
      const res=await updateJob(jobid,payload);
      console.log(res);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="border border-zinc-600 rounded-lg p-4 mb-3 hover:border-blue-400 transition">
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex gap-2 items-center">
          <Briefcase className="text-blue-400" />
          <div>
            <div className="text-lg font-semibold">{title}</div>
            <div className="text-sm text-gray-400">{company}</div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            className="text-red-400 hover:text-red-500"
            onClick={() => handleDelete(job._id)}
            >
            <Trash2 size={18} />
        </button>
        <button
        className="text-green-400 hover:text-green-500"
        onClick={()=>setOpenMenu(true)}
        >
          <SquarePen size={18}/>
        </button>
        </div>
      </div>

      {/* Details */}
      <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-gray-300">
        <div>
          <span className="text-gray-400">Location:</span> {location || "—"}
        </div>
        <div>
          <span className="text-gray-400">Salary:</span>{" "}
          {salary ? `₹${salary}` : "—"}
        </div>
        <div>
          <span className="text-gray-400">Status:</span>{" "}
          <span className="text-blue-300">{status}</span>
        </div>
      </div>

      {/* edit form */}
      {openMenu && (
         <div className="border mt-4">
        <form action="" className='p-4 md:flex justify-between gap-1'>
         <div className='flex flex-col flex-wrap'>
           <label htmlFor="">title</label>
           <input type="text" className='bg-zinc-700 rounded-lg' onChange={(e)=>{setNewTitle(e.target.value)}}/>
         </div>
          <div className='flex flex-col'>
           <label htmlFor="">company</label>
           <input type="text" className='bg-zinc-700 rounded-lg' onChange={(e)=>{setNewCompany(e.target.value)}}/>
         </div>
         <div className='flex flex-col'>
           <label htmlFor="">location</label>
           <input type="text" className='bg-zinc-700 rounded-lg' onChange={(e)=>{setNewLocation(e.target.value)}}/>
         </div>
         <div className='flex flex-col'>
           <label htmlFor="">salary</label>
           <input type="Number" className='bg-zinc-700 rounded-lg' onChange={(e)=>{setNewSalary(Number(e.target.value))}}/>
         </div>
         <div className='flex flex-col'>
           <label htmlFor="">status</label>
            <select name="" id="" className='text-white bg-zinc-700 rounded-lg' onChange={(e)=>{setNewStatus(e.target.value)}}>
               <option value="Applied">Applied</option>
               <option value="Interview">Interview</option>
               <option value="In Review">In Review</option>
               <option value="Offer Received">Offer Received</option>
               <option value="Rejected">Rejected</option>
            </select>
         </div>
         <div className=" p-5 flex justify-center ">
          <button className="text-white" onClick={()=>{handleUpdate(job._id)}}><Save/></button>
         </div>
         </form>
      </div>
      )}
    </div>
  );
};

export default JobCard;
