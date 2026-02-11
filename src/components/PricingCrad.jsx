import { Check, CheckCircle, CheckCircle2 } from 'lucide-react'
import React from 'react'
import { useAuth } from '../hooks/useAuth';

function PricingCrad({ title, gain, duration, minInvestment, maxInvestment }) {
    const { token } = useAuth();
    return (
        <div className="w-full group overflow-hidden rounded-lg shadow hover:scale-y-105 transition-all ease-in-out duration-200">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white">
                <h3 className="text-xl font-bold">{title}</h3>
                <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold">{gain}</span>
                    <span className="ml-1">/ {duration}</span>
                </div>
            </div>
            <div className="bg-white p-6">
                {/* <p className="mb-6 text-gray-600">Everything you need for advanced projects and teams.</p> */}
                <ul className="mb-6 space-y-4 divide-y divide-gray-300 text-gray-500">
                    <li className="flex items-center gap-4 pb-3">
                        <CheckCircle size={16} className='stroke-indigo-600' />
                        <span className='font-bold'>MIN: ${minInvestment}</span>
                    </li>
                    <li className="flex items-center gap-4 pb-3">
                        <CheckCircle size={16} />
                        <span className='font-bold'>MAX: ${maxInvestment}</span>
                    </li>
                    <li className="flex items-center gap-4 pb-3">
                        <CheckCircle size={16} />
                        <span className='font-bold'>Instant Withdrawal</span>
                    </li>
                    <li className="flex items-center gap-4 pb-3">
                        <CheckCircle size={16} />
                        <span className='font-bold'>5% Referral Bonus</span>
                    </li>

                </ul>
                <button
                    className="
                btn 
                text-base 
                bg-gradient-to-r 
                from-purple-500 
                to-indigo-600 
                hover:opacity-90
                group-hover:scale-x-108 
                transition-all 
                ease-in-out 
                duration-200 
                border-none 
                rounded-3xl 
                text-white"
                >
                    {/* btn-block */}
                    {token ? "Invest" : "Sign Up"}
                </button>
            </div>
        </div>
    )
}

export default PricingCrad


//  <div className=" overflow-hidden rounded-lg shadow">
//             <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white">
//                 <h3 class="text-xl font-bold">Premium</h3>
//                 <div class="mt-4 flex items-baseline">
//                     <span class="text-4xl font-bold">$49</span>
//                     <span class="ml-1">/month</span>
//                 </div>
//             </div>
//             <div class="bg-white p-6">
//                 <p class="mb-6 text-gray-600">Everything you need for advanced projects and teams.</p>
//                 <ul class="mb-6 space-y-1 text-sm text-gray-500">
//                     <li class="flex items-start">
//                         <svg class="mt-0.5 mr-2 h-5 w-5 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
//                         </svg>
//                         <span>Unlimited everything</span>
//                     </li>
//                     <li class="flex items-start">
//                         <svg class="mt-0.5 mr-2 h-5 w-5 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
//                         </svg>
//                         <span>24/7 support</span>
//                     </li>
//                     <li class="flex items-start">
//                         <svg class="mt-0.5 mr-2 h-5 w-5 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
//                         </svg>
//                         <span>Advanced analytics</span>
//                     </li>
//                     <li class="flex items-start">
//                         <svg class="mt-0.5 mr-2 h-5 w-5 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
//                         </svg>
//                         <span>Custom integrations</span>
//                     </li>
//                     <li class="flex items-start">
//                         <svg class="mt-0.5 mr-2 h-5 w-5 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
//                         </svg>
//                         <span>Service level agreement</span>
//                     </li>
//                     <li class="flex items-start">
//                         <svg class="mt-0.5 mr-2 h-5 w-5 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
//                         </svg>
//                         <span>Dedicated account manager</span>
//                     </li>
//                 </ul>
//                 <button class="w-full rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-2 text-sm text-white transition-opacity hover:opacity-90">Get Premium</button>
//             </div>
//         </div>