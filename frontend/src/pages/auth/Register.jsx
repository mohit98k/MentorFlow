import React from 'react'
import { useState } from 'react'
const Register = () => {
  const [fullName,setFullName]=useState("");
  const [email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  return (
    <>
    <div className='bg-[#252850] text-center'>

        <div className='text-center text-[#0d86a8] font-semibold text-xl p-2'>MentorFlow</div>
        <div className='p-1 text-center m-2 '>
            <button className='p-1 mr-2 text-[#84a9b4] font-semibold'>Sing up</button>
            <button className='p-1 ml-2 text-[#84a9b4] font-semibold'>Log in</button>
        </div>
        <div className='flex justify-center'>
              <form className='w-64 p-1 marker: bg-[#252850] flex flex-col' action="" >
                <input type="text" 
                  value={fullName}  
                  onChange={(e)=>setFullName(e.target.value)}
                  placeholder='Name'
                  ClassName='p-1 mb-1'
                />
                <input type="email"  
                  placeholder='Email' 
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  className='p-1 mb-1' />
                <input type="password"  
                  placeholder='Password' 
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  className='p-1 mb-1'/>
              </form>
        </div>
        <button className='text-xl font-sans text-white m-2 p-1'>Create Account</button>
    </div>
    </>
  )
}

export default Register