import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navigator/sidebar';
const DashboardLayout = () => {
  return (
    <div className='flex min-h-screen'>
      <Sidebar/>
      <main className=''>
        <Outlet/>
      </main>
    </div>
  )
}

export default DashboardLayout;