import React from 'react'
import ChartTransaction from '../../components/ChartTransaction'
import { Calendar, Clock } from 'lucide-react'
import Buttons from '../../components/Buttons'
import { CopyableText } from '../../components/ui/CopyableText'
import currentBalIcon from "../../assets/current_bal_icon.png"
import { Link } from 'react-router-dom'

export default function Dashboard() {
    return (
        <div>
            <div className='max-w-6xl mx-auto'>

                {/*  */}
                <div className='flex justify-between items-center p-4'>
                    {/* <div className='border bg-neutral'> */}
                    <CopyableText text="https://güvenilir-varlıklar .com/?ref=Joe" mainStyle="bg-base-300" />
                    {/* </div> */}
                    <div className='flex gap-6'>
                        <Link to="/account/deposit" className='btn btn-secondary'>Make Deposits</Link>
                        <Link to="/account/withdrawal" className='btn btn-secondary btn-outline'>Withdraw</Link>
                    </div>
                </div>
            </div>
            <div className='flex justify-between gap-8 mb-10'>
                <div className='flex gap-8 items-center bg-gray-600 w-3/2'>
                    <div className='bg-base-300 py-5 px-8'>
                        <img src={currentBalIcon} alt="" />
                    </div>
                    <div className='text-xl'>
                        <p className='font-semibold'>Current Balance</p>
                        <p className='font-normal'>0 usd</p>
                    </div>
                </div>
                <div className='w-2/3 flex flex-col justify-between py-2'>
                    <div className='flex items-center gap-4'>
                        <div className='bg-base-300 rounded-full p-2.5'>
                            <Calendar />
                        </div>
                        <p>Feb-12-2026</p>
                    </div>
                    <div className='flex items-center gap-4'>
                        <div className='bg-base-300 rounded-full p-2.5'>
                            <Clock />
                        </div>
                        <p>Last seen: Feb-16-2026 03:27:51 PM</p>
                    </div>
                </div>
            </div>

            <div className='mb-6'>
                <p className='text-lg font-bold mb-2'>Account Details</p>
                <div className='grid grid-cols-2 gap-5 md:grid-cols-4'>
                        <div className='card bg-base-300'>
                            <div className='card-body'>
                                <p className='font-bold text-lg'>Main Balance</p>
                                <p className='text-xl'>$0 <span className='text-xs'>USD</span></p>

                            </div>
                        </div>
                        <div className='card bg-base-300'>
                            <div className='card-body'>
                                <p className='font-bold text-lg'>Total Deposit</p>
                                <p className='text-xl'>$0 <span className='text-xs'>USD</span></p>

                            </div>
                        </div>
                        <div className='card bg-base-300'>
                            <div className='card-body'>
                                <p className='font-bold text-lg'>Active Deposit</p>
                                <p className='text-xl'>$0 <span className='text-xs'>USD</span></p>

                            </div>
                        </div>
                        <div className='card bg-base-300'>
                            <div className='card-body'>
                                <p className='font-bold text-lg'>Last Deposit</p>
                                <p className='text-xl'>$0 <span className='text-xs'>USD</span></p>

                            </div>
                        </div>
                        <div className='card bg-base-300'>
                            <div className='card-body'>
                                <p className='font-bold text-lg'>Earned Total</p>
                                <p className='text-xl'>$0 <span className='text-xs'>USD</span></p>

                            </div>
                        </div>
                        <div className='card bg-base-300'>
                            <div className='card-body'>
                                <p className='font-bold text-lg'>Pending Withdrawal</p>
                                <p className='text-xl'>$0 <span className='text-xs'>USD</span></p>

                            </div>
                        </div>
                        <div className='card bg-base-300'>
                            <div className='card-body'>
                                <p className='font-bold text-lg'>Withdrawal Total</p>
                                <p className='text-xl'>$0 <span className='text-xs'>USD</span></p>

                            </div>
                        </div>
                        <div className='card bg-base-300'>
                            <div className='card-body'>
                                <p className='font-bold text-lg'>Last Withdrawal</p>
                                <p className='text-xl'>$0 <span className='text-xs'>USD</span></p>

                            </div>
                        </div>
                </div>
            </div>
            {/*  */}
            <div>
                <p>Account Stats</p>
                <div className='flex flex-col md:flex-row gap-6'>
                    <div className='w-1/2 space-y-3'>
                        <div className='card bg-base-300'>
                            <div className='card-body'>
                                <p className='font-bold bg-base-300 text-md'>Investments</p>
                                <div className='flex justify-between'>
                                    <div className=' w-full border-gray-600 border-r border-t px-4 py-6'>
                                        <p>0.00</p>
                                    </div>
                                    <div className=' w-full border-gray-600 border-t px-4 py-6'>
                                        <p>0.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='card bg-base-300'>
                            <div className='card-body'>
                                <p className='font-bold bg-base-300 text-md'>Withdrawals</p>
                                <div className='flex justify-between'>
                                    <div className='flex justify-center w-full items-center border-gray-600 border-r border-t px-5 py-10'>
                                        <p>0.00</p>
                                    </div>
                                    <div className='flex justify-center w-full items-center border-gray-600 border-t px-5 py-10'>
                                        <p>0.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-1/2'>
                        <ChartTransaction />
                    </div>
                </div>
            </div>
            {/*  */}
        </div>
    )
}
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Deposit() {
    const [formData, setFormData] = useState({
        plan: 'Plan A',
        spendFrom: 'bitcoin',
        amountToSpend: "25.00"
    });
    console.log(formData.plan)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // VERY IMPORTANT

        navigate("/account/confirm-deposit", {
            state: {
                plan: formData.plan,
                spendFrom: formData.spendFrom,
                amountToSpend: formData.amountToSpend
            }
        });
    };
    return (
        <div className='bg-base-100 text-base-content'>
            <div className='max-w-7xl mx-auto p-4'>
                {/* <p>{formData.plan} {formData.spendFrom} {formData.amountToSpend}</p> */}
                <form action="" className='text-md space-y-6' onSubmit={handleSubmit}>
                    <div className='p-2 bg-base-300 shadow'>
                        <div className='flex items-center gap-2 mb-2 px-4'>
                            <input
                                className="radio radio-xs"
                                type="radio"
                                name="plan"
                                value="Plan A"
                                checked={formData.plan === 'plan A'}
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
                                <span>$30 - $499</span>
                            </div>
                            <div className='w-1/3 pl-2 py-2'>15.00%</div>
                        </div>
                    </div>
                    {/*  */}
                    <div className='p-2 bg-base-300 shadow'>
                        <div className='flex items-center gap-2 mb-2 px-4'>
                            <input
                                className="radio radio-xs"
                                type="radio"
                                name="plan"
                                value="Plan B"
                                checked={formData.plan === 'Plan B'}
                                onChange={handleChange}
                            />
                            <label htmlFor="">Plan B</label>
                        </div>
                        <div className='flex gap-1 py-1 p-2 rounded-tl-2xl rounded-tr-2xl '>
                            <p className='w-3/2 pl-2 py-2 bg-base-200'>Plan B</p>
                            <p className='w-1/3 pl-2 py-2 bg-base-200'>Spent Amount ($)</p>
                            <p className='w-1/3 pl-2 py-2 bg-base-200'>Profit (%)</p>
                        </div>
                        <div className='flex gap-1 py-1 px-2'>
                            <div className='w-3/2  pl-2 py-2'>Plan</div>
                            <div className='w-1/3 pl-2 py-2 gap-2'>
                                {/* <p className='badge badge-primary'>500</p>
                                -
                                <p className='badge badge-primary'>500</p> */}
                                <span>$500 - $999</span>
                            </div>
                            <div className='w-1/3 pl-2 py-2'>50.00%</div>
                        </div>
                    </div>
                    {/*  */}
                    <div className='p-2 bg-base-300 shadow'>
                        <div className='flex items-center gap-2 mb-2 px-4'>
                            <input
                                className="radio radio-xs"
                                type="radio"
                                name="plan"
                                value="Plan C"
                                checked={formData.plan === "Plan C"}
                                onChange={handleChange}
                            />
                            <label htmlFor="">Plan C</label>
                        </div>
                        <div className='flex gap-1 py-1 p-2 rounded-tl-2xl rounded-tr-2xl '>
                            <p className='w-3/2 pl-2 py-2 bg-base-200'>Plan C</p>
                            <p className='w-1/3 pl-2 py-2 bg-base-200'>Spent Amount ($)</p>
                            <p className='w-1/3 pl-2 py-2 bg-base-200'>Profit (%)</p>
                        </div>
                        <div className='flex gap-1 py-1 px-2'>
                            <div className='w-3/2  pl-2 py-2'>Plan</div>
                            <div className='w-1/3 pl-2 py-2 gap-2'>
                                {/* <p className='badge badge-primary'>500</p>
                                -
                                <p className='badge badge-primary'>500</p> */}
                                <span>$1,000 - $4,999</span>
                            </div>
                            <div className='w-1/3 pl-2 py-2'>50.00%</div>
                        </div>
                    </div>
                    {/*  */}
                    <div className='p-2 bg-base-300 shadow'>
                        <div className='flex items-center gap-2 mb-2 px-4'>
                            <input
                                className="radio radio-xs"
                                type="radio"
                                name="plan"
                                value="Plan D"
                                checked={formData.plan === "Plan D"}
                                onChange={handleChange}
                            />
                            <label htmlFor="">Plan D</label>
                        </div>
                        <div className='flex gap-1 py-1 p-2 rounded-tl-2xl rounded-tr-2xl '>
                            <p className='w-3/2 pl-2 py-2 bg-base-200'>Plan D</p>
                            <p className='w-1/3 pl-2 py-2 bg-base-200'>Spent Amount ($)</p>
                            <p className='w-1/3 pl-2 py-2 bg-base-200'>Profit (%)</p>
                        </div>
                        <div className='flex gap-1 py-1 px-2'>
                            <div className='w-3/2  pl-2 py-2'>Plan</div>
                            <div className='w-1/3 pl-2 py-2 gap-2'>
                                {/* <p className='badge badge-primary'>500</p>
                                -
                                <p className='badge badge-primary'>500</p> */}
                                <span>$5,000 - $19,000</span>
                            </div>
                            <div className='w-1/3 pl-2 py-2'>75.00%</div>
                        </div>
                    </div>
                    <div className='p-2 bg-base-300 shadow'>
                        <div className='flex items-center gap-2 mb-2 px-4'>
                            <input
                                className="radio radio-xs"
                                type="radio"
                                name="plan"
                                value="Plan E"
                                checked={formData.plan === "Plan E"}
                                onChange={handleChange}
                            />
                            <label htmlFor="">Plan E</label>
                        </div>
                        <div className='flex gap-1 py-1 p-2 rounded-tl-2xl rounded-tr-2xl '>
                            <p className='w-3/2 pl-2 py-2 bg-base-200'>Plan E</p>
                            <p className='w-1/3 pl-2 py-2 bg-base-200'>Spent Amount ($)</p>
                            <p className='w-1/3 pl-2 py-2 bg-base-200'>Profit (%)</p>
                        </div>
                        <div className='flex gap-1 py-1 px-2'>
                            <div className='w-3/2  pl-2 py-2'>Plan</div>
                            <div className='w-1/3 pl-2 py-2 gap-2'>
                                {/* <p className='badge badge-primary'>500</p>
                                -
                                <p className='badge badge-primary'>500</p> */}
                                <span>$20,000 - Unlimited</span>
                            </div>
                            <div className='w-1/3 pl-2 py-2'>100.00%</div>
                        </div>
                    </div>



                    {/*  */}
                    <div className='p-2 bg-base-300 shadow'>
                        <div className='flex justify-between py-2 px-4'>
                            <p>Your account balance ($):</p>
                            <p>0.00</p>
                        </div>

                        <div className='py-4 px-4 bg-base-200'></div>

                        <div className='flex justify-between items-center py-2 px-4'>
                            <p>Amount to Spend ($):</p>
                            <input
                                className="input validator text-end"
                                type="text"
                                name="amountToSpend"
                                value={formData.amountToSpend}
                                onChange={handleChange}
                                required />
                        </div>


                        <div className='flex items-center gap-6 mb-2 py-2 px-4 bg-base-200'>
                            <input
                                className="radio radio-xs"
                                type="radio"
                                name="spendFrom"
                                value="bitcoin"
                                checked={formData.spendFrom === "bitcoin"}
                                onChange={handleChange}
                            />
                            <label htmlFor="">Spend funds from BITCOIN</label>
                        </div>
                        <div className='flex items-center gap-6 mb-2 py-2 px-4'>
                            <input
                                className="radio radio-xs"
                                type="radio"
                                name="spendFrom"
                                value="Ethereum"
                                checked={formData.spendFrom === "Ethereum"}
                                onChange={handleChange}
                            />
                            <label htmlFor="">Spend funds from Ethereum</label>
                        </div>
                        <div className='flex items-center gap-6 mb-2 py-2 px-4 bg-base-200'>
                            <input
                                className="radio radio-xs"
                                type="radio"
                                name="spendFrom"
                                value="USDT(TRC20)"
                                checked={formData.spendFrom === "USDT(TRC20)"}
                                onChange={handleChange}
                            />
                            <label htmlFor="">Spend funds from USDT(TRC20)</label>
                        </div>
                        <div className='flex items-center gap-6 mb-2 py-2 px-4'>
                            <input
                                className="radio radio-xs"
                                type="radio"
                                name="spendFrom"
                                value="TRX"
                                checked={formData.spendFrom === "TRX"}
                                onChange={handleChange}
                            />
                            <label htmlFor="">Spend funds from TRX</label>
                        </div>
                    </div>
                    {/* <Link to="/account/confirm-deposit"> */}
                        <button type='submit' className='btn btn-lg btn-primary text-white text-black'>Spend</button>
                    {/* </Link> */}

                </form>
            </div>
        </div>
    )
}
