import { ChartArea, HandshakeIcon } from 'lucide-react'
import React from 'react'
import imgIOne from "../assets/images (1).jpg"
import AboutSection from './AboutSection'

export default function AboutUs() {
    return (
        <div className='relative'>
            
            {/* max-h-[165vh] */}
            {/* Video Background md:min-h-[90vh] */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="/vid-2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            {/* Oavrlay */}
            <div className='bg-base-300/50 backdrop-blur-xs absolute inset-0 w-full h-full'></div>

            <div className='section-wrapper relative z-50 py-16 md:py-20'>
                <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                    <div className='group flex-1 px-8 py-8 border border-primary/40 hover:bg-primary transition-all duration-300 shadow-md' data-aos="fade-up">
                        <p className='text-lg'>Emeral Holdings Limited</p>
                        <p className='text-4xl font-semibold my-6'>We are the best in Finance</p>
                        <p>
                            We are everything a traditional financial institution is not. We set out to give investors better, simpler and more profitable ways to become financially successful and secure.
                        </p>
                        <button className='btn btn-primary btn-lg text-base rounded-full my-4 group-hover:btn-neutral transition-colors'>Read More</button>
                    </div>

                    {/*  */}
                    <div className='bg-primary/60 px-8 py-12 flex-1 text-center flex flex-col justify-center items-center hover:bg-transparent hover:border border-primary shadow' data-aos="fade-up" data-aos-delay="100">
                        <ChartArea size={60} />
                        <p className='text-4xl font-semibold my-6'>Trade An Asset</p>
                        <p className='text-lg font-semibold'>We offer various assets ranging from cryptocurrencies, to forex, commodities, indexes, stocks, ETFs, and the all new Pre-IPOs.</p>
                    </div>
                    <div className='bg-primary/80 px-8 py-12 flex-1 text-center flex flex-col justify-center items-center hover:bg-transparent hover:border border-primary shadow' data-aos="fade-up" data-aos-delay="200">
                        <ChartArea size={60} />
                        <p className='text-4xl font-semibold my-6'>Build A Portfolio</p>
                        <p className='text-lg font-semibold'>We also offer portfolios which allow you to invest in more than one asset class at a time. Portfolios are a great options if you want more.</p>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className='bg-base-300/70 relative'>
                <AboutSection />
            </div>

            
        </div>
    )
}
