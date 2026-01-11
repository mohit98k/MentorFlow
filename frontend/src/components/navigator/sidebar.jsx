import React from 'react'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className=' h-full  flex  flex-col gap-3 w-64 bg-zinc-900 text-white p-4   '>

       <NavLink to="/profile">My profile</NavLink>
       <NavLink to="/dashboard">Dashboard</NavLink>
       <NavLink to="/roadmaps">Roadmaps</NavLink>
       <NavLink to="/jobs">Jobs</NavLink>
       <NavLink to="/resume">GetResumeScore</NavLink>
       <NavLink to="/logout" className='text-red-500 '>Logout</NavLink>
       
    </div>
  )
}

export default Sidebar;