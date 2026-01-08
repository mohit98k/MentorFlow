import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navigator/Sidebar';
const DashboardLayout = () => {
  return (
    <div className='flex min-h-screen '>
      <Sidebar/>
      <main className='flex-1  bg-zinc-800 text-white'>
        <Outlet/>
      </main>
    </div>
  )
}

export default DashboardLayout;