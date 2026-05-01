import React, { useEffect, useState } from 'react'
import ChartTransaction from '../../components/ChartTransaction'
import { Calendar, Clock, TrendingUp, Wallet, ArrowDownCircle, ArrowUpCircle, Activity } from 'lucide-react'
import { CopyableText } from '../../components/ui/CopyableText'
import currentBalIcon from "../../assets/current_bal_icon.png"
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Dashboard() {
    const [accountData, setAccountData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const username = localStorage.getItem("username");

        if (!username) {
            setError("No username found");
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.post("https://invest.esbatech.org/getaccount.php", {
                    username,
                    biz: "bank"
                });
                console.log(response.data);
                setAccountData(response.data);
            } catch (err) {
                console.error("Error:", err);
                setError("Failed to fetch account data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Format date helper function
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
        } catch {
            return dateString;
        }
    };

    // Skeleton Loader Component
    if (loading) {
        return (
            <div className="space-y-8 animate-pulse">
                {/* Header Skeleton */}
                <div className='flex flex-col md:flex-row justify-between md:items-center md:py-4 space-y-4 mb-8'>
                    <div className="skeleton h-12 w-80 bg-base-300/50"></div>
                    <div className='flex justify-between gap-6'>
                        <div className="skeleton h-12 w-32 bg-base-300/50"></div>
                        <div className="skeleton h-12 w-32 bg-base-300/50"></div>
                    </div>
                </div>

                {/* Balance & Info Skeleton */}
                <div className='flex flex-col md:flex-row justify-between gap-8 mb-10'>
                    <div className='flex gap-8 items-center bg-gradient-to-r from-base-200 to-base-300 md:w-3/2 p-4 rounded-2xl'>
                        <div className='bg-base-300 py-3 md:py-5 px-8 rounded-xl'>
                            <div className="skeleton h-12 w-12 rounded-full bg-base-200/50"></div>
                        </div>
                        <div className='text-xl space-y-2'>
                            <div className="skeleton h-6 w-40 bg-base-300/50"></div>
                            <div className="skeleton h-8 w-32 bg-base-300/50"></div>
                        </div>
                    </div>
                    <div className='md:w-2/3 flex md:flex-col flex-row justify-between py-2 text-sm gap-4'>
                        <div className="skeleton h-10 w-full bg-base-300/50 rounded-lg"></div>
                        <div className="skeleton h-10 w-full bg-base-300/50 rounded-lg"></div>
                    </div>
                </div>

                {/* Account Details Cards Skeleton */}
                <div className='mb-6'>
                    <div className="skeleton h-7 w-40 mb-3 bg-base-300/50"></div>
                    <div className='grid grid-cols-2 gap-3 md:gap-5 md:grid-cols-4'>
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className='card bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50'>
                                <div className='card-body p-5'>
                                    <div className="skeleton h-5 w-3/4 mb-3 bg-base-300/50"></div>
                                    <div className="skeleton h-8 w-1/2 bg-base-300/50"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Table & Chart Skeleton */}
                <div>
                    <div className='flex flex-col md:flex-row gap-6'>
                        <div className='md:w-1/2'>
                            <div className="skeleton h-6 w-40 mb-3 bg-base-300/50"></div>
                            <div className='card bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50'>
                                <div className='card-body p-4'>
                                    <div className="skeleton h-72 w-full bg-base-300/50 rounded-lg"></div>
                                </div>
                            </div>
                        </div>
                        <div className='md:w-1/2'>
                            <div className="skeleton h-6 w-56 mb-3 bg-base-300/50"></div>
                            <div className='card bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50'>
                                <div className='card-body p-4'>
                                    <div className="skeleton h-64 w-full bg-base-300/50 rounded-lg"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-error shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className='flex flex-col md:flex-row justify-between md:items-center md:py-4 space-y-4'>
                <CopyableText text="https://güvenilir-varlıklar.com/?ref=Joe" mainStyle="bg-gradient-to-r from-base-200 to-base-300 border border-base-300/50 shadow-sm" />
                <div className='flex gap-3'>
                    <Link to="/account/deposit" className='btn btn-soft btn-primary'>
                        <ArrowDownCircle className="h-5 w-5" />
                        Deposit
                    </Link>
                    <Link to="/account/withdraw" className='btn btn-primary btn-outline'>
                        <ArrowUpCircle className="h-5 w-5" />
                        Withdraw
                    </Link>
                </div>
            </div>

            {/* Balance & Quick Info */}
            <div className='flex flex-col md:flex-row justify-between gap-6'>
                <div className='flex gap-6 items-cente bg-gradient-to-br from-base-200 via-base-200 to-base-300 md:w-3/2 p-6 rounded-2xl border border-base-300/50 shadow-lg hover:shadow-xl transition-all duration-300'>
                    <div className='bg-primary/10 p-5 rounded-2xl ring-1 ring-primary/20 flex items-center'>
                        <Wallet className="h-10 w-10 text-primary" />
                    </div>
                    <div>
                        <p className='text-sm font-medium text-base-content/70 uppercase tracking-wider'>Current Balance</p>
                        <p className='text-3xl font-bold text-base-content mt-1'>
                            ${accountData?.currentBalance?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                            <span className='text-sm font-normal text-base-content/60 ml-1'>USD</span>
                        </p>
                    </div>
                </div>
                
                <div className='md:w-2/3 flex flex-col md:gap-4'>
                    <div className='flex items-center gap-4 flex-1 p-2 md:p-4 rounded-xl hover:bg-base-200 transition-colors duration-300'>
                        <div className='bg-primary/10 p-3 rounded-lg'>
                            <Calendar className='h-4 md:h-5 w-4 md:w-5 text-primary' />
                        </div>
                        <div>
                            <p className='text-xs text-base-content/60'>Today's Date</p>
                            <p className='font-semibold'>{formatDate(new Date())}</p>
                        </div>
                    </div>
                    {/* bg-base-200/50 border border-base-300/30*/}
                    <div className='flex items-center gap-4 flex-1 p-2 md:p-4 rounded-xl hover:bg-base-200 transition-colors duration-300'>
                        <div className='bg-primary/10 p-3 rounded-lg'>
                            <Activity className='h-4 md:h-5 w-4 md:w-5 text-primary' />
                        </div>
                        <div>
                            <p className='text-xs text-base-content/60'>Last Active</p>
                            <p className='font-semibold'>{new Date().toLocaleTimeString()}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Account Stats Cards */}
            <div>
                <div className='flex items-center gap-3 mb-4'>
                    <TrendingUp className="h-6 w-6 text-primary" />
                    <p className='text-xl font-bold'>Account Overview</p>
                </div>
                <div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
                    <div className='stat-card group bg-linear-to-r from-base-200 to-base-300 p-5 rounded-2xl border border-base-300/50 shadow-md hover:shadow-lg hover:border-primary/30 transition-all duration-300'>
                        <p className='text-xs text-sm font-medium text-base-content/70 mb-2'>Total Investments</p>
                        <p className='text-lg sm:text-3xl font-bold group-hover:text-primary transition-colors duration-300'>
                            {accountData?.numOfInvestment || 0}
                        </p>
                    </div>
                    {/* bg-gradient-to-br from-base-200 to-base-300 */}
                    
                    <div className='stat-card group bg-linear-to-r from-base-200 via-base-100 to-base-300 p-5 rounded-2xl border border-base-300/50 shadow-md hover:shadow-lg hover:border-primary/30 transition-all duration-300'>
                        <p className='text-xs text-sm font-medium text-base-content/70 mb-2'>Total Deposits</p>
                        <p className='text-lg sm:text-3xl font-bold group-hover:text-primary transition-colors duration-300'>
                            ${accountData?.totalDeposit?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                        </p>
                    </div>
                    
                    <div className='stat-card group bg-gradient-to-br from-base-200 via-base-100 to-base-300 p-5 rounded-2xl border border-base-300/50 shadow-md hover:shadow-lg hover:border-primary/30 transition-all duration-300'>
                        <p className='text-xs text-sm font-medium text-base-content/70 mb-2'>Last Deposit</p>
                        <p className='text-lg sm:text-3xl font-bold group-hover:text-primary transition-colors duration-300'>
                            ${parseFloat(accountData?.lastDeposit || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                    </div>
                    
                    <div className='stat-card group bg-gradient-to-br from-base-200 to-base-300 p-5 rounded-2xl border border-base-300/50 shadow-md hover:shadow-lg hover:border-primary/30 transition-all duration-300'>
                        <p className='text-xs text-sm font-medium text-base-content/70 mb-2'>Pending Withdrawals</p>
                        <p className='text-lg sm:text-3xl font-bold group-hover:text-primary transition-colors duration-300'>
                            ${accountData?.pendingWithdraw?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                        </p>
                    </div>
                    
                    <div className='stat-card group bg-gradient-to-br from-base-200 to-base-300 p-5 rounded-2xl border border-base-300/50 shadow-md hover:shadow-lg hover:border-primary/30 transition-all duration-300'>
                        <p className='text-xs text-sm font-medium text-base-content/70 mb-2'>Total Withdrawals</p>
                        <p className='text-lg sm:text-3xl font-bold group-hover:text-primary transition-colors duration-300'>
                            ${accountData?.totalWithdraw?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                        </p>
                    </div>
                    
                    <div className='stat-card group bg-gradient-to-br from-base-200 to-base-300 p-5 rounded-2xl border border-base-300/50 shadow-md hover:shadow-lg hover:border-primary/30 transition-all duration-300'>
                        <p className='text-xs text-sm font-medium text-base-content/70 mb-2'>Withdrawal Count</p>
                        <p className='text-lg sm:text-3xl font-bold group-hover:text-primary transition-colors duration-300'>
                            {accountData?.numWithdraw || 0}
                        </p>
                    </div>
                    
                    <div className='stat-card group bg-gradient-to-br from-base-200 to-base-300 p-5 rounded-2xl border border-base-300/50 shadow-md hover:shadow-lg hover:border-primary/30 transition-all duration-300'>
                        <p className='text-sm font-medium text-base-content/70 mb-2'>Last Withdrawal</p>
                        <p className='text-lg sm:text-3xl font-bold group-hover:text-primary transition-colors duration-300'>
                            ${parseFloat(accountData?.lastWithdraw || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                    </div>
                    
                    <div className='stat-card group bg-gradient-to-br from-base-200 to-base-300 p-5 rounded-2xl border border-base-300/50 shadow-md hover:shadow-lg hover:border-primary/30 transition-all duration-300'>
                        <p className='text-sm font-medium text-base-content/70 mb-2'>Approved Withdrawals</p>
                        <p className='text-lg sm:text-3xl font-bold group-hover:text-primary transition-colors duration-300'>
                            ${accountData?.approvedWithdraw?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Section - Table & Chart */}
            <div>
                <div className='flex flex-col md:flex-row gap-6'>
                    <div className='md:w-1/2'>
                        <p className='text-lg font-bold mb-3 flex items-center gap-2'>
                            <Activity className="h-5 w-5 text-primary" />
                            Other Deposits
                        </p>
                        <div className='card bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50 shadow-lg'>
                            <div className='card-body p-4'>
                                <div className="overflow-x-auto max-h-80">
                                    <table className="table table-zebra">
                                        <thead>
                                            <tr className="border-b-2 border-primary/30">
                                                <th className="font-semibold">#</th>
                                                <th className="font-semibold">Plan</th>
                                                <th className="font-semibold">Amount</th>
                                                <th className="font-semibold">Balance</th>
                                                <th className="font-semibold">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {accountData?.otherDeposit && accountData.otherDeposit.length > 0 ? (
                                                accountData.otherDeposit.map((deposit, index) => (
                                                    <tr key={index} className="hover:bg-base-300/50 transition-colors">
                                                        <th className="font-medium">{index + 1}</th>
                                                        <td>
                                                            <span className="font-semibold text-primary">Plan {deposit.plan}</span>
                                                        </td>
                                                        <td>${parseFloat(deposit.deposits || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                        <td>${deposit.balance?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}</td>
                                                        <td>
                                                            <span className={`badge ${deposit.payStatus === 'pending' ? 'badge-warning' : 'badge-success'} badge-sm font-medium`}>
                                                                {deposit.payStatus}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="text-center py-8 text-base-content/50">
                                                        No deposits found
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='md:w-1/2'>
                        <p className='text-lg font-bold mb-3 flex items-center gap-2'>
                            <TrendingUp className="h-5 w-5 text-primary" />
                            Transaction Analytics
                        </p>
                        <div className='card bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50 shadow-lg h-full md:p-4'>
                            <div className='card-body p-0'>
                                <ChartTransaction />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}