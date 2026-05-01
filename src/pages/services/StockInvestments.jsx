import React from 'react'
import FirstChoice from '../../components/FirstChoice'
import { Check, Menu } from 'lucide-react'
import image from "../../assets/stock-2.png"
import Banner from '../../components/ui/Banner'

export default function StockInvestments() {
    return (
        <div>
            <Banner title="Our Services" desc="Stock Investments" />
            <div className='pt-20'>
                {/* Title */}
                <div className='flex flex-col justify-center items-center mb-10'>
                    <p className='text-3xl font-bold'>Stock Investments</p>
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
                                    Trading Stock or Share on CompanyName
                                </p>
                                <p>
                                    A stock or share (also known as a company's "equity") is a financial instrument that represents ownership in a company or corporation and represents a proportionate claim on its assets (what it owns) and earnings (what it generates in profits). Stock ownership implies that the shareholder owns a slice of the company equal to the number of shares held as a proportion of the company's total outstanding shares. For instance, an individual or entity that owns 100,000 shares of a company with one million outstanding shares would have a 10% ownership stake in it. Most companies have outstanding shares that run into the millions or billions.
                                </p>
                                <p className='text-lg sm:text-2xl font-semibold my-4'>
                                    How do I invest in stocks with 0% commission
                                </p>
                                <p>
                                    As you will surely notice, the online trading platforms that offer the opportunity to speculate on the oil price are numerous. It is therefore necessary that you take the time to carefully compare them in order to choose the one that offers you the most advantages. You therefore need to verify certain important points such as:
                                </p>

                                <ul className='mt-4'>
                                    <li className='flex items-center gap-2'>
                                        <div className='h-4 w-4 rounded-full bg-primary flex items-center justify-center'>
                                            <Check width={14} />
                                        </div>
                                        Create an account
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <div className='h-4 w-4 rounded-full bg-primary flex items-center justify-center'> <Check width={14} /></div>
                                        Choose a deposit plan
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <div className='h-4 w-4 rounded-full bg-primary flex items-center justify-center'> <Check width={14} /></div>
                                        Make deposit
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <div className='h-4 w-4 rounded-full bg-primary flex items-center justify-center'>
                                            <Check width={14} /></div>
                                        Get your ROI on plan completion
                                    </li>
                                </ul>
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
