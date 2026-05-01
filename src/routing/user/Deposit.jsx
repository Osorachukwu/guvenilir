import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Deposit() {
    const plans = [
        { id: 'Plan A', label: 'Plan A', range: '$30 - $499',          profit: '15.00%', minAmount: '30.00'    },
        { id: 'Plan B', label: 'Plan B', range: '$500 - $999',         profit: '30.00%', minAmount: '500.00'   },
        { id: 'Plan C', label: 'Plan C', range: '$1,000 - $4,999',     profit: '50.00%', minAmount: '1000.00'  },
        { id: 'Plan D', label: 'Plan D', range: '$5,000 - $19,000',    profit: '75.00%', minAmount: '5000.00'  },
        { id: 'Plan E', label: 'Plan E', range: '$20,000 - Unlimited', profit: '100.00%', minAmount: '20000.00' }
    ];

    // spendOptions now carry both the display label and the API shortcode (payMethod)
    const spendOptions = [
        { value: 'Bitcoin',     payMethod: 'btc',  label: 'BITCOIN',     bg: true  },
        { value: 'Ethereum',    payMethod: 'eth',  label: 'Ethereum',    bg: false },
        { value: 'USDT(TRC20)', payMethod: 'usdt', label: 'USDT(TRC20)', bg: true  },
        { value: 'SOLANA',      payMethod: 'sol',  label: 'SOLANA',      bg: false },
        { value: 'XRP',         payMethod: 'xrp',  label: 'XRP',         bg: true  },
        { value: 'TRX',         payMethod: 'trx',  label: 'TRX',         bg: false },
        { value: 'LTC',         payMethod: 'ltc',  label: 'LTC',         bg: true  },
        { value: 'Dogecoin',    payMethod: 'doge', label: 'Dogecoin',    bg: false },
    ];

    const [formData, setFormData] = useState({
        plan:       'Plan A',
        spendFrom:  spendOptions[0].value,      // display name  — "Bitcoin"
        payMethod:  spendOptions[0].payMethod,  // API shortcode — "btc"
        amount:     plans[0].minAmount,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'plan') {
            const selected = plans.find(p => p.id === value);
            setFormData(prev => ({
                ...prev,
                plan:   value,
                amount: selected ? selected.minAmount : prev.amount,
            }));

        } else if (name === 'amount') {
            const selectedPlan = plans.find(p => p.id === formData.plan);
            const min          = selectedPlan ? parseFloat(selectedPlan.minAmount) : 0;
            const entered      = parseFloat(value);
            setFormData(prev => ({
                ...prev,
                amount: (!isNaN(entered) && entered < min) ? selectedPlan.minAmount : value,
            }));

        } else if (name === 'spendFrom') {
            const option = spendOptions.find(o => o.value === value);
            setFormData(prev => ({
                ...prev,
                spendFrom: value,
                payMethod: option ? option.payMethod : prev.payMethod,
            }));

        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Extract just the letter from "Plan A" → "A"
        const planLetter = formData.plan.replace('Plan ', '').trim();

        navigate("/account/confirm-deposit", {
            state: {
                plan:      planLetter,        // "A" | "B" | "C" | "D" | "E"
                amount:    formData.amount,   // e.g. "30.00"
                payMethod: formData.payMethod // e.g. "btc"
            }
        });
    };

    return (
        <div>
            <form className='space-y-4 sm:space-y-6' onSubmit={handleSubmit}>
                {/* Plan Cards */}
                {plans.map((plan) => (
                    <div key={plan.id} className='p-3 sm:p-4 bg-base-300 shadow-lg rounded-lg hover:shadow-xl transition-shadow'>
                        <div className='flex items-center gap-3 mb-3 px-2 sm:px-4'>
                            <input
                                className="radio radio-sm sm:radio-xs"
                                type="radio"
                                name="plan"
                                value={plan.id}
                                checked={formData.plan === plan.id}
                                onChange={handleChange}
                            />
                            <label className="font-medium text-sm sm:text-base">{plan.label}</label>
                        </div>

                        {/* Table Header — desktop */}
                        <div className='hidden sm:flex gap-1 py-2 px-2 bg-base-200 rounded-t-lg'>
                            <p className='w-1/2 pl-3 py-2 font-semibold'>Plan</p>
                            <p className='w-1/4 pl-3 py-2 font-semibold'>Spent Amount ($)</p>
                            <p className='w-1/4 pl-3 py-2 font-semibold'>Profit (%)</p>
                        </div>

                        {/* Table Header — mobile */}
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
                    </div>
                ))}

                {/* Payment Details Card */}
                <div className='p-4 sm:p-6 bg-base-300 shadow-lg rounded-lg space-y-4'>
                    {/* Account Balance */}
                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 py-2 px-3 sm:px-4 bg-base-200 rounded-lg'>
                        <p className='text-sm sm:text-base font-medium'>Your account balance ($):</p>
                        <p className='text-lg sm:text-xl font-bold'>0.00</p>
                    </div>

                    <div className='h-px bg-base-200'></div>

                    {/* Amount to Spend */}
                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 py-2 px-3 sm:px-4'>
                        <label className='text-sm sm:text-base font-medium'>Amount to Spend ($):</label>
                        <input
                            className="input input-bordered w-full sm:w-auto sm:min-w-[200px] text-end"
                            type="number"
                            step="0.01"
                            min={plans.find(p => p.id === formData.plan)?.minAmount || '0'}
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='h-px bg-base-200'></div>

                    {/* Payment Method */}
                    <div className='space-y-2'>
                        <p className='text-sm sm:text-base font-medium px-3 sm:px-4 mb-3'>Select payment method:</p>
                        {spendOptions.map((option) => (
                            <div
                                key={option.value}
                                className={`flex items-center gap-4 p-3 sm:p-4 rounded-lg hover:bg-base-100 transition-colors ${option.bg ? 'bg-base-200' : ''}`}
                            >
                                <input
                                    className="radio radio-sm sm:radio-xs"
                                    type="radio"
                                    name="spendFrom"
                                    value={option.value}
                                    checked={formData.spendFrom === option.value}
                                    onChange={handleChange}
                                />
                                <label className='text-sm sm:text-base cursor-pointer flex-1'>
                                    Spend funds from {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit */}
                <div className='flex justify-center sm:justify-start'>
                    <button
                        type='submit'
                        className='btn btn-primary text-black w-full sm:w-auto px-8 py-3 sm:py-2 text-base sm:text-lg'
                    >
                        Spend Now
                    </button>
                </div>
            </form>
        </div>
    );
}