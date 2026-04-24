import React from 'react'
import Banner from '../components/ui/Banner'
import Faqs from '../components/Faqs'
import { Link } from 'react-router-dom'
import AboutSection from '../components/AboutSection'
import { Shield, ShieldCheck, UserCheck } from 'lucide-react'

export default function About() {
  return (
    <div>
      <Banner />
      <AboutSection />

      <div class="max-w-screen-xl max-lg:max-w-screen-sm mx-auto p-4">
        <div class="grid lg:grid-cols-2 gap-x-8 gap-y-16 items-center">
          <div class="max-lg:-order-1">
            <div class="w-full aspect-4/3">
              {/* <img src="https://readymadeui.com/images/about-us-img.svg" class="w-full h-full object-contain rounded-md" /> */}
              <img src="https://readymadeui.com/images/about-image-1.webp" class="w-full h-full object-contain rounded-md" />
            </div>
          </div>

          <div>
            <div class="max-lg:text-center">
              <h2 class="md:text-4xl text-3xl font-bold md:!leading-[45px] leading-[40px]">Why choose Us?</h2>
              <p class="text-[15px] mt-6 leading-relaxed text-base-content/70">We are an international financial company engaged in investment activities, which are related to trading on financial markets and cryptocurrency exchanges, Oil & Gas investment, stock and gold. All performed by qualified professional traders.</p>
            </div>

            <hr class="my-10 border-gray-600" />

            <div class="grid sm:grid-cols-2 gap-x-6 gap-y-10 max-lg:text-center">
              <div>
                <UserCheck size={40} className='text-primary' />

                <h3 class="text-base font-semibold my-3">Our Legality</h3>
                <p class="text-[15px] leading-relaxed text-base-content/70">
                  Our company conducts absolutely legal activities in the legal field. We are certified to operate investment business, we are legal and safe.</p>
              </div>

              <div>
                <ShieldCheck size={40} className='text-primary' />
                <h3 class="text-base font-semibold my-3">Our Reliability</h3>
                <p class="text-[15px] leading-relaxed text-base-content/70">
                  We are trusted by a huge number of people. We are working hard constantly to improve the level of our security system and minimize possible risks..</p>
              </div>

            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className='grid grid-cols-1 md:grid-cols-3  w-full mx-auto px-4 sm:px-0'>
        {[
          {
            title: "OUR MISSION",
            desc: "Empowering investors by providing them an avenue for controlling their financial future by providing outstanding service, innovation, and expertise in the custody of alternative and traditional assets. Emerald Holdings Limited is dedicated to helping investors around the world reach their desired investment goals and broaden their financial horizons. We provide investment products and solutions to our clients across the world. Our breadth of investment capabilities is extensive and among the most innovative within the market.",
            // icon: <Users2Icon size={50} />
          },
          {
            title: "Investor-first focus.",
            desc: "Our plan is to not only protect the value of your assets but to increase them with our trading desk. Involving professional traders that manage money in high risk markets. This is achieved by strict standards of risk management through technical and fundamental analysis. Our trading operations are online and around the clock to ensure immediate reaction to movements in the market.",
            // icon: <Upload size={50} />
          },
          {
            title: "Our Values",
            desc: "Our values are based on three tenets: reliability, security, and performance. With our deep understanding of technology, economics, and finance, and by applying knowledge and innovation, we have created one of the most sophisticated and technologically advanced trading platforms in the industry. Our vision extends also to be an innovative partner for investors to achieve their wealth goals.",
            // icon: <Wallet size={50} />
          }].map((step, i) => (
            <div key={i} className={`h-96 ${i === 0 ? "bg-neutral/70" : i === 1 ? "bg-neutral/50" : "bg-neutral/20"} space-y-4 py-8 md:py-12 px-4 md:px-10 group w-full transition-all duration-200 ease-in-out`}>
              {/* {step.icon} */}
              <p className='text-3xl font-semibold'>{step.title}</p>
              <p className='text-base-content/70'>{step.desc}</p>
            </div>
          ))}
      </div>
      {/*  */}
      <div className='h-[65vh] bg-red-300'>
        <div class="relative before:absolute before:w-full h-full before:h-full before:inset-0 before:bg-black before:opacity-50 before:z-10">
          <img src="https://readymadeui.com/cardImg.webp" alt="Banner Image" class="absolute inset-0 w-full h-full object-cover" />

          <div class="min-h-[350px] relative z-50 h-full max-w-4xl mx-auto flex flex-col justify-center items-center text-center p-6">
            <h2 class="md:text-4xl text-3xl font-semibold mb-6">Our Certificate</h2>
            <p class="md:text-lg text-base text-center">Legally Registered in New Zealand with company number NZ:6049008</p>

            <button className='btn btn-xl btn-outline mt-12 text-lg'>Register</button>
          </div>
        </div>
      </div>

      <Faqs />
    </div>
  )
}
