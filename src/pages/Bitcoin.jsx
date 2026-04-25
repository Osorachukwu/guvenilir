import React from 'react'
import Banner from '../components/ui/Banner'
import { Plans } from '../components/Pricing'
import Faqs from '../components/Faqs'

export default function Bitcoin() {
  return (
    <div>
      <Banner />
      <div className='bg-base-300'>
        <Plans />
      </div>
      <Faqs />
    </div>
  )
}

