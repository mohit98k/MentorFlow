import React from 'react'
import { Plus } from 'lucide-react'
import { useState , useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { addJob } from '../api/axios';
import JobCard from '../components/ui/JobCard';



const Jobs = () => {

  const {user ,loading }=useUser();                         

  const [title,setTitle]=useState("");
  const [company,setCompany]=useState("");
  const [location,setLocation]=useState("");
  const [salary,setSalary]=useState(0);
  const [status,setStatus]=useState("Applied");
  const [jobs,setJobs]=useState([]);

  useEffect(()=>{
    if(user?.user?.jobs){
      setJobs(user.user.jobs);
      // console.log(jobs)
    }
  },[user]);

  //save the app from crash 
    if (loading) {
      return <div className="text-white">Loading...</div>;
    }
    if (!user) {
      return null; 
    }
  
   

  const handleClick=async()=>{
      if (!title || !company ) return;
    try{
        const res=await addJob({title:title,company:company,location:location,salary:salary,status:status});
        console.log(res);
        setTitle("");
        setCompany("");
        setLocation("");
        setSalary("");
        setStatus("Applied");
        setJobs(prev=>[...prev,{title:title,company:company,location:location,salary:salary,status:status}])
    }catch(err){
      console.log(err);
    }
  }

  //to imporve the ux lets do immidiate ui update on deleting a job 
  const onDelete=(jobname)=>{
    setJobs(prev=>prev.filter(j=>j.title!==jobname));
  }

  return (
    <div className='min-h-screen text-white p-6'>
       <div className='flex gap-3 justify-between'>
        <div >
        <div className='text-2xl font-semibold'>Job Tracker</div>
        <div className='text-gray-400'>Track your applications and interview progress</div>
      </div>
      <div>
        <button 
          className='bg-gradient-to-r from-purple-500 via-blue-400 to-blue-500  rounded-lg p-2 flex '
          onClick={()=>handleClick()}
        >
          <Plus/>
          Add Job 
        </button>
      </div>
       </div>
       
      <div className='border border-white hover:border-blue-400 mt-6'>
         <form action="" className='p-4 md:flex justify-between gap-1'>
         <div className='flex flex-col flex-wrap'>
           <label htmlFor="">title</label>
           <input type="text" value={title} className='bg-zinc-700 rounded-lg pl-1' onChange={(e)=>{setTitle(e.target.value)}}/>
         </div>
          <div className='flex flex-col'>
           <label htmlFor="">company</label>
           <input type="text" value={company} className='bg-zinc-700 rounded-lg pl-1' onChange={(e)=>{setCompany(e.target.value)}}/>
         </div>
         <div className='flex flex-col'>
           <label htmlFor="">location</label>
           <input type="text" value={location} className='bg-zinc-700 rounded-lg pl-1' onChange={(e)=>{setLocation(e.target.value)}}/>
         </div>
         <div className='flex flex-col'>
           <label htmlFor="">salary</label>
           <input type="Number" value={salary} className='bg-zinc-700 rounded-lg pl-1' onChange={(e)=>{setSalary(Number(e.target.value))}}/>
         </div>
         <div className='flex flex-col'>
           <label htmlFor="">status</label>
            <select name="" id="" value={status}className='text-white bg-zinc-700 rounded-lg' onChange={(e)=>{setStatus(e.target.value)}}>
               <option value="Applied">Applied</option>
               <option value="Interview">Interview</option>
               <option value="In Review">In Review</option>
               <option value="Offer Received">Offer Received</option>
               <option value="Rejected">Rejected</option>
            </select>
         </div>
         </form>
      </div>
       {jobs.length>0 && (
          <div className='border border-white hover:border-blue-400 mt-6'>
          <div className='m-4 '>
                {jobs.map((j) => (
                  <JobCard  key={j._id} job={j} onDelete={onDelete} />
                ))}
            </div>

           </div>
       )}
         
       
  
    </div>
  )
}

export default Jobs