import React from 'react'
import { replace, useNavigate } from 'react-router-dom'

const LogoutButton = () => {

  const navigate=useNavigate();

  const handleClick=()=>{
        localStorage.removeItem("accessToken");
        navigate("/login",{replace:true});
        console.log("the user got logged out");
    }
  return (
    <div>
        <button className='bg-red-600 rounded-md p-1   text-white' onClick={handleClick}>
            Logout
        </button>
    </div>
  )
}

export default LogoutButton;



 