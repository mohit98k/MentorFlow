import React, { useEffect } from 'react'
import { Sparkles ,Map , ChevronDown ,ChevronUp } from "lucide-react";
import { useUser } from '../context/UserContext';
import { useState } from 'react';
import { generateRoadmap } from '../api/axios';
import RoadmapCard from '../components/ui/RoadmapCard';


const Roadmaps = () => {

  const {user ,loading }=useUser();       
  const [roadmap,setRoadmap]=useState([]);
  const [querryPath,setQuerryPath]=useState("");
  const [reqSent,setRequestsent]=useState(false);
  
  useEffect(()=>{
    if(user?.user?.roadMaps){
      setRoadmap(user.user.roadMaps);
      // console.log(user);
    }
  },[user]);
  
    //save the app from crash 
    if (loading) {
      return <div className="text-white">Loading...</div>;
    }
    if (!user) {
      return null; 
    }


//  console.log("here is the roadmap state")
//  console.log(roadmap)

  const handleClick=async()=>{
    try{
      if(querryPath=="")return;
      setRequestsent(true);
      const res=await generateRoadmap({ skill: querryPath });
      setQuerryPath("");
      setRequestsent(false);
      // console.log(res)
      setRoadmap(prev => [ res.data.path,...prev]);
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
          value={querryPath} 
          onChange={(e)=>setQuerryPath(e.target.value)}
          />
          <button 
          className='bg-gradient-to-tr from-purple-500 via-blue-400 to-blue-500  rounded-lg p-2 w-52 flex gap-2'
          onClick={()=>handleClick()}
          disabled={reqSent}
          >
            <Sparkles/>
          {reqSent?"Generating...":"Generate"}
        </button>
      </div>


      {/* display the roadmaps of the user  */}

    {  roadmap.length>0 && (
        <div className='border-2 border-white hover:border-blue-400 m-4 p-4'>
           
               {roadmap.map((r,i)=>(
                <div  key={i} className='border border-green-200  mb-2 p-2 '>
                    <RoadmapCard rmap={r} />
                </div>
               ))}
            
        </div>)
      }
    </div>
  )
}

export default Roadmaps