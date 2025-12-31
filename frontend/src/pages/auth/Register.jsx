import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/axios';
import { Link } from 'react-router-dom';



const Register = () => {

  const navigate=useNavigate();

  const [fullName,setFullName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [userName,setUserName]=useState("");
  const [response,setresponse]=useState("");

  const handleSubmit= async (e)=>{

      e.preventDefault();//to stop the page refresh after clicking the create acc

      //validation
      if(!fullName.trim()){
        alert("full name is required");
        return;
      }
      if(!email.trim()){
        alert("email is required ");
        return ;
      }
      if(!password.trim()){
        alert("pass word is required ");
        return ;
      }
      if(!userName.trim()){
        alert("user name is required");
        return ;
      }
      //api call 

      try{
        const payload={userName,password,email,fullName};
        const res= await register(payload);
        console.log(res);
        setresponse(res.data?.message || "user created , now log in ");
        //redirecting to login after successful singup 
        navigate("/user/login");
      }catch(err){
        console.log(err.message);
        setresponse(err.response.data.message);
      }
    }


  return (
    <>
    <div className='bg-[#252850] text-center  flex flex-col min-h-screen items-center justify-center'>

        <div className='text-center text-[#1dbeeb] font-bold text-2xl p-2'>MentorFlow</div>
        <div className='p-1 text-center m-2 '>
            <Link to="/user/register"  className='p-1 mr-2 text-[#84a9b4] font-semibold'>Sing up</Link>
            <Link to="/user/login" className='p-1 ml-2 text-[#84a9b4] font-semibold'>Log in</Link>
        </div>
        <div className='flex justify-center '>
              <form className='w-64 p-1  flex flex-col gap-2' onSubmit={handleSubmit}>

                <input type="text" 
                  value={fullName}  
                  onChange={(e)=>setFullName(e.target.value)}
                  placeholder='FullName'
                  className=''
                />

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

                   <button className='text-xl font-sans text-white m-1 p-1' type='submit'>Create Account</button>
              </form>

             
        </div>
        <div>
          {/* show the response from the backend */}
             {response && (
              <div className='text-center font-semibold text-white mt-2'>
                {response}
              </div>
             )}
        </div>
    </div>
    </>
  )
}

export default Register