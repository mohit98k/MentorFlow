import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navigator/Sidebar';
import { Menu } from 'lucide-react';
import { X } from 'lucide-react';
import { useState } from 'react';

const DashboardLayout = () => {

  const [open , setOpen]=useState(false);

 

  return (

    <div className='flex '>
       
        <aside className={`  ${open ? "block" : "hidden"}
                            fixed inset-y-0 left-0 z-50 w-64
                            bg-[#1f2347]
                            md:static md:block
                             min-h-screen`}>

          <button className=' md:hidden text-white bg-zinc-900 absolute top-3 right-2 ' onClick={()=>setOpen(false)}>
            <X className=''/>
          </button>

          <Sidebar className=''/>

          
        </aside>

    <div className='flex-1 bg-zinc-800'>
        <Menu className={  `md:hidden  ${open ? "hidden" : "flex" } bg-inherit text-white p-1 h-12 w-12 mt-4`} onClick={()=>setOpen(true)}/>

      <main className='md:p-4 min-h-screen'>
        <Outlet/>
      </main>
    </div>

    </div>
  )
}

export default DashboardLayout;