import React from 'react'
import Hero from '../components/Hero'
import { ChartArea, Check } from 'lucide-react'
import { FinancialCommisionAndSecurities, Plans } from '../components/Pricing'
import PricingCrad from '../components/PricingCrad'
import ThreeSteps from '../components/ThreeSteps'
import AboutUs from '../components/AboutUs'
import CTA from '../components/CTA'
import Footer from '../components/Footer'
import theImage from "../assets/images (1).jpg"
import TradingViewTicker from '../components/tradingview/TradingViewTickerTape'

export default function Home() {
  return (
    <div>
      <Hero />
      <TradingViewTicker />
      <AboutUs />
      <FinancialCommisionAndSecurities />
      <Plans />


      {/* Parallax */}

      <div className="relative parallax w-full overflow-hidden">
        {/* Overlay */}
        <div className="bg-base-300/70 absolute inset-0 w-full h-full"></div>

        {/* Content Container */}
        <div className="relative z-10 px-6 py-12 md:py-20 md:left-20 lg:left-40 max-w-sm md:max-w-md lg:max-w-lg">
          <p className="text-lg md:text-xl">
            Welcome to Emerald Holdings Limited
          </p>

          <p className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6 leading-tight md:leading-14">
            You can trust us to help make your financial dream come true
          </p>

          <p className="text-sm md:text-base opacity-90">
            We are your trustworthy financial partner. We're trusted by over 49,666 successful investors from across the world. We want you to be on that list.
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
