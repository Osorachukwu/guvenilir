import React from 'react'
import bannerIng from "../../assets/images (1).jpg"

export default function Banner({ title }) {
  return (
    <div className='relative h-[45vh] w-full flex justify-center items-center'>
      <img src="https://thumbs.dreamstime.com/b/group-colleagues-friends-collaborating-round-table-modern-office-diverse-people-gathers-around-reviewing-documents-424645769.jpg" alt="Banner" className='absolute w-full h-full object-cover' />
      <div className='absolute h-full w-full bg-base-200/50 backdrop-blur-xs'></div>
      <p className='text-6xl font-semibold z-40'>
        {title}
      </p>
    </div>
  )
}
