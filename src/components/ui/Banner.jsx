import React from 'react'
import bannerIng from "../../assets/images (1).jpg"

export default function Banner({ title, desc }) {
  return (
    <div className='relative h-[45vh] w-full flex justify-center items-center z-'>
      <p className='text-6xl font-semibold z-10'>
        {title}
      </p>
      {desc && <p>{desc}</p>}
      <img src="https://thumbs.dreamstime.com/b/group-colleagues-friends-collaborating-round-table-modern-office-diverse-people-gathers-around-reviewing-documents-424645769.jpg" alt="Banner" className='absolute w-full h-full object-cover' />
      <div className='absolute h-full w-full bg-base-200/50 backdrop-blur-xs'></div>

    </div>
  )
}
