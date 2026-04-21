import React from 'react'
import Banner from '../components/ui/Banner'
import AboutUs from '../components/AboutUs'
import Faqs from '../components/Faqs'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div>
      <Banner />
      <AboutUs />

      <div class="max-w-screen-xl max-lg:max-w-screen-sm mx-auto p-4">
        <div class="grid lg:grid-cols-2 gap-x-8 gap-y-16 items-center">
          <div class="max-lg:-order-1">
            <div class="w-full aspect-[4/3]">
              {/* <img src="https://readymadeui.com/images/about-us-img.svg" class="w-full h-full object-contain rounded-md" /> */}
              <img src="https://readymadeui.com/images/about-image-1.webp" class="w-full h-full object-contain rounded-md" />
            </div>
          </div>

          <div>
            <div class="max-lg:text-center">
              <h2 class="md:text-4xl text-3xl font-bold md:!leading-[45px] leading-[40px]">Why choose Us?</h2>
              <p class="text-[15px] mt-6 leading-relaxed">We are an international financial company engaged in investment activities, which are related to trading on financial markets and cryptocurrency exchanges, Oil & Gas investment, stock and gold. All performed by qualified professional traders.</p>
            </div>

            <hr class="my-10 border-gray-300" />

            <div class="grid sm:grid-cols-2 gap-x-6 gap-y-10 max-lg:text-center">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="fill-blue-700 w-7 h-7 mb-4 inline-block" viewBox="0 0 100 100">
                  <path d="M65.156 4.42c-8.327 0-15.13 6.855-15.13 15.202s6.803 15.165 15.13 15.165c7.017 0 12.924-4.863 14.626-11.382h13.843a3.798 3.798 0 0 0 3.791-3.805 3.798 3.798 0 0 0-3.79-3.8h-13.86C78.053 9.294 72.16 4.42 65.156 4.42zM6.391 15.8a3.798 3.798 0 0 0-3.79 3.805 3.798 3.798 0 0 0 3.79 3.8h36.397c-.21-1.234-.348-2.493-.348-3.783 0-1.304.134-2.575.348-3.821zm28.47 18.987c-7.018 0-12.92 4.89-14.619 11.418H6.392a3.783 3.783 0 0 0-.363 0 3.801 3.801 0 0 0-3.52 4.062 3.798 3.798 0 0 0 3.882 3.535H20.25c1.71 6.511 7.604 11.382 14.61 11.382 8.328 0 15.167-6.848 15.167-15.195 0-8.347-6.84-15.202-15.166-15.202zm22.383 11.418c.21 1.234.347 2.494.347 3.784 0 1.3-.134 2.57-.347 3.813h36.381a3.795 3.795 0 0 0 3.874-3.714 3.796 3.796 0 0 0-3.874-3.883H57.244zm7.912 18.979c-8.327 0-15.13 6.855-15.13 15.202S56.83 95.58 65.157 95.58c7.007 0 12.907-4.87 14.618-11.382h13.851a3.796 3.796 0 0 0 3.706-3.883 3.795 3.795 0 0 0-3.706-3.714H79.782c-1.701-6.527-7.608-11.418-14.626-11.418zM6.029 76.602a3.801 3.801 0 0 0-3.52 4.062 3.798 3.798 0 0 0 3.882 3.535h36.412a22.541 22.541 0 0 1-.348-3.813c0-1.29.138-2.55.348-3.784H6.39a3.783 3.783 0 0 0-.362 0z" data-original="#000000" />
                </svg>
                <h3 class="text-base font-semibold mb-3">Our Legality</h3>
                <p class="text-[15px] leading-relaxed">
                  Our company conducts absolutely legal activities in the legal field. We are certified to operate investment business, we are legal and safe.</p>
              </div>

              <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="text-blue-700 w-7 h-7 mb-4 inline-block" viewBox="0 0 682.667 682.667">
                  <defs>
                    <clipPath id="b" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000" />
                    </clipPath>
                  </defs>
                  <mask id="a">
                    <rect width="100%" height="100%" fill="#fff" data-original="#ffffff" />
                  </mask>
                  <g mask="url(#a)">
                    <g fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="30" clip-path="url(#b)" transform="matrix(1.33333 0 0 -1.33333 0 682.667)">
                      <path d="M458.172 372.633a533.882 533.882 0 0 0-.474 16.345c-.303 20.475-16.411 37.184-36.856 38.326-62.529 3.493-111.431 24.292-152.737 64.553-6.912 6.336-17.279 6.336-24.191 0-41.306-40.261-90.208-61.06-152.737-64.553-20.445-1.142-36.553-17.851-36.857-38.325a530.642 530.642 0 0 0-.473-16.346C51.549 251.97 48.104 86.598 248.803 16.615a22.014 22.014 0 0 1 2.942-.801l.01-.002a21.72 21.72 0 0 1 8.509 0c1.002.2 1.996.47 2.961.807C463.342 86.602 460.47 251.398 458.172 372.633Z" data-original="#000000" />
                      <path d="M368.408 256c0-62.082-50.327-112.409-112.408-112.409S143.592 193.918 143.592 256c0 62.082 50.327 112.409 112.408 112.409S368.408 318.082 368.408 256Z" data-original="#000000" />
                      <path stroke-linecap="round" d="m303.227 284.952-69.785-69.785M206.773 241.834l26.668-26.668" data-original="#000000" />
                    </g>
                  </g>
                </svg>
                <h3 class="text-base font-semibold mb-3">Our Reliability</h3>
                <p class="text-[15px] leading-relaxed">
                  We are trusted by a huge number of people. We are working hard constantly to improve the level of our security system and minimize possible risks..</p>
              </div>

            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className='grid grid-cols-1 md:grid-cols-3 max-w-7xl w-full mx-auto px-4 sm:px-0'>
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
            <div key={i} className={`h-96 ${i === 0 ? "bg-neutral/70" : i === 1 ? "bg-neutral/50" : "bg-neutral/20"} space-y-4 py-8 px-4 group w-full transition-all duration-200 ease-in-out`}>
              {/* {step.icon} */}
              <p className='text-3xl font-semibold'>{step.title}</p>
              <p>{step.desc}</p>
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
