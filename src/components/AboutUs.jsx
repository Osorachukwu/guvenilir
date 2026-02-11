import { ChartArea, HandshakeIcon } from 'lucide-react'
import React from 'react'
import imgIOne from "../assets/images (1).jpg"

export default function AboutUs() {
    return (
        <div className='bg-base-100 space-y-28'>
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8'>
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
           

            <section>
                {/* 💥💥💥Hero */}
                <div className="relative min-h-screen w-full overflow-hidden xl:mb-36">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64">
                        <svg
                            viewBox="0 0 100 100"
                            className="w-full h-full opacity-30"
                        >
                            <path
                                d="M90,10 Q50,40 80,90 Q30,80 10,40 Q40,20 90,10"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="0.5"
                            />
                        </svg>
                    </div>
                    <div className="absolute bottom-0 left-0 w-64 h-64">
                        <svg
                            viewBox="0 0 100 100"
                            className="w-full h-full opacity-30"
                        >
                            <path
                                d="M10,90 Q50,60 20,10 Q70,20 90,60 Q60,80 10,90"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="0.5"
                            />
                        </svg>
                    </div>

                    {/* Main content */}
                    <main className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
                            <div className="flex flex-col justify-center space-y-8">
                                {/* Heading with blue background */}
                                <div className="relative">
                                    <div className="w-full md:w-[120%]">
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

                            </div>

                            {/* Images section */}
                            <div className="relative h-[520px] ">
                                {/* Top image */}
                                <div className="absolute right-0 top-0 w-[80%] h-[60%] overflow-hidden">
                                    <img
                                        src={imgIOne}
                                        alt="Nail manicure service"
                                        className="object-cover w-full h-96"
                                        priority
                                    />
                                </div>

                                {/* Bottom image */}
                                <div className="absolute left-0 bottom-0 w-[80%] h-[60%] overflow-hidden">
                                    <img
                                        src={imgIOne}
                                        alt="Pedicure service"
                                        className="object-cover w-full h-full"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                {/* 💥💥💥Hero */}
            </section>

        </div>
    )
}
