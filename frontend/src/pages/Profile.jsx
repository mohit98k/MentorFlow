import React from 'react'
import { update } from '../api/axios';
import { addSkill } from '../api/axios';
import { deleteSkill } from '../api/axios';
import { useUser } from '../context/UserContext';
import { User, Mail, Briefcase, Target, Plus } from "lucide-react";


const Profile = () => {

   const {user,loading} =useUser();
    //save the app from crash 
    if (loading) {
      return <div className="text-white">Loading...</div>;
    }
    if (!user) {
      return null; 
    }
   const [fname, lname] = user.user.fullName.split(" ");
   const email=user.user.email;

   
  
  return (
    <div className="text-white min-h-screen mt-5 ml-5 mr-5">

      <div >
        <div className='text-2xl font-semibold'>Profile Settings</div>
        <div className='text-gray-400'>Manage your account </div>
      </div>



      <div className='flex flex-col justify-center mt-8 md:mt-12 md:ml-12 p-2  md:w-3/5 border-2 hover:border-blue-400  rounded-md  border-blue-200'>

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
                <input type="text" className='bg-zinc-700 rounded-md border-none p-1 pl-2'   placeholder={fname}/>
            </div>
            <div className='flex flex-col m-3'>
                <label htmlFor="">Last Name</label>
                <input type="text" className='bg-zinc-700 rounded-md border-none p-1 pl-2'   placeholder={lname}/>
            </div>
         </div>
         <div className='m-3'>
            <div className='flex flex-col'>
                <label htmlFor="">Email</label>
                <input type="text" className='bg-zinc-700 rounded-md border-none p-1 pl-2 md:w-5/12'   placeholder={email}/>
            </div>
         </div>
        </form>

      </div>
      <div className='flex flex-col justify-center mt-8 md:mt-12 md:ml-12 p-2  md:w-3/5 border-2  hover:border-blue-400 rounded-md  border-blue-200'>
          <div className='flex-col gap-1'>
                <div className='flex gap-1'>
                  <Briefcase className='text-blue-300'/>
                  <div className='text-xl font-semibold'>Skills & Expertise</div>
                </div>
                <div className='text-gray-400'>Track your technical and soft skills</div>
            </div>

      </div>
    </div>
  )
}

export default Profile