import React from 'react'
import Statcard from '../components/ui/Statcard'
import { Target, FileText, Briefcase , TrendingUp ,Sparkles } from "lucide-react";
import LogoutButton from '../components/ui/LogoutButton';
const Dashboard = () => {
  return (
    <div className='min-h-screen bg-inherit p-5 '>

      <div className='flex flex-row mt-8 mb-12 justify-between pr-2'>
        <div className='text-white text-2xl font-semibold '>
        Welcome back, User
        <div className='text-sm text-gray-200 font-normal'> 
          Here's your career progress overview
        </div>
        
      </div>
      <LogoutButton/>
      </div>
      
      <div className='grid sm-grid-cols-2 grid-cols-3 gap-6 mb-8 p-2' >
          <Statcard
            Icon={Target}
            title="4 Active Path"
            text="career goals"
          />
          <Statcard
            Icon={FileText}
            title="85%"
            text="Resume Score"
          />
          <Statcard
            Icon={Briefcase}
            title="12"
            text="Applications"
          />
           <Statcard
            Icon={TrendingUp}
            title="8"
            text="Skills Aquired"
          />
      </div>

      <div > 
        
        <div className='text-white text-2xl font-semibold mt-8 mb-12 '>
          <div className='flex flex-row'>
            <Sparkles/>
            <div>
               AI Recommendations
            </div>
          </div>
        <div className='text-sm text-gray-200 font-normal'> 
          Personalized suggestions for you
        </div>
      </div>

      </div>
      
    </div>
  )
}

export default Dashboard