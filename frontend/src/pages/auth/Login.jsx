import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../api/axios';

const Login = () => {

  const navigate=useNavigate();

  const [userName,setUserName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const handleSubmit=async(e)=>{

    e.preventDefault();

    

    if(!userName.trim() && !email.trim()){
      alert("full name or email one is required");
        return;
    }
    if(!password.trim()){
      alert("password is empty");
      return;
    }
    //api call
    try{
      const payload={userName,email,password};
      const res=await login(payload);
      console.log(res);
      localStorage.setItem("accessToken",res.data.accessToken);
      navigate("/user/user");
      
    }catch(err){
      const msg =
      err.response?.data?.message ||err.message ||  "Login failed";
      console.log(msg);
      alert(msg);
    }
  }

  return (
   <div className='bg-[#252850] text-center  flex flex-col min-h-screen items-center justify-center'>
   
           <div className='text-center text-[#17b2dd] font-bold text-2xl p-2'>MentorFlow</div>
           <div className='p-1 text-center m-2 '>
               <Link to="/user/register"  className='p-1 mr-2 text-[#84a9b4] font-semibold'>Sing up</Link>
               <Link to="/user/login" className='p-1 ml-2 text-[#84a9b4] font-semibold'>Log in</Link>
           </div>
           <div className='flex justify-center '>
                 <form className='w-64 p-1  flex flex-col gap-2' onSubmit={handleSubmit} >
   
                   <input type="text" 
                     value={userName}  
                     onChange={(e)=>setUserName(e.target.value)}
                     placeholder='userName'
                     className=''
                   />
   
                   <input type="email"  
                     placeholder='Email' 
                     value={email}
                     onChange={(e)=>setEmail(e.target.value)}
                     className='' />
   
                   <input type="password"  
                     placeholder='Password' 
                     value={password}
                     onChange={(e)=>setPassword(e.target.value)}
                     className=''/>
   
                      <button className='text-xl font-sans text-white m-1 p-1' type='submit'> Log into your account</button>
                 </form>
   
                
           </div>
         
       </div>
  )
}

export default Login