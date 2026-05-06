import React from 'react'
import Faqs from '../components/Faqs'
import Banner from '../components/ui/Banner'

export default function FAQs() {
    return (
      <div className='w-full overflow-x-hidden'>
        <Banner title="FAQ's" />
         <Faqs />
      </div>
    )
}
