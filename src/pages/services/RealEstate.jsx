import React from 'react'
import FirstChoice from '../../components/FirstChoice'
import image from "../../assets/5.jpg"
import { Menu } from 'lucide-react'
import Banner from '../../components/ui/Banner'

export default function RealEstate() {
    return (
        <div>
            <Banner title="Our Services" desc="Real Estate Investment" />
            <div className='pt-20'>
                {/* Title */}
                <div className='flex flex-col justify-center items-center mb-10'>
                    <p className='text-3xl font-bold '>Real Estate</p>
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
                                    Trading Forex on CompanyName
                                </p>
                                <p>
                                    Real estate investment involves the purchase, ownership, management, rental and/or sale of real estate for profit. Improvement of realty property as part of a real estate investment strategy is generally considered to be a sub-specialty of real estate investing called real estate development. Real estate is an asset form with limited liquidity relative to other investments (such as stocks or bonds that openly trade on financial markets). It is also capital intensive (although capital may be gained through mortgage leverage) and is highly cash flow dependent. If these factors are not well understood and managed by the investor, real estate becomes a risky investment.

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
