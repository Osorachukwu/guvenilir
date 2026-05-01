import React from 'react'

export default function YourDeposit() {
    const plans = [
        { id: 'A', label: 'Plan A', range: '$30 - $499', profit: '15.00%' },
        { id: 'B', label: 'Plan B', range: '$500 - $999', profit: '50.00%' },
        { id: 'C', label: 'Plan C', range: '$1,000 - $4,999', profit: '50.00%' },
        { id: 'D', label: 'Plan D', range: '$5,000 - $19,000', profit: '75.00%' },
        { id: 'E', label: 'Plan E', range: '$20,000 - Unlimited', profit: '100.00%' }
    ];

    return (
        <div>
            <div className='space-y-4 sm:space-y-6'>
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className='p-3 sm:p-4 bg-base-300 shadow-lg rounded-lg hover:shadow-xl transition-shadow'
                    >
                        {/* Plan Title */}
                        <div className='flex items-center gap-2 mb-3 px-2 sm:px-4'>
                            <label className='font-medium text-sm sm:text-base'>
                                {plan.label}
                            </label>
                        </div>

                        {/* Desktop Table Header */}
                        <div className='hidden sm:flex gap-1 py-2 px-2 bg-base-200 rounded-t-lg'>
                            <p className='w-1/2 pl-3 py-2 font-semibold'>Plan</p>
                            <p className='w-1/4 pl-3 py-2 font-semibold'>Spent Amount ($)</p>
                            <p className='w-1/4 pl-3 py-2 font-semibold'>Profit (%)</p>
                        </div>

                        {/* Mobile Table Header */}
                        <div className='sm:hidden grid grid-cols-3 gap-1 py-2 px-2 bg-base-200 rounded-t-lg text-center text-xs font-semibold'>
                            <p>Plan</p>
                            <p>Amount ($)</p>
                            <p>Profit (%)</p>
                        </div>

                        {/* Plan Details */}
                        <div className='grid grid-cols-3 sm:flex gap-1 py-2 px-2 bg-base-100 rounded-b-lg'>
                            <div className='col-span-1 sm:w-1/2 px-2 sm:px-3 py-2 text-xs sm:text-sm break-words'>
                                {plan.label}
                            </div>
                            <div className='col-span-1 sm:w-1/4 px-2 sm:px-3 py-2 text-xs sm:text-sm text-center sm:text-left'>
                                {plan.range}
                            </div>
                            <div className='col-span-1 sm:w-1/4 px-2 sm:px-3 py-2 text-xs sm:text-sm text-center sm:text-left font-semibold text-success'>
                                {plan.profit}
                            </div>
                        </div>

                        {/* No Deposit Message */}
                        <div className='mt-3 sm:mt-4 ml-2 sm:ml-5'>
                            <p className='text-sm sm:text-base font-bold text-warning bg-warning/10 p-2 rounded-lg inline-block w-full sm:w-auto'>
                                ⚠️ No deposit for this plan
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}