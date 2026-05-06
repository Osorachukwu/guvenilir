import React from 'react'
import { Plans } from '../components/Pricing'
import Banner from '../components/ui/Banner'

export default function InvestmentPlans() {
  return (
    <div className='w-full overflow-x-hidden'>
        <Banner title="Plans" />
        <Plans />
    </div>
  )
}
