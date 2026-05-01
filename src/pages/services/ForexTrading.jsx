import React from 'react'
import { Menu } from 'lucide-react'
import image from "../../assets/8.jpg"
import FirstChoice from '../../components/FirstChoice'
import Banner from '../../components/ui/Banner'

export default function ForexTrading() {
    return (
        <div>
            <Banner title="Our Services" desc="Forex Trading" />
            <div className='pt-20'>
                {/* Title */}
                <div className='flex flex-col justify-center items-center mb-10'>
                    <p className='text-3xl font-bold'>Forex Trading</p>
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
                                <p className='text-lg sm:text-2xl font-semibold mb-3'>Trading Forex on CompanyName </p>
                                <p>Forex is a portmanteau of foreign currency and exchange. Foreign exchange is the process of changing one currency into another currency for a variety of reasons, usually for commerce, trading, or tourism. According to a recent triennial report from the Bank for International Settlements (a global bank for national central banks), the average was more than $5.1 trillion in daily forex trading volume. Because of the worldwide reach of trade, commerce, and finance, forex markets tend to be the largest and most liquid asset markets in the world. Market participants use forex to hedge against international currency and interest rate risk, to speculate on geopolitical events, and to diversify portfolios, among several other reasons.</p>
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
