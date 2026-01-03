import React from 'react'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='w-64 bg-[#1f2347] text-white p-4 flex flex-col gap-3 '>

       <NavLink to="/dashboard">Dashboard</NavLink>
       <NavLink to="/roadmaps">Roadmaps</NavLink>
       <NavLink to="/jobs">Jobs</NavLink>
       <NavLink to="/resume">GetResumeScore</NavLink>

    </div>
  )
}

export default Sidebar;