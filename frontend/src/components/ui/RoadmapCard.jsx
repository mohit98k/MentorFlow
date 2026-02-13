import React from 'react'
import { useState } from 'react';
import { Sparkles ,Map , ChevronDown ,ChevronUp } from "lucide-react";



const RoadmapCard = ({rmap}) => {

  const [showMap,setShowMap]=useState(false);


  return (
    <div className=''>

        <div className='flex justify-between'>

            <div className='flex'>
              <div> <Map className='text-blue-400 '/></div>
              <span className='text-white hover:text-blue-400 font-semibold pl-1'>{rmap.title}</span>
            </div>

            <div>
              <button onClick={()=>setShowMap(!showMap)}>
                {showMap===true && <ChevronUp/>}
                {showMap===false && <ChevronDown/>}
              </button>
            </div>

        </div>
      {/* show the info like milestones and resources */}
     
      {showMap && 
       (
         <div>
            <div className='p-2 font-xl text-blue-300'>MileStones</div>
              {rmap.milestones.map((r,i)=>(
                <div>
                  <span className="text-blue-400 mt-1 p-1">•</span>
                  <span className="text-gray-200 m-1">{r}</span>
                </div>
              ))}
         </div>
       )
      }

      {showMap && 
       (
         <div>
            <div className='p-2 font-xl text-blue-300'>Resources</div>
              {rmap.resources.map((r,i)=>(
                <div>
                  <span className="text-blue-400 mt-1 p-1">•</span>
                  <span className="text-gray-200 m-1">{r}</span>
                </div>
              ))}
         </div>
       )
      }


      
    </div>
  )
}

export default RoadmapCard