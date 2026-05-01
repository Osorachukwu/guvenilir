import React from 'react'
import FirstChoice from '../../components/FirstChoice'
import { Menu } from 'lucide-react'
import image from "../../assets/7.jpg"
import Banner from '../../components/ui/Banner'

export default function LoansAndGrants() {
    return (
        <div>
            <Banner title="Our Services" desc="Loans And Grants" />
            <div className='pt-20'>
                {/* Title */}
                <div className='flex flex-col justify-center items-center mb-10'>
                    <p className='text-3xl font-bold'>Loans And Grants</p>
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
                                    Easy with CompanyName
                                </p>
                                <p>
                                    Getting a loan doesn’t have to be intimidating, with the right lender it can be a simple process. You only need a lender committed to taking the mystery out of the mortgage loan process! At CompanyName, we understand! Our investors want simple facts, honest answers and competitive products. DGS automatically offers loan services to investors with over $50,000 investment either in our normal CompanyName financial Services packages or the NFP plans. Investors over $50,000 are entitled to loans of $200,000-1millon dollars yearly with 5% paid monthly, or the investor could wish to compound the interest till the time limit, provided all required information and identity of the investor are duly confirmed by CompanyName loan board. Every investor above $50,000 is provided with a personal account manager and the investor has a direct communication with the manager in order to see that our loan offers are secured. GREAT INVESTING WITH CompanyName FAMILY.
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
