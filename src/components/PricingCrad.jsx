import { Check, CheckCircle } from 'lucide-react'
import React from 'react'

function PricingCrad({ title, gain, duration, minInvestment, maxInvestment }) {
    return (
        <div class="w-full overflow-hidden rounded-lg shadow">
            <div class="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white">
                <h3 class="text-xl font-bold">{title}</h3>
                <div class="mt-4 flex items-baseline">
                    <span class="text-4xl font-bold">{gain}</span>
                    <span class="ml-1">/ {duration}</span>
                </div>
            </div>
            <div class="bg-white p-6">
                {/* <p class="mb-6 text-gray-600">Everything you need for advanced projects and teams.</p> */}
                <ul class="mb-6 space-y-4 divide-y divide-gray-300 text-gray-500">
                    <li class="flex items-center gap-4 pb-3">
                        <CheckCircle size={16} />
                        <span className='font-bold'>MIN: ${minInvestment}</span>
                    </li>
                    <li class="flex items-center gap-4 pb-3">
                        <CheckCircle size={16} />
                        <span className='font-bold'>MAX: ${maxInvestment}</span>
                    </li>
                    <li class="flex items-center gap-4 pb-3">
                        <CheckCircle size={16} />
                        <span className='font-bold'>Instant Withdrawal</span>
                    </li>
                    <li class="flex items-center gap-4 pb-3">
                        <CheckCircle size={16} />
                        <span className='font-bold'>5% Referral Bonus</span>
                    </li>

                </ul>
                <button class="btn btn-lg text-base bg-gradient-to-r from-purple-500 to-indigo-600 transition-opacity hover:opacity-90 border-none rounded-full text-white">Sign Up</button>
            </div>
        </div>
    )
}

export default PricingCrad


//  <div class=" overflow-hidden rounded-lg shadow">
//             <div class="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white">
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