import React from 'react'
import { update } from '../api/axios';
import { addSkill } from '../api/axios';
import { useUser } from '../context/UserContext';
import { User, Briefcase, Plus } from "lucide-react";
import SkillTag from '../components/ui/skilltag';
import { useState } from 'react';


const Profile = () => {

   const {user,loading} =useUser();
   const [newFName,setNewFName]=useState("");
   const [newLName,setNewLName]=useState("");
   const [newEmail,setNewEmail]=useState("");
   const [newSkill,setNewSkill]=useState("");
   
    //save the app from crash 
    if (loading) {
      return <div className="text-white">Loading...</div>;
    }
    if (!user) {
      return null; 
    }

   let skills=user.user.skills;
   const [fname, lname] = user.user.fullName.split(" ");
   const email=user.user.email;
   const [emailError,setemailError]=useState("");
   

   const handleClick=async ()=>{
    try{
     const res= await addSkill({skill: newSkill});
      console.log(res);
      console.log(newSkill+" added to skill")
    }catch(err){
      console.log(err);
    }
   }

   const handleUpdate=async ()=>{
    try{
      setemailError("");
      const fullname=(newFName?newFName:fname)+" "+(newLName?newLName:lname);
      const res=await update({fullName:fullname,email:newEmail});
      console.log(res);
    }catch(err){
     let emailErrormssg=err.response.data.message;
     setemailError(emailErrormssg);
      console.log(emailErrormssg);
    }
   }
   

   
  
  return (
    <div className="text-white min-h-screen mt-5 ml-5 mr-5">

      <div >
        <div className='text-2xl font-semibold'>Profile Settings</div>
        <div className='text-gray-400'>Manage your account </div>
      </div>



      <div className='flex flex-col justify-center mt-8 md:mt-12 md:ml-12 p-2  md:w-3/5 border-2
       hover:border-blue-400  rounded-md  border-blue-200'>

        <div className='flex-col gap-1'>
            <div className='flex'>
              <User className='text-blue-300'/>
              <div className='text-xl font-semibold'>Personal Information</div>
            </div>
            <div className='text-gray-400'>Update your basic details</div>
        </div>


        <form action="submit" className='mt-5 md:mt-8 '>
         <div className=' md:flex gap-5 '>
              <div className='flex flex-col m-3'>
                <label htmlFor="">First Name</label>
                <input type="text" 
                className='bg-zinc-700 rounded-md border-none p-1 pl-2'   
                placeholder={fname}
                value={newFName}
                onChange={(e)=>{setNewFName(e.target.value)}}
                />
            </div>
            <div className='flex flex-col m-3'>
                <label htmlFor="">Last Name</label>
                <input type="text" 
                className='bg-zinc-700 rounded-md border-none p-1 pl-2' 
                placeholder={lname}
                value={newLName}
                onChange={(e)=>{setNewLName(e.target.value)}}
                />
            </div>
         </div>
         <div className='m-3'>
            <div className='flex flex-col'>
                <label htmlFor="">Email</label>
                {emailError && <label className='text-red-500'>{emailError}</label>}
                <input type="text"
                className='bg-zinc-700 rounded-md border-none p-1 pl-2 md:w-5/12'   
                placeholder={email}
                value={newEmail}
                onChange={(e)=>{setNewEmail(e.target.value)}}
                />
            </div>
         </div>
        </form>

      </div>
      <div className='flex flex-col justify-center mt-8 md:mt-12 md:ml-12 p-2  md:w-3/5 border-2 
       hover:border-blue-400 rounded-md  border-blue-200'>
          <div className='flex-col gap-1'>
                <div className='flex gap-1'>
                  <Briefcase className='text-blue-300'/>
                  <div className='text-xl font-semibold'>Skills & Expertise</div>
                </div>
                <div className='text-gray-400'>Track your technical and soft skills</div>
            </div>

            <div className='m-4'>
                {skills.map((s, i) => (
                  <SkillTag key={i} skillname={s} />
                ))}
            </div>
      </div >

      <div className='flex  justify-between items-center mt-8 md:mt-12 md:ml-12 p-2  md:w-3/5 border-2 
       hover:border-blue-400 rounded-md  border-blue-200'>
        
            <div className='flex flex-col'>
                <label htmlFor="">Addskill</label>
                <div className='flex gap-1 p-1 items-center'>
                  <input type="text" 
                  value={newSkill} 
                  onChange={(e)=>{setNewSkill(e.target.value)}}
                  onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleClick();
                          setNewSkill("");
                        }
                      }}
                  className='bg-zinc-700 rounded-md border-none p-1 pl-2 w-48'   placeholder='new skill'/>
                  <Plus className='bg-blue-400 rounded-md'
                    onClick={
                    ()=>{
                      handleClick();
                      setNewSkill("");
                    }
                  }/>
                </div>
                
            </div>
            <div className=''>
              <button className='bg-green-400 text-black rounded-lg p-2'
                onClick={()=>{
                  handleUpdate();
                  setNewFName("");
                  setNewEmail("");
                  setNewLName("");
                }}
              >
                  SaveChanges
              </button>
            </div>

      </div>
    </div>
  )
}

export default Profile