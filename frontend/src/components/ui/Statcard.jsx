import React from 'react'
const Statcard = ({Icon,title,text}) => {
  return (
    <div className='flex flex-col bg-zinc-700 p-4 rounded-xl border-2 border-transparent hover:border-blue-200 hover:bg-zinc-600'>
        <Icon className="w-12 h-10 p-2 text-white bg-sky-400 rounded-xl"/>
        <div className= 'p-1 text-white font-semibold  text-xl'> {title} </div>
        <div className='text-green-400 p-1 font-sans '>{text}</div>
    </div>
  )
}

export default Statcard;