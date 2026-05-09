import { ArrowDownCircle, User } from 'lucide-react';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import TimedAlert from '../../components/ui/TimedAlert'
import { BASE_URL, DOMAIN_KEY } from '../../utils/constants'

export default function Deposit() {
    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(true)
    const [alert, setAlert] = useState(null)

    const spendOptions = [
        { value: 'Bitcoin', payMethod: 'btc', label: 'BITCOIN', bg: true },
        { value: 'Ethereum', payMethod: 'eth', label: 'Ethereum', bg: false },
        { value: 'USDT(TRC20)', payMethod: 'usdt', label: 'USDT(TRC20)', bg: true },
        { value: 'SOLANA', payMethod: 'sol', label: 'SOLANA', bg: false },
        { value: 'XRP', payMethod: 'xrp', label: 'XRP', bg: true },
        { value: 'TRX', payMethod: 'trx', label: 'TRX', bg: false },
        { value: 'LTC', payMethod: 'ltc', label: 'LTC', bg: true },
        { value: 'Dogecoin', payMethod: 'doge', label: 'Dogecoin', bg: false },
    ];

    const [formData, setFormData] = useState({
        plan: '',
        spendFrom: spendOptions[0].value,
        payMethod: spendOptions[0].payMethod,
        amount: '',
    });

    const navigate = useNavigate();

    // Fetch plans from backend
    useEffect(() => {
        fetchPlans()
    }, [])

    const fetchPlans = async () => {
        try {
            setLoading(true)
            const response = await axios.post(`${BASE_URL}/getplan.php`, {
                domainKey: DOMAIN_KEY
            })

            console.log("Plans:", response.data)

            let plansArray = []
            if (Array.isArray(response.data)) {
                plansArray = response.data
            } else if (response.data && typeof response.data === 'object') {
                plansArray = [response.data]
            }

            if (plansArray.length > 0) {
                setPlans(plansArray)
                // Set default to first plan
                setFormData(prev => ({
                    ...prev,
                    plan: plansArray[0].plan,
                    amount: plansArray[0].minVal.toString()
                }))
            }
        } catch (err) {
            console.error("Error fetching plans:", err)
            setAlert({ text: "Failed to load investment plans", type: "error" })
        } finally {
            setLoading(false)
        }
    }

    const getSelectedPlan = () => {
        return plans.find(p => p.plan === formData.plan)
    }

    // Helper to format currency
    const formatCurrency = (val) => {
        const num = parseInt(val)
        if (isNaN(num)) return val
        return num.toLocaleString()
    }

    // Helper to check if a plan has unlimited max value
    const isUnlimitedPlan = (maxVal) => {
        const num = parseInt(maxVal)
        return num >= 2147483647 || num >= 1000000000
    }

    // Format max value for display
    const formatMaxVal = (maxVal) => {
        if (isUnlimitedPlan(maxVal)) return 'Unlimited'
        return '$' + formatCurrency(maxVal)
    }

    // Format range for display
    const formatRange = (minVal, maxVal) => {
        const min = parseInt(minVal)
        if (isUnlimitedPlan(maxVal)) {
            return `$${min.toLocaleString()} - Unlimited`
        }
        const max = parseInt(maxVal)
        return `$${min.toLocaleString()} - $${max.toLocaleString()}`
    }

    // Format duration
    const formatDuration = (hours) => {
        const h = parseInt(hours)
        if (!h) return `${hours}h`
        if (h < 24) return `${h} Hours`
        const days = Math.floor(h / 24)
        const remainingHours = h % 24
        if (remainingHours === 0) return `${days} Day${days > 1 ? 's' : ''}`
        return `${days}D ${remainingHours}h`
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        if (name === 'plan') {
            const selected = plans.find(p => p.plan === value)
            setFormData(prev => ({
                ...prev,
                plan: value,
                amount: selected ? selected.minVal.toString() : prev.amount,
            }))

        } else if (name === 'amount') {
            const selectedPlan = plans.find(p => p.plan === formData.plan)
            const min = selectedPlan ? parseFloat(selectedPlan.minVal) : 0
            const max = selectedPlan ? parseFloat(selectedPlan.maxVal) : Infinity
            const entered = parseFloat(value)
            const unlimited = selectedPlan ? isUnlimitedPlan(selectedPlan.maxVal) : false

            if (!isNaN(entered)) {
                if (entered < min) {
                    setFormData(prev => ({ ...prev, amount: min.toString() }))
                } else if (!unlimited && entered > max) {
                    setFormData(prev => ({ ...prev, amount: max.toString() }))
                } else {
                    setFormData(prev => ({ ...prev, amount: value }))
                }
            } else {
                setFormData(prev => ({ ...prev, amount: value }))
            }

        } else if (name === 'spendFrom') {
            const option = spendOptions.find(o => o.value === value)
            setFormData(prev => ({
                ...prev,
                spendFrom: value,
                payMethod: option ? option.payMethod : prev.payMethod,
            }))

        } else {
            setFormData(prev => ({ ...prev, [name]: value }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const selectedPlan = getSelectedPlan()
        if (!selectedPlan) {
            setAlert({ text: "Please select a plan", type: "warning" })
            return
        }

        const amount = parseFloat(formData.amount)
        const min = parseFloat(selectedPlan.minVal)
        const max = parseFloat(selectedPlan.maxVal)
        const unlimited = isUnlimitedPlan(selectedPlan.maxVal)

        if (isNaN(amount) || amount <= 0) {
            setAlert({ text: "Please enter a valid amount", type: "warning" })
            return
        }

        if (amount < min) {
            setAlert({ text: `Minimum deposit for ${selectedPlan.planName} is $${formatCurrency(min)}`, type: "warning" })
            return
        }

        if (!unlimited && amount > max) {
            setAlert({ text: `Maximum deposit for ${selectedPlan.planName} is $${formatCurrency(max)}`, type: "warning" })
            return
        }

        navigate("/account/confirm-deposit", {
            state: {
                plan: selectedPlan.plan,
                amount: formData.amount,
                payMethod: formData.payMethod
            }
        })
    }

    // Loading state
    if (loading) {
        return (
            <div className="space-y-4 animate-pulse">
                <div className="skeleton h-8 w-48 bg-base-300/50 mb-4"></div>
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="skeleton h-40 w-full bg-base-300/50 rounded-lg"></div>
                ))}
            </div>
        )
    }

    const selectedPlan = getSelectedPlan()

    return (
        <div>
            {/* Alert */}
            {alert && (
                <TimedAlert
                    text={alert.text}
                    type={alert.type}
                    onClose={() => setAlert(null)}
                />
            )}

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <ArrowDownCircle className="h-6 w-6 text-primary" />
                <h1 className="text-lg sm:text-xl font-semibold">Deposit</h1>
            </div>

            {plans.length === 0 ? (
                <div className="card bg-base-300 shadow-lg rounded-lg">
                    <div className="card-body flex items-center justify-center py-16">
                        <p className="text-base-content/50">No investment plans available</p>
                    </div>
                </div>
            ) : (
                <form className='space-y-4 sm:space-y-6' onSubmit={handleSubmit}>
                    {/* Plan Cards */}
                    {plans.map((plan) => {
                        const selected = formData.plan === plan.plan
                        return (
                            <div 
                                key={plan.id || plan.plan} 
                                className={`p-3 sm:p-4 shadow-lg rounded-lg hover:shadow-xl transition-all cursor-pointer border ${
                                    selected 
                                        ? 'bg-gradient-to-br from-primary/5 to-primary/10 border-primary/30' 
                                        : 'bg-base-300 border-base-300/50'
                                }`}
                                onClick={() => handleChange({ target: { name: 'plan', value: plan.plan } })}
                            >
                                <div className='flex items-center gap-3 mb-3 px-2 sm:px-4'>
                                    <input
                                        className="radio radio-sm sm:radio-xs"
                                        type="radio"
                                        name="plan"
                                        value={plan.plan}
                                        checked={selected}
                                        onChange={handleChange}
                                    />
                                    <label className="font-medium text-sm sm:text-base">
                                        <span className="text-primary font-bold mr-1">Plan {plan.plan}</span>
                                        - {plan.planName}
                                    </label>
                                </div>

                                {/* Table Header — desktop */}
                                <div className='hidden sm:flex gap-1 py-2 px-2 bg-base-200 rounded-t-lg'>
                                    <p className='w-1/4 pl-3 py-2 font-semibold'>Plan</p>
                                    <p className='w-1/4 pl-3 py-2 font-semibold'>Range ($)</p>
                                    <p className='w-1/4 pl-3 py-2 font-semibold'>Profit (%)</p>
                                    <p className='w-1/4 pl-3 py-2 font-semibold'>Duration</p>
                                </div>

                                {/* Table Header — mobile */}
                                <div className='sm:hidden grid grid-cols-4 gap-1 py-2 px-2 bg-base-200 rounded-t-lg text-center text-xs font-semibold'>
                                    <p>Plan</p>
                                    <p>Range</p>
                                    <p>Profit</p>
                                    <p>Time</p>
                                </div>

                                {/* Plan Details */}
                                <div className='grid grid-cols-4 sm:flex gap-1 py-2 px-2 bg-base-100 rounded-b-lg'>
                                    <div className='col-span-1 sm:w-1/4 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium'>
                                        {plan.planName}
                                    </div>
                                    <div className='col-span-1 sm:w-1/4 px-2 sm:px-3 py-2 text-xs sm:text-sm text-center sm:text-left'>
                                        {formatRange(plan.minVal, plan.maxVal)}
                                    </div>
                                    <div className='col-span-1 sm:w-1/4 px-2 sm:px-3 py-2 text-xs sm:text-sm text-center sm:text-left font-semibold text-success'>
                                        {plan.dailyProfit}%
                                    </div>
                                    <div className='col-span-1 sm:w-1/4 px-2 sm:px-3 py-2 text-xs sm:text-sm text-center sm:text-left text-base-content/60'>
                                        {formatDuration(plan.maturity)}
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    {/* Payment Details Card */}
                    <div className='p-4 sm:p-6 bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50 shadow-lg rounded-2xl space-y-4'>
                        {/* Selected Plan Info */}
                        {selectedPlan && (
                            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 py-2 px-3 sm:px-4 bg-primary/5 border border-primary/10 rounded-xl'>
                                <p className='text-sm sm:text-base font-medium'>
                                    Plan {selectedPlan.plan} - {selectedPlan.planName}
                                </p>
                                <p className='text-sm text-base-content/60'>
                                    Min: ${formatCurrency(selectedPlan.minVal)} · Max: {formatMaxVal(selectedPlan.maxVal)}
                                </p>
                            </div>
                        )}

                        {/* Amount to Spend */}
                        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 py-2 px-3 sm:px-4'>
                            <label className='text-sm sm:text-base font-medium'>Amount to Spend ($):</label>
                            <div className="w-full sm:w-auto sm:min-w-[200px]">
                                <input
                                    className="input input-bordered w-full text-end"
                                    type="number"
                                    step="0.01"
                                    min={selectedPlan?.minVal || '0'}
                                    max={selectedPlan && !isUnlimitedPlan(selectedPlan.maxVal) ? selectedPlan.maxVal : undefined}
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    required
                                />
                                {selectedPlan && (
                                    <p className="text-[10px] text-base-content/40 mt-1 text-end">
                                        {formatRange(selectedPlan.minVal, selectedPlan.maxVal)}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className='h-px bg-base-300/50'></div>

                        {/* Payment Method */}
                        <div className='space-y-2'>
                            <p className='text-sm sm:text-base font-medium px-3 sm:px-4 mb-3'>Select payment method:</p>
                            {spendOptions.map((option) => (
                                <div
                                    key={option.value}
                                    className={`flex items-center gap-4 p-3 sm:p-4 rounded-lg hover:bg-base-100 transition-colors cursor-pointer ${
                                        option.bg ? 'bg-base-200/50' : ''
                                    } ${formData.spendFrom === option.value ? 'ring-2 ring-primary/30' : ''}`}
                                    onClick={() => handleChange({ target: { name: 'spendFrom', value: option.value } })}
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
                            className='btn btn-primary w-full sm:w-auto px-8 py-3 sm:py-2 text-base sm:text-lg shadow-md hover:shadow-lg transition-all'
                        >
                            <ArrowDownCircle className="h-5 w-5" />
                            Spend Now
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}