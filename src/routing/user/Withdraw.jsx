import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Wallet, ArrowUpCircle, AlertTriangle, CheckCircle, X } from 'lucide-react'
import TimedAlert from '../../components/ui/TimedAlert'

export default function Withdraw() {
    const [balances, setBalances] = useState([])
    const [loading, setLoading] = useState(true)
    const [withdrawing, setWithdrawing] = useState(false)
    const [alert, setAlert] = useState(null)
    
    const [selectedCurrency, setSelectedCurrency] = useState(null)
    const [amount, setAmount] = useState('')
    const [address, setAddress] = useState('')

    // Map currency codes to display names
    const currencyMap = {
        'btc': { name: 'Bitcoin', symbol: 'BTC', icon: '₿' },
        'eth': { name: 'Ethereum', symbol: 'ETH', icon: 'Ξ' },
        'usdt': { name: 'USDT (TRC20)', symbol: 'USDT', icon: '₮' },
        'trx': { name: 'TRON', symbol: 'TRX', icon: 'TRX' },
        'xrp': { name: 'Ripple', symbol: 'XRP', icon: 'XRP' },
        'sol': { name: 'Solana', symbol: 'SOL', icon: 'SOL' },
        'doge': { name: 'Dogecoin', symbol: 'DOGE', icon: 'Ð' },
        'ltc': { name: 'Litecoin', symbol: 'LTC', icon: 'Ł' },
        'bnb': { name: 'Binance Coin', symbol: 'BNB', icon: 'BNB' },
        'matic': { name: 'Polygon', symbol: 'MATIC', icon: 'MATIC' },
    }

    useEffect(() => {
        fetchBalances()
    }, [])

    const fetchBalances = async () => {
        const username = localStorage.getItem("username")
        
        if (!username) {
            setAlert({ text: "Please login to view balances", type: "error" })
            setLoading(false)
            return
        }

        try {
            setLoading(true)
            const response = await axios.post("https://invest.esbatech.org/withdrawstat.php", {
                username,
                biz: "bank"
            })
            
            console.log("Balance data:", response.data)
            
            if (Array.isArray(response.data)) {
                setBalances(response.data)
            } else if (response.data && Array.isArray(response.data.balances)) {
                setBalances(response.data.balances)
            } else {
                setBalances([])
            }
        } catch (err) {
            console.error("Error fetching balances:", err)
            setAlert({ text: "Failed to load balance data", type: "error" })
            setBalances([])
        } finally {
            setLoading(false)
        }
    }

    const getCurrencyInfo = (currencyCode) => {
        return currencyMap[currencyCode?.toLowerCase()] || { 
            name: currencyCode?.toUpperCase() || 'Unknown', 
            symbol: currencyCode?.toUpperCase() || '???',
            icon: ''
        }
    }

    const openModal = (currency) => {
        setSelectedCurrency(currency)
        setAmount('')
        setAddress('')
        document.getElementById('withdraw_modal').showModal()
    }

    const closeModal = () => {
        document.getElementById('withdraw_modal').close()
        setSelectedCurrency(null)
        setAmount('')
        setAddress('')
    }

    const handleWithdraw = async () => {
        const username = localStorage.getItem("username")
        const token = localStorage.getItem("token") // Assuming token is stored
        
        if (!username || !token) {
            setAlert({ text: "Please login to withdraw", type: "error" })
            return
        }

        // Validation
        if (!amount || parseFloat(amount) <= 0) {
            setAlert({ text: "Please enter a valid amount", type: "warning" })
            return
        }

        if (!address.trim()) {
            setAlert({ text: "Please enter a wallet address", type: "warning" })
            return
        }

        if (parseFloat(amount) > selectedCurrency.amount) {
            setAlert({ text: "Insufficient balance for this withdrawal", type: "warning" })
            return
        }

        const currencyInfo = getCurrencyInfo(selectedCurrency.currency)

        try {
            setWithdrawing(true)
            const response = await axios.post("https://invest.esbatech.org/withdraw.php", {
                username,
                amount: amount,
                walletAddress: address.trim(),
                token: token,
                plan: "A",
                payMethod: currencyInfo.symbol,
                biz: "bank"
            })
            
            console.log("Withdraw response:", response.data)
            
            if (response.data.code === "200") {
                setAlert({ text: response.data.msg || "Withdrawal submitted successfully", type: "success" })
                closeModal()
                fetchBalances() // Refresh balances
            } else {
                setAlert({ text: response.data.msg || "Withdrawal failed", type: "error" })
            }
        } catch (err) {
            console.error("Error processing withdrawal:", err)
            setAlert({ text: err.response?.data?.msg || "Failed to process withdrawal", type: "error" })
        } finally {
            setWithdrawing(false)
        }
    }

    const totalBalance = balances.reduce((sum, curr) => sum + (curr.amount || 0), 0)
    const hasAnyFunds = balances.some(b => b.amount > 0)

    // Loading State
    if (loading) {
        return (
            <div className="min-h-screen space-y-6 animate-pulse">
                <div className="p-4 bg-base-300 shadow-lg rounded-lg">
                    <div className="skeleton h-16 w-full bg-base-200/50 rounded-lg mb-4"></div>
                    <div className="space-y-2">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="skeleton h-14 w-full bg-base-200/50 rounded-lg"></div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='text-base-content min-h-screen'>
            {/* Alert */}
            {alert && (
                <TimedAlert 
                    text={alert.text} 
                    type={alert.type} 
                    onClose={() => setAlert(null)} 
                />
            )}

            <div className='py-4 sm:py-6'>
                <div className='p-3 sm:p-6 bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50 shadow-xl rounded-2xl'>

                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                        <ArrowUpCircle className="h-7 w-7 text-primary" />
                        <h1 className="text-xl sm:text-2xl font-bold">Withdraw Funds</h1>
                    </div>

                    {/* Account Balance */}
                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 px-4 py-4 bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 rounded-xl'>
                        <p className='text-sm sm:text-base font-medium text-base-content/70'>Total Available Balance</p>
                        <p className='text-2xl sm:text-3xl font-bold text-primary'>
                            ${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                        </p>
                    </div>

                    {/* Desktop Table Header */}
                    <div className='hidden md:flex gap-1 py-3 px-3 bg-base-300/50 rounded-t-xl font-semibold text-sm'>
                        <p className='w-1/4 pl-3'>Currency</p>
                        <p className='w-1/4 pl-3 text-success'>Available</p>
                        <p className='w-1/4 pl-3 text-warning'>Pending</p>
                        <p className='w-1/4 pl-3'>Action</p>
                    </div>

                    {/* Mobile Table Header */}
                    <div className='md:hidden grid grid-cols-4 gap-1 py-3 px-3 bg-base-300/50 rounded-t-xl text-center text-xs font-semibold'>
                        <p className='col-span-1'>Currency</p>
                        <p className='col-span-1 text-success'>Available</p>
                        <p className='col-span-1 text-warning'>Pending</p>
                        <p className='col-span-1'>Action</p>
                    </div>

                    {/* Currency Rows */}
                    <div className='space-y-1'>
                        {balances.length > 0 ? (
                            balances.map((currency, index) => {
                                const currencyInfo = getCurrencyInfo(currency.currency)
                                const hasBalance = currency.amount > 0
                                const hasPending = currency.pendingAmount > 0
                                
                                return (
                                    <div
                                        key={index}
                                        className='cursor-pointer'
                                        onClick={() => hasBalance && openModal(currency)}
                                    >
                                        {/* Desktop Row */}
                                        <div className='hidden md:flex gap-1 py-3 px-3 bg-base-100 hover:bg-base-200 transition-all rounded-lg items-center'>
                                            <p className='w-1/4 pl-3 font-medium'>
                                                <span className="text-primary font-bold mr-2">{currencyInfo.icon}</span>
                                                {currencyInfo.name}
                                            </p>
                                            <p className={`w-1/4 pl-3 font-bold ${hasBalance ? 'text-success' : 'text-base-content/50'}`}>
                                                ${currency.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </p>
                                            <p className={`w-1/4 pl-3 font-bold ${hasPending ? 'text-warning' : 'text-base-content/50'}`}>
                                                ${currency.pendingAmount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                                            </p>
                                            <div className='w-1/4 pl-3'>
                                                {hasBalance ? (
                                                    <button className='btn btn-sm btn-outline btn-warning hover:btn-warning hover:text-warning-content'>
                                                        Withdraw
                                                    </button>
                                                ) : (
                                                    <span className='text-sm text-base-content/40 italic'>No funds</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Mobile Row */}
                                        <div className='md:hidden grid grid-cols-4 gap-1 py-3 px-2 bg-base-100 hover:bg-base-200 transition-all rounded-lg items-center text-center'>
                                            <p className='col-span-1 font-medium text-xs break-words'>
                                                <span className="block text-primary font-bold text-lg leading-none mb-0.5">{currencyInfo.icon}</span>
                                                <span className='text-[10px]'>{currencyInfo.symbol}</span>
                                            </p>
                                            <p className={`col-span-1 font-bold text-xs ${hasBalance ? 'text-success' : 'text-base-content/50'}`}>
                                                ${currency.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </p>
                                            <p className={`col-span-1 font-bold text-xs ${hasPending ? 'text-warning' : 'text-base-content/50'}`}>
                                                ${currency.pendingAmount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                                            </p>
                                            <div className='col-span-1'>
                                                {hasBalance ? (
                                                    <button className='btn btn-xs btn-outline btn-warning'>
                                                        Withdraw
                                                    </button>
                                                ) : (
                                                    <span className='text-[10px] text-base-content/40 italic'>No funds</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="py-12 text-center text-base-content/50">
                                <Wallet className="h-12 w-12 mx-auto mb-3 opacity-30" />
                                <p className="text-lg font-medium">No balances available</p>
                                <p className="text-sm">Make a deposit to get started</p>
                            </div>
                        )}
                    </div>

                    {/* Warning if no funds */}
                    {!hasAnyFunds && balances.length > 0 && (
                        <div className='mt-6 px-2 sm:px-4'>
                            <div className="alert alert-warning shadow-md">
                                <AlertTriangle className="h-5 w-5" />
                                <span>You have no funds available to withdraw. Please make a deposit first.</span>
                            </div>
                        </div>
                    )}

                    {/* Info note */}
                    <div className="mt-6 p-4 bg-base-300/30 rounded-xl border border-base-300/50">
                        <div className="flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 text-primary/70 mt-0.5 flex-shrink-0" />
                            <div className="text-xs text-base-content/60 space-y-1">
                                <p>• Withdrawals are processed within 24-48 hours</p>
                                <p>• Make sure your wallet address is correct before submitting</p>
                                <p>• Minimum withdrawal amount may apply per currency</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Withdraw Modal */}
            <dialog id='withdraw_modal' className='modal modal-bottom sm:modal-middle'>
                <div className='modal-box bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50 shadow-xl'>
                    {selectedCurrency && (() => {
                        const currencyInfo = getCurrencyInfo(selectedCurrency.currency)
                        const insufficientFunds = amount && parseFloat(amount) > selectedCurrency.amount
                        
                        return (
                            <>
                                {/* Close button */}
                                <button 
                                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                    onClick={closeModal}
                                >
                                    <X className="h-4 w-4" />
                                </button>

                                <h3 className='font-bold text-xl mb-1 flex items-center gap-2'>
                                    <span className="text-primary text-2xl">{currencyInfo.icon}</span>
                                    Withdraw {currencyInfo.name}
                                </h3>
                                <p className='text-sm text-base-content/60 mb-5'>
                                    {currencyInfo.symbol} · Wallet Withdrawal
                                </p>

                                {/* Balance Info */}
                                <div className='grid grid-cols-2 gap-3 mb-5'>
                                    <div className='bg-gradient-to-br from-success/10 to-transparent border border-success/20 rounded-xl p-4'>
                                        <p className='text-xs text-base-content/50 mb-1'>Available Balance</p>
                                        <p className='text-2xl font-bold text-success'>
                                            ${selectedCurrency.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </p>
                                    </div>
                                    <div className='bg-gradient-to-br from-warning/10 to-transparent border border-warning/20 rounded-xl p-4'>
                                        <p className='text-xs text-base-content/50 mb-1'>Pending</p>
                                        <p className='text-2xl font-bold text-warning'>
                                            ${selectedCurrency.pendingAmount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                                        </p>
                                    </div>
                                </div>

                                {/* Wallet Address */}
                                <div className='form-control mb-4'>
                                    <label className='label'>
                                        <span className='label-text font-medium'>Wallet Address</span>
                                    </label>
                                    <input
                                        type='text'
                                        placeholder={`Enter your ${currencyInfo.symbol} wallet address`}
                                        className='input input-bordered w-full font-mono text-sm'
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                    {!address && (
                                        <label className='label'>
                                            <span className='label-text-alt text-warning'>Wallet address is required</span>
                                        </label>
                                    )}
                                </div>

                                {/* Amount */}
                                <div className='form-control mb-4'>
                                    <label className='label'>
                                        <span className='label-text font-medium'>Amount (USD)</span>
                                        <span className='label-text-alt'>
                                            <button 
                                                type="button"
                                                className='text-primary text-xs hover:underline font-semibold'
                                                onClick={() => setAmount(selectedCurrency.amount.toString())}
                                            >
                                                Max: ${selectedCurrency.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </button>
                                        </span>
                                    </label>
                                    <input
                                        type='number'
                                        placeholder='0.00'
                                        className={`input input-bordered w-full text-lg ${insufficientFunds ? 'input-error' : ''}`}
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        min='0'
                                        step='0.01'
                                    />
                                    {insufficientFunds && (
                                        <label className='label'>
                                            <span className='label-text-alt text-error'>Insufficient balance</span>
                                        </label>
                                    )}
                                </div>

                                {/* Warning */}
                                {insufficientFunds && (
                                    <div className='alert alert-warning mb-5 text-sm'>
                                        <AlertTriangle className="h-4 w-4" />
                                        <span>Amount exceeds your available balance.</span>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className='flex gap-3 mt-2'>
                                    <button 
                                        className='btn btn-ghost flex-1' 
                                        onClick={closeModal}
                                        type="button"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        className='btn btn-primary flex-1'
                                        disabled={!amount || parseFloat(amount) <= 0 || !address.trim() || insufficientFunds || withdrawing}
                                        onClick={handleWithdraw}
                                        type="button"
                                    >
                                        {withdrawing ? (
                                            <span className="loading loading-spinner loading-sm"></span>
                                        ) : (
                                            <ArrowUpCircle className="h-4 w-4" />
                                        )}
                                        Withdraw {currencyInfo.symbol}
                                    </button>
                                </div>
                            </>
                        )
                    })()}
                </div>

                {/* Click outside to close */}
                <form method='dialog' className='modal-backdrop'>
                    <button onClick={closeModal} type="button">close</button>
                </form>
            </dialog>
        </div>
    )
}