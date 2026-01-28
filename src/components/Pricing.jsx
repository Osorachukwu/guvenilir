import React from 'react'
import PricingCrad from './PricingCrad'
import { ChartArea, Check } from 'lucide-react'
import tfc from "../assets/tfc-icon.png"
import secLogo from "../assets/sec-logo.png"



export default function Pricing() {
    return (
        <div className='space-y-32'>
            <div className=''>
                <div className='mb-16'>
                    <img src={tfc} alt="" className='mb-8' />
                    <p className='leading-8'>
                        Emerald Holdings Limited is a member of The Financial Commission, an international organization engaged in the resolution of disputes within the financial services industry in the Forex market.
                    </p>
                </div>
                <div>
                    <img src={secLogo} alt="" className='mb-8' />
                    <p className='leading-8'>
                        Emerald Holdings Limited is regulated by the US Securities and Exchange Commission. The mission of the SEC is to protect investors; maintain fair, orderly, and efficient markets; and facilitate capital formation. Emerald Holdings Limited is an investment company that . Direct access to over 50 financial markets through one account. Any information contained on this website is provided to you for informational purposes only and should not be regarded as an offer or solicitation of an offer to buy or sell any investments or related services that may be referenced here. Investing in certain instruments, including stocks, options, futures, foreign currencies, and bonds involve a high level of risk. Trading on margin comes with substantial risk as well. You must be aware of these risks before opening an account to trade. The income you may get from online investing may go down as well as up. Emerald Holdings Limited is a registered investment dealer, a member of the United States Securities and Exchange Commission (SEC), the Investment Industry Regulatory Organization of Canada (IIROC) and a member of the Canadian Investor Protection Fund (CIPF), the benefits of which are limited to the activities undertaken by Emerald Holdings Limited.
                    </p>
                </div>
            </div>
            {/* <p>Investment Plans</p> */}
            <div className='text-center max-w-2xl mb-8 mx-auto'>
                <p className='text-4xl mb-2'>Consistent Returns | 3 Offerings</p>
                <p>Offering financial planning and wealth management services to help our clients manage their finances and achieve their long-term financial goals.</p>
            </div>
            <div className='grid grid-cols-3 justify-center gap-6 py-4'>
                {[
                    { title: "Amature", gain: "2.8", duration: "Daily for 5 Days", minInvestment: "100", maxInvestment: "10,000" },
                    { title: "Standard", gain: "3.8", duration: "Daily for 10 Days", minInvestment: "10,001", maxInvestment: " $30,000" },
                    { title: "Premuin", gain: "5", duration: "Daily for 15 Days", minInvestment: " $30,001", maxInvestment: "Unlimited" }
                ].map((investment, i) => (
                    <PricingCrad
                        key={i}
                        title={investment.title}
                        gain={investment.gain}
                        duration={investment.duration}
                        minInvestment={investment.minInvestment}
                        maxInvestment={investment.maxInvestment} />
                ))}
            </div>
        </div>
    )
}
