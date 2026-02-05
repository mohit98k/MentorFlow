import React from 'react'
import { Target, FileText, Briefcase , TrendingUp ,Sparkles } from "lucide-react";
import { useUser } from '../context/UserContext';
import { useState } from 'react';
import { generateRoadmap } from '../api/axios';

const Roadmaps = () => {

  const {user ,loading }=useUser();       
  const [roadmap,setRoadmap]=useState("");

    //save the app from crash 
    if (loading) {
      return <div className="text-white">Loading...</div>;
    }
    if (!user) {
      return null; 
    }

  const handleClick=async()=>{
    try{
      if(roadmap=="")return;
      const res=await generateRoadmap({ skill: roadmap });
      console.log(res);
    }catch(err){
      console.log(err);
    }
  }


  return (
    <div  className='min-h-screen text-white'>
      <div className='p-6'>
        <div className='text-2xl font-semibold'>Career Roadmap</div>
        <div className='text-gray-400'>Generate a personalized learning path for your career goals</div>
      </div>
      {/* generate roadmap option  */}
      <div className='p-6 pt-2 flex flex-col gap-2 justify-center'>
          <label htmlFor="">What's your career goal?</label>
          <input type="text" 
          placeholder='e.g. Software Engineer , Data Scientist , Product Manager' 
          className='text-white rounded-lg bg-zinc-600 p-1' 
          onChange={(e)=>setRoadmap(e.target.value)}
          />
          <button 
          className='bg-gradient-to-r from-purple-500 via-blue-400 to-blue-500  rounded-lg p-2 w-52 flex gap-2'
          onClick={()=>handleClick()}
          >
            <Sparkles/>
          Generate Roadmap
        </button>
      </div>
    </div>
  )
}

export default Roadmaps