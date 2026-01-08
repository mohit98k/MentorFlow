import React from 'react'

const LogoutButton = () => {
  const handleClick=()=>{
        console.log("log out");
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