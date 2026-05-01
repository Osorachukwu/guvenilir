import React from 'react'
import FirstChoice from '../../components/FirstChoice'
import { Menu } from 'lucide-react'
import image from "../../assets/1.jpg"
import Banner from '../../components/ui/Banner'

export default function RetirmentPlanning() {
    return (
        <div>
            <Banner title="Our Services" desc="Retirment Planning" />
            <div className='pt-20'>
                {/* Title */}
                <div className='flex flex-col justify-center items-center mb-10'>
                    <p className='text-3xl font-bold '>Retirment Planning</p>
                    <div className='bg-primary h-1 w-48 mt-1'>
                    </div>
                </div>

                {/*  */}
                <div className='max-w-4xl mx-auto mb-10'>
                    <img src={image} alt="" />

                    <div className='px-2 sm:px-4'>
                        <div className='flex justify-center mt-10 '>
                            <div className='flex items-start gap-4 sm:gap-6'>
                                <div className='h-8 sm:h-14 w-8 sm:w-14 shrink-0 bg-primary rounded-xl sm:rounded-3xl flex justify-center items-center'>
                                    <Menu />
                                </div>
                                <div>
                                    <p className='text-lg sm:text-2xl font-semibold mb-3'>Workforce Optimization
                                    </p>
                                    <p>
                                        Saving for retirement can be a daunting task, but with a sound strategy, it’s well within reach. CompanyName is here to bring clarity to retirement planning and set you on your path to success. Here you’ll better understand your options and find the right investment.
                                        If you had the chance to double—or even quadruple—your retirement savings, you’d probably jump at that opportunity, right? Well, there’s one simple change you can make today that’s sure to boost your retirement savings.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-center mt-10'>
                            <div className='flex items-start gap-4 sm:gap-6'>
                                <div className='h-8 sm:h-14 w-8 sm:w-14 shrink-0 bg-primary rounded-xl sm:rounded-3xl flex justify-center items-center text-black'>
                                    <Menu />
                                </div>
                                <div>
                                    <p className='text-lg sm:text-2xl font-semibold mb-3'>
                                        Quadruple Your Retirement Savings? Really?
                                    </p>
                                    <p>
                                        CompanyName study of worldwide retirement saving habits discovered that people with some kind of retirement plan have more than three times as much in their nest egg than those with no plan at all. And savers who take it one step further by working with an investing advisor to put their plan to paper? Their average nest egg is a whopping 445% bigger than non-planners. That’s a big deal! Now, did you catch that? By working with an advisor and by having a plan in place, you can supercharge your retirement savings.
                                    </p>
                                </div>
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
