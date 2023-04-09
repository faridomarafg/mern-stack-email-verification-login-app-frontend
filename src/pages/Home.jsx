import React from 'react'
import {useDispatch, useSelector} from 'react-redux';

function Home() {
  const {user} = useSelector((state)=> state.auth);
  console.log(user);
  return (
    <div className='flex items-center justify-center pt-[140px] bg-emerald-500 h-screen w-full'>
      <div className='flex flex-col items-center'>
          <h1 className='text-white text-4xl'>Hey {user?.name}</h1>
          <p className='text-2xl text-slate-500'>Thanks for trying this app</p>
      </div>
    </div>
  )
}

export default Home