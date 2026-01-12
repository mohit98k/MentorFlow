import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {

  const activeStyle=({isActive})=>{
    return isActive?"bg-zinc-700 font-semibold rounded-md":"text-gray-300 hover:text-white";
  }

  return (
    <div className=' h-full  flex  flex-col gap-3 w-64 bg-zinc-900 text-white p-4   '>

       <NavLink to="/profile" className={activeStyle}>My profile</NavLink>
       <NavLink to="/dashboard" className={activeStyle}>Dashboard</NavLink>
       <NavLink to="/roadmaps" className={activeStyle}>Roadmaps</NavLink>
       <NavLink to="/jobs" className={activeStyle}>Jobs</NavLink>
       <NavLink to="/resume" className={activeStyle}>GetResumeScore</NavLink>
       {/* <NavLink to="/logout" className={`text-red-500 ${activeStyle}`}>Logout</NavLink>  this is wrong*/}
       <NavLink
        to="/logout"
        className={({ isActive }) =>
          isActive
            ? "bg-zinc-700 font-semibold rounded-md text-red-500"
            : "text-red-500 hover:text-white"
        }
      >
        Logout
      </NavLink>
       
    </div>
  )
}

export default Sidebar;