import React from 'react'
import FirstChoice from '../../components/FirstChoice'
import { Menu } from 'lucide-react'
import image from "../../assets/6.jpg"
import Banner from '../../components/ui/Banner'

export default function FinancialPlanning() {
    return (
        <div>
            <Banner title="Our Services" desc="Financial Planning" />
            <div className='pt-20'>
                {/* Title */}
                <div className='flex flex-col justify-center items-center mb-10'>
                    <p className='text-3xl font-bold'>Financial Planning</p>
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
                                <p className='text-lg sm:text-2xl font-semibold mb-3'>Financial Planning</p>
                                <p>
                                    A financial plan is a comprehensive evaluation of an investor’s current and future financial state by using currently known variables to predict future cash flows, asset values and withdrawal plans. Most individuals work in conjunction with their preferred financial planner and use current net worth, tax liabilities, asset allocation, and future retirement and estate plans in developing financial plans. These metrics are used along with estimates of asset growth to determine if a person’s financial goals can be met in the future, or what steps need to be taken to ensure that they are.
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
