import React from 'react'
import Banner from '../components/ui/Banner'
import { Plans } from '../components/Pricing'
import Faqs from '../components/Faqs'

export default function Bitcoin() {
  return (
    <div className='w-full overflow-x-hidden'>
      <Banner />
      <div className='bg-base-300'>
        <Plans />
      </div>
      <Faqs />
    </div>
  )
}

