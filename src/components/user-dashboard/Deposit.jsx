import { DollarSign } from 'lucide-react'
import React from 'react'

export default function Deposit() {
    return (
        <div>
            <h2 className="card-title">Deposit Funds</h2>
            <div className='flex gap-4'>
                <div className="card w-2/3 bg-base-300">
                    <div className="card-body">
                        <div>
                            <p className='uppercase font-semibold'>Select Investment Plan</p>
                            <select defaultValue="Pick a color" className="select w-full">
                                <option disabled={true}>Pick a color</option>
                                <option>Amateur Plan</option>
                                <option>Standared</option>
                                <option>Premium Plan</option>
                                <option>Retirement Plan</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="card w-1/3 bg-base-300">
                    <div className="card-body">
                        <p className='uppercase font-semibold'>Select Payment and eter amount</p>
                        <select defaultValue="Pick a color" className="select w-full">
                            <option disabled={true}>Pick a color</option>
                            <option>Bitcoin</option>
                            <option>Etherum</option>
                            <option>BNB Smartchain</option>
                            <option>USDT TRC20</option>
                            <option>BNB</option>
                            <option>USDT ERC20</option>
                        </select>
                        <label className="input w-full">
                            {/* <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                            </g>
                        </svg> */}
                            <DollarSign size={16} />
                            <input type="text" className="grow" placeholder="100.00" />
                        </label>
                        <div>
                            <button className='btn btn-primary'>Make a deposit</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
