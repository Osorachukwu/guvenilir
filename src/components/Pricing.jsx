import React, { useEffect, useState } from 'react'
import PricingCrad from './PricingCrad'
import { ChartArea, Check } from 'lucide-react'
import tfc from "../assets/tfc-icon.png"
import secLogo from "../assets/sec-logo.png"
import { Database, Server } from 'lucide-react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BASE_URL, DOMAIN_KEY } from '../utils/constants'



export function FinancialCommisionAndSecurities() {
    return (
        <div className='bg-base-300 py-16 md:py-20'>
            <div className='text-sm sm:text-base section-wrapper'>
                <div className='mb-16' data-aos="fade-right">
                    <img src={tfc} alt="" className='mb-8' />
                    <p className='leading-8'>
                        Glassdoor Holdingsings Limited is a member of The Financial Commission, an international organization engaged in the resolution of disputes within the financial services industry in the Forex market.
                    </p>
                </div>
                <div data-aos="fade-left">
                    <img src={secLogo} alt="" className='mb-8' />
                    <p className='leading-8'>
                        Glassdoor Holdingsings Limited is regulated by the US Securities and Exchange Commission. The mission of the SEC is to protect investors; maintain fair, orderly, and efficient markets; and facilitate capital formation. Glassdoor Holdingsings Limited is an investment company that . Direct access to over 50 financial markets through one account. Any information contained on this website is provided to you for informational purposes only and should not be regarded as an offer or solicitation of an offer to buy or sell any investments or related services that may be referenced here. Investing in certain instruments, including stocks, options, futures, foreign currencies, and bonds involve a high level of risk. Trading on margin comes with substantial risk as well. You must be aware of these risks before opening an account to trade. The income you may get from online investing may go down as well as up. Glassdoor Holdingsings Limited is a registered investment dealer, a member of the United States Securities and Exchange Commission (SEC), the Investment Industry Regulatory Organization of Canada (IIROC) and a member of the Canadian Investor Protection Fund (CIPF), the benefits of which are limited to the activities undertaken by Glassdoor Holdingsings Limited.
                    </p>
                </div>
            </div>
        </div>
    )

}

export function Plans() {
    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPlans()
    }, [])

    const fetchPlans = async () => {
        try {
            setLoading(true)
            const response = await axios.post(`${BASE_URL}/getplan.php`, {
                domainKey: DOMAIN_KEY
            })
            console.log("Plans data:", response.data)
            
            // Handle both array and single object responses
            if (Array.isArray(response.data)) {
                setPlans(response.data)
            } else if (response.data && typeof response.data === 'object') {
                // If single plan returned, wrap in array
                setPlans([response.data])
            } else {
                setPlans([])
            }
        } catch (err) {
            console.error("Error fetching plans:", err)
            setPlans([])
        } finally {
            setLoading(false)
        }
    }

    // Helper to format maturity/duration text
    const formatDuration = (maturity) => {
        const hours = parseInt(maturity)
        if (!hours) return `${maturity} Hours`
        if (hours < 24) return `After ${hours} Hours`
        const days = Math.floor(hours / 24)
        const remainingHours = hours % 24
        if (remainingHours === 0) {
            return days === 1 ? `${days} Day` : `${days} Days`
        }
        return `${days} Day${days > 1 ? 's' : ''} ${remainingHours} Hour${remainingHours > 1 ? 's' : ''}`
    }

    // Format currency with commas
    const formatCurrency = (val) => {
        const num = parseInt(val)
        if (isNaN(num)) return val
        return num.toLocaleString()
    }

    // Loading skeleton
    if (loading) {
        return (
            <div className='section-wrapper py-16 md:py-20'>
                <div className='text-center max-w-2xl mb-8 mx-auto' data-aos="fade-up">
                    <div className="skeleton h-12 w-96 mx-auto mb-4 bg-base-300/50"></div>
                    <div className="skeleton h-20 w-full max-w-2xl mx-auto bg-base-300/50"></div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center gap-2 md:gap-6 py-4'>
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className='animate-pulse'>
                            <div className='bg-base-300 rounded-xl p-6'>
                                <div className="skeleton h-8 w-3/4 mb-4 bg-base-200/50"></div>
                                <div className="space-y-3 mb-6">
                                    <div className="skeleton h-6 w-full bg-base-200/50"></div>
                                    <div className="skeleton h-6 w-full bg-base-200/50"></div>
                                    <div className="skeleton h-6 w-full bg-base-200/50"></div>
                                    <div className="skeleton h-6 w-full bg-base-200/50"></div>
                                </div>
                                <div className="skeleton h-10 w-32 bg-base-200/50"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div>
            {/* <p>Investment Plans</p> */}
            <div className='section-wrapper py-16 md:py-20 font-'>
                <div className='text-center max-w-2xl mb-8 mx-auto' data-aos="fade-up">
                    <p className='text-2xl sm:text-4xl mb-2'>Consistent Returns | {plans.length} Offering{plans.length !== 1 ? 's' : ''}</p>
                    <p>Offering financial planning and wealth management services to help our clients manage their finances and achieve their long-term financial goals.</p>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center gap-2 md:gap-6 py-4'>
                    {plans.length > 0 ? (
                        plans.map((plan, index) => (
                            <div key={plan.id || index} data-aos="zoom-in" data-aos-delay={index * 100}>
                                <PricingCrad
                                    title={`Plan ${plan.plan}`}
                                    planName={plan.planName}
                                    gain={plan.dailyProfit}
                                    duration={formatDuration(plan.maturity)}
                                    minInvestment={formatCurrency(plan.minVal)}
                                    maxInvestment={plan.maxVal === 19900 || parseInt(plan.maxVal) >= 19900 ? 'Unlimited' : `$${formatCurrency(plan.maxVal)}`}
                                    referralBonus={plan.referralBonus}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-base-content/50">
                            <p className="text-lg font-medium">No investment plans available</p>
                            <p className="text-sm">Please check back later</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// Note: You'll need to update your PricingCrad component to accept and display the referralBonus prop
// If you don't want to change PricingCrad, you can remove referralBonus from the props above
