import React from 'react'
// import Banner from '../../components/Banner'
import image from "../../assets/2.png"
import { Menu } from 'lucide-react'
import FirstChoice from '../../components/FirstChoice'
import Banner from '../../components/ui/Banner'
// Contents not complete yet


export default function CannabisInvestments() {
  return (
    <div>
      <Banner title="Our Services" desc="Real Estate Investment" />
      <div className='pt-20'>
        {/* Title */}
        <div className='flex flex-col justify-center items-center mb-10'>
          <p className='text-3xl font-bold '>Real Estate Investment</p>
          <div className='bg-primary h-1 w-48 mt-1'>
          </div>
        </div>

        {/*  */}
        <div className='max-w-4xl mx-auto mb-10'>
          <img src={image} alt="" />

          <div className='flex justify-center mt-10'>
            <div className='flex items-start gap-4 sm:gap-6'>
              <div className='h-8 sm:h-14 w-8 sm:w-14 shrink-0 bg-primary rounded-xl sm:rounded-3xl flex justify-center items-center text-black'>
                <Menu />
              </div>
              <div>
                <p className='text-lg sm:text-2xl font-semibold mb-3'>
                  Cannabis

                </p>
                <p>
                  For many years we have been working conscientiously and with the most diverse technologies and means. We have constantly successfully completed our projects.
                  We believe that the full benefits and potential of cannabis as a medical therapy are within our reach only through supply chain transparency, an engaged and active network of cannabis users, and data that is consistently available and verifiable for medical surveys and for developing and establishing therapies and life-prolonging solutions and treatments on blockchain technology. Our vision is one in which cannabis medical research gets the support it needs and deserves.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/*  */}
        <FirstChoice />
      </div>
    </div>
  )
}
