import React from 'react'
import LogoutButton from '../components/ui/LogoutButton'

import { useNavigate } from 'react-router-dom'
const Logout = () => {
  const navigate=useNavigate();
  const handleclick=()=>{
    navigate("/dashboard");
  }
  return (
    <div className='min-h-screen bg-zinc-800 flex justify-center items-center'>
      <div className='bg-zinc-900 flex flex-col justify-center w-96 h-64 rounded-md p-8 gap-12 '>
        <div className='text-gray-400 font-semibold text-xl flex justify-center'>
          Are you sure you want to Logout?
        </div>
        <div className='flex justify-between gap-5 pl-6 pr-6'>
          <button className='bg-green-600 rounded-md text-xl p-1 ' onClick={handleclick}>cancel</button>
        <LogoutButton/>
        </div>
     </div>
    </div>
  )
}

export default Logout