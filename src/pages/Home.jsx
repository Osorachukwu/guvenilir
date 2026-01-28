import React from 'react'
import Hero from '../components/Hero'
import { ChartArea, Check } from 'lucide-react'
import Pricing from '../components/Pricing'
import PricingCrad from '../components/PricingCrad'
import ThreeSteps from '../components/ThreeSteps'
import AboutUs from '../components/AboutUs'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div>
      <Hero />
      {/*  */}
      {/* Pricing and certificates */}
      <div className='max-w-7xl mx-auto px-4 py-20 space-y-36'>
        <AboutUs />
        <Pricing />
      </div>
      <ThreeSteps />
      <CTA />
      <Footer />
    </div>
  )
}
