import React from 'react'

export default function DepositHistory() {
    return (
        <div>
            <div>
                <div className='p-2 bg-base-300 shadow'>
                    <div className='flex items-center gap-2 mb-2 px-4'>
                        <input
                            className="radio radio-xs"
                            type="radio"
                            name="plan"
                            value="planA"
                            checked={formData.plan === 'planA'}
                            onChange={handleChange}
                        />
                        <label htmlFor="">Plan A</label>
                    </div>
                    <div className='flex gap-1 py-1 p-2 rounded-tl-2xl rounded-tr-2xl '>
                        <p className='w-3/2 pl-2 py-2 bg-base-200'>Plan A</p>
                        <p className='w-1/3 pl-2 py-2 bg-base-200'>Spent Amount ($)</p>
                        <p className='w-1/3 pl-2 py-2 bg-base-200'>Profit (%)</p>
                    </div>
                    <div className='flex gap-1 py-1 px-2'>
                        <div className='w-3/2  pl-2 py-2'>Plan</div>
                        <div className='w-1/3 pl-2 py-2 gap-2'>
                            {/* <p className='badge badge-primary'>500</p>
                                -
                                <p className='badge badge-primary'>500</p> */}
                            <span>500 - 600</span>
                        </div>
                        <div className='w-1/3 pl-2 py-2'>40.00%</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
