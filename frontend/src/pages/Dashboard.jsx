import React from 'react'
import Statcard from '../components/ui/Statcard'
import { Target, FileText, Briefcase , TrendingUp ,Sparkles } from "lucide-react";
import LogoutButton from '../components/ui/LogoutButton';
import { useUser } from '../context/UserContext';

const aiSuggestions = [
  "Dive into Neuro-Symbolic Hybrid Learning to sharpen your reasoning + pattern skills.",
  "Explore Federated Privacy-Preserving Representation Learning to master secure data collaboration.",
  "Study Self-Supervised Vision Transformers and learn how models understand images without labels.",
  "Work on Causal Inference for shifting time-series so you can predict real-world system changes.",
  "Experiment with Graph Neural Networks to boost your ability to model relationships and networks.",
  "Benchmark diffusion-based generative methods to strengthen your grasp of modern AI creativity.",
  "Practice Multi-Agent Reinforcement Learning to understand how independent systems learn together.",
  "Learn sparse model-compression strategies to build faster, lighter AI without losing accuracy.",
  "Try program synthesis using LLM toolchains to see how models write code from pure logic.",
  "Analyze neural scaling laws to predict and control emergent behavior in massive models."
];

let index1 = Math.floor(Math.random() * 10); 
let index2 = Math.floor(Math.random() * 10); 
if(index1==index2){
  index2 = Math.floor(Math.random() * 10); 
}

const Dashboard = () => {

  const {user,loading} =useUser();
  //save the app from crash 
  if (loading) {
    return <div className="text-white">Loading...</div>;
  }
  if (!user) {
    return null; 
  }
  console.log(user);
 

  return (
    <div className='min-h-screen bg-inherit p-5 '>

      <div className='flex flex-row mt-8 mb-12 justify-between pr-2'>
        <div className='text-white text-2xl font-semibold '>
        Welcome back, {user.user.userName}
        <div className='text-sm text-gray-200 font-normal'> 
          Here's your career progress overview
        </div>
        
      </div>
      <LogoutButton/>
      </div>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 p-2 ' >
          <Statcard
            Icon={Target}
            title={user.user.activeLearningPaths}
            text="Active Learning Paths"
          />
          <Statcard
            Icon={FileText}
            title={user.user.resumeScore}
            text="Resume Score"
          />
          <Statcard
            Icon={Briefcase}
            title={user.user.jobsAppliedCount}
            text="Applications"
          />
           <Statcard
            Icon={TrendingUp}
            title={user.user.skills.length}
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
        <div className='text-lg mt-4 text-blue-200 p-2 flex flex-col gap-8'>
            <div >
               {aiSuggestions[index1]}
            </div>
            <div >
               {aiSuggestions[index2]}
            </div>
        </div>
      </div>

      </div>
      
    </div>
  )
}

export default Dashboard