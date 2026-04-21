import React from 'react'
import Hero from '../components/Hero'
import { ChartArea, Check } from 'lucide-react'
import Pricing from '../components/Pricing'
import PricingCrad from '../components/PricingCrad'
import ThreeSteps from '../components/ThreeSteps'
import AboutUs from '../components/AboutUs'
import CTA from '../components/CTA'
import Footer from '../components/Footer'
import theImage from "../assets/images (1).jpg"
import AboutSection from '../components/AboutSection'

export default function Home() {
  return (
    <div>
      <Hero />
      {/*  */}
      {/* Pricing and certificates */}
      <div className='space-y-36'>
        <AboutUs />
        <Pricing />
      </div>
      {/* Parallax */}
      
      <div className='relative parallax'>
        {/* Oavrlay */}
        <div className='bg-base-300/70 absolute inset-0 w-full h-full'></div>
        
       
        <div className='relative z-10 max-w-sm py-20 ml-5 lg:ml-28'>
          <p className='text-xl'>
            Welcome to Emerald Holdings Limited
          </p>
          <p className='text-4xl font-bold mt-4 mb-6'>
            We are your trustworthy financial partner. We're trusted by over 49,666 successful investors from across the world. We want you to be on that list.
          </p>
          <p>
            You can trust us to help make your financial dream come true
          </p>
        </div>

      </div>

      {/* Parallax */}

      <ThreeSteps />
      <CTA />
      {/* <Footer /> */}
    </div>
  )
}
