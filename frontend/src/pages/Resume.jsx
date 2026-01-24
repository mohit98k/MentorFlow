import React, { useEffect } from 'react'
import { useState } from 'react';
import { FileText, Upload, Sparkles } from "lucide-react";
import { analyzeResume } from '../api/axios';
import { useUser } from '../context/UserContext';
import { useOutletContext } from 'react-router-dom';

const Resume = () => {


  const {user,loading} =useUser();

  const[resumefile,setResumefile]=useState(null);
  // const[suggesstions,setSuggesstions]=useState([]); lift up this state to dashboard lay out cause of the re-rendering problem
  const { resumeSuggestions, setResumeSuggestions } = useOutletContext();
  const[requestSent,setRequestsent]=useState(false);

  const[atsScore,setatsScore]=useState(0);
    useEffect(() => {
    if (user) {
      setatsScore(user.user.resumeScore);
    }
  }, [user]);

   //save the app from crash 
    if (loading) {
      return <div className="text-white">Loading...</div>;
    }
    if (!user) {
      return null; 
    }
 
  const handleUpload=async()=>{
    if(!resumefile)return;
    if (requestSent) return; 
    const formData=new FormData();
    formData.append("resume",resumefile);
    try{
      setResumeSuggestions([]);
      setRequestsent(true);
      const res=await analyzeResume(formData);
      setatsScore(res.data.data.ats_score);
      setResumeSuggestions(res.data.data.suggestions);
      console.log(res);
    }catch(err){
      console.log(err);
    }finally{
      setRequestsent(false);
    }
  }
  
  return (
    <div className='bg-inherit min-h-screen text-white '>
       <div className='p-2'>
            <div className='text-2xl font-semibold'>Resume Analyzer</div>
            <div className='text-gray-400'>Get AI-powered feedback to improve your resume</div>
        </div>

      <div className='mt-8  flex flex-col gap-5 md:gap-1 md:m-8 md:flex-row justify-between  p-5 md:p-20'>

        {/* left box for upload */}
        <div className='border-2 rounded-lg p-3    hover:border-blue-300'>

           <div >
            <div className='flex gap-1 '>
              <FileText/>
              <div className='text-xl font-semibold'>Your Resume</div>
            </div>
            <div className='text-gray-400'>upload your resume pdf</div>
          </div>

         <div className='flex flex-col justify-center items-center p-4'>
          <Upload className='h-32 w-20 text-sm hover:text-blue-300'/>
             <input 
             type="file"
             disabled={requestSent}
             accept='.pdf,.doc,.docx'
             onChange={(e)=>setResumefile(e.target.files[0])}
            />
         </div>
          <div className='flex justify-center p-4  gap-1 md:mt-8
          bg-gradient-to-r from-indigo-500 via-blue-500 to-sky-500 rounded-xl md:w-96 '>
            <Sparkles/>
            <button onClick={handleUpload}  disabled={requestSent} > {requestSent ? "Analyzing..." : "Analyze Resume"}</button>
          </div>
        </div>


        {/* right box for resume score  */}
        <div className='border-2 rounded-lg p-2  hover:border-blue-300 '>
          <div >
            <div className='text-xl font-semibold'>Your Resume Score</div>
            <div className='text-gray-400'>Overall assessment of your resume</div>
          </div>
            <div className='flex justify-center mt-6 p-2'>
               <div className="h-32 w-32 rounded-full md:m-5 flex justify-center items-center
                 bg-gradient-to-t from-indigo-600 via-blue-400 to-indigo-900 ">
                 <span className='text-6xl font-semibold'>{atsScore}</span> 
                </div>
            </div>
            <div className='flex justify-center font-semibold text-lg'> 
                Strong Resume
            </div>
            <div className='text-gray-400 mb-5'>
              Your resume shows good structure and relevant experience
            </div>
        </div>
      </div>
      {/* suggesstions box */}
   {resumeSuggestions.length > 0 && (
      <div className="border-2 rounded-lg p-2 hover:border-blue-300 m-4">
        {resumeSuggestions.map((s, i) => (
          <div key={i} className="flex items-start gap-2 p-2 ">
            <span className="text-blue-400 mt-1">•</span>
            <span className="text-gray-200">{s}</span>
          </div>
        ))}
      </div>
    )}

      
    </div>
  )
}

export default Resume