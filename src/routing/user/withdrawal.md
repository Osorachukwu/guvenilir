import React from 'react'

export default function Withdraw() {
    const currencies = [
        { name: 'Bitcoin', available: '$0.00', pending: '$0.00', account: 'Not set' },
        { name: 'Ethereum', available: '$0.00', pending: '$0.00', account: 'Not set' },
        { name: 'USDT(TRC20)', available: '$0.00', pending: '$0.00', account: 'Not set' },
        { name: 'TRX', available: '$0.00', pending: '$0.00', account: 'Not set' }
    ];

    return (
        <div className='bg-base-100 text-base-content min-h-screen'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6'>
                <div className='p-3 sm:p-4 bg-base-300 shadow-lg rounded-lg'>
                    
                    {/* Account Balance */}
                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 px-2 sm:px-4 py-3 bg-base-200 rounded-lg'>
                        <p className='text-sm sm:text-base font-medium'>Account Balance</p>
                        <p className='text-lg sm:text-xl font-bold'>$0.00</p>
                    </div>

                    {/* Desktop Table Header */}
                    <div className='hidden md:flex gap-1 py-2 px-2 bg-base-200 rounded-t-lg'>
                        <p className='w-1/4 pl-3 py-2 font-semibold'>Currency</p>
                        <p className='w-1/4 pl-3 py-2 font-semibold text-green-600'>Available</p>
                        <p className='w-1/4 pl-3 py-2 font-semibold text-red-600'>Pending</p>
                        <p className='w-1/4 pl-3 py-2 font-semibold'>Account</p>
                    </div>

                    {/* Mobile Table Header - 4 column grid */}
                    <div className='md:hidden grid grid-cols-4 gap-1 py-2 px-2 bg-base-200 rounded-t-lg text-center text-xs font-semibold'>
                        <p className='col-span-1'>Curr</p>
                        <p className='col-span-1 text-green-600'>Avail</p>
                        <p className='col-span-1 text-red-600'>Pending</p>
                        <p className='col-span-1'>Account</p>
                    </div>

                    {/* Currency Rows */}
                    <div className='space-y-1'>
                        {currencies.map((currency, index) => (
                            <div key={index}>
                                {/* Desktop Row */}
                                <div className='hidden md:flex gap-1 py-2 px-2 bg-base-100 hover:bg-base-200 transition-colors rounded-lg'>
                                    <p className='w-1/4 pl-3 py-2 font-medium'>{currency.name}</p>
                                    <p className='w-1/4 pl-3 py-2 text-green-500 font-bold'>{currency.available}</p>
                                    <p className='w-1/4 pl-3 py-2 text-red-500 font-bold'>{currency.pending}</p>
                                    <p className='w-1/4 pl-3 py-2 italic text-gray-500'>{currency.account}</p>
                                </div>

                                {/* Mobile Row */}
                                <div className='md:hidden grid grid-cols-4 gap-1 py-3 px-2 bg-base-100 hover:bg-base-200 transition-colors rounded-lg text-center text-sm'>
                                    <p className='col-span-1 font-medium text-xs break-words'>{currency.name}</p>
                                    <p className='col-span-1 text-green-500 font-bold text-xs'>{currency.available}</p>
                                    <p className='col-span-1 text-red-500 font-bold text-xs'>{currency.pending}</p>
                                    <p className='col-span-1 italic text-gray-500 text-xs'>{currency.account}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No Funds Message */}
                    <div className='mt-4 sm:mt-6 px-2 sm:px-4'>
                        <p className='text-sm sm:text-base font-bold text-warning bg-warning/10 p-3 sm:p-4 rounded-lg text-center sm:text-left'>
                            ⚠️ You have no funds to withdraw
                        </p>
                    </div>

                    {/* Withdrawal Form Placeholder - You can add this later */}
                    <div className='mt-6 p-4 bg-base-200 rounded-lg'>
                        <p className='text-center text-gray-500 text-sm'>
                            Withdrawal form will appear here when funds are available
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}