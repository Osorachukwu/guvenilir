import { ChartArea, HandshakeIcon } from 'lucide-react'
import React from 'react'
import imgIOne from "../assets/images (1).jpg"

export default function AboutUs() {
    return (
        <div className='bg-base-100 space-y-28'>
            <div className='flex gap-8'>
                <div className='group flex-1 px-8 py-8 border border-primary hover:bg-primary transition-all duration-300 shadow-md'>
                    <p className='text-lg'>Emeral Holdings Limited</p>
                    <p className='text-4xl font-semibold my-6'>We are the best in Finance</p>
                    <p>
                        We are everything a traditional financial institution is not. We set out to give investors better, simpler and more profitable ways to become financially successful and secure.
                    </p>
                    <button className='btn btn-primary btn-lg text-base rounded-full my-4 group-hover:btn-neutral transition-colors'>Read More</button>
                </div>

                {/*  */}
                <div className='bg-primary px-8 py-16 flex-1 text-center flex flex-col justify-center items-center hover:bg-transparent hover:border border-primary shadow'>
                    <ChartArea size={60} />
                    <p className='text-4xl font-semibold my-6'>Trade An Asset</p>
                    <p className='text-lg'>We offer various assets ranging from cryptocurrencies, to forex, commodities, indexes, stocks, ETFs, and the all new Pre-IPOs.</p>
                </div>
                <div className='bg-primary px-8 py-16 flex-1 text-center flex flex-col justify-center items-center hover:bg-transparent hover:border border-primary shadow'>
                    <ChartArea size={60} />
                    <p className='text-4xl font-semibold my-6'>Trade An Asset</p>
                    <p className='text-lg'>We offer various assets ranging from cryptocurrencies, to forex, commodities, indexes, stocks, ETFs, and the all new Pre-IPOs.</p>
                </div>
                {/*  */}
            </div>
            {/* About Us proper */}
            <div className='flex'>
                <div className='w-1/2 space-y-8'>
                    <div>
                        <p>About US</p>
                        <p className='text-4xl font-semibold'>We have been known to give investors the better choice.</p>
                        <p>
                            With over 153,000 investments under our management, $5 billion+ in assets under our administration, over 11 industry awards, we have made Emerald Holdings Limited the safe haven for investors who want to trust their financial partner to be capable of helping them reach their financial goals, and in due time, without the fear of disappointments.
                        </p>
                    </div>
                    <div className='space-y-8'>
                        <div className='flex items-center gap-4'>
                            <div>
                                <HandshakeIcon size={50} />
                            </div>
                            <div>
                                <p className='font-bold'>44,666+</p>
                                <p className='text-sm'>Investors</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-4'>
                            <div>
                                <HandshakeIcon size={50} />
                            </div>
                            <div>
                                <p className='font-bold'>44,666+</p>
                                <p className='text-sm'>Investors</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-4'>
                            <div>
                                <HandshakeIcon size={50} />
                            </div>
                            <div>
                                <p className='font-bold'>44,666+</p>
                                <p className='text-sm'>Investors</p>
                            </div>
                        </div>
                        <button className='btn btn-primary btn-lg text-base rounded-full'>Read More</button>
                    </div>


                </div>
                {/* Second col */}
                <div className='w-1/2 px-6'>
                    <div className='relative h-full w-full'>
                        <img src={imgIOne} alt="" className='absolute top-1/15 left-1/70' width={400} />
                        <img src={imgIOne} alt="" className='absolute bottom-1/15 right-1/70' width={400} />
                    </div>
                </div>

            </div>
        </div>
    )
}
