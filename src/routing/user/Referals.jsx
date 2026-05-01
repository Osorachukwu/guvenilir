import React, { useEffect, useState } from 'react'
import { Users, UserCheck, DollarSign } from 'lucide-react'
import axios from 'axios'

export default function Referals() {
    const [referralData, setReferralData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const username = localStorage.getItem("username");

        if (!username) {
            setLoading(false);
            return;
        }

        const fetchReferralData = async () => {
            try {
                setLoading(true);
                const response = await axios.post("https://invest.esbatech.org/refstat.php", {
                    username,
                    domainKey: "254342",
                    biz: "bank"
                });
                console.log(response.data);
                setReferralData(response.data);
            } catch (err) {
                console.error("Error:", err);
                // Still set default values on error
                setReferralData({ numRef: 0, total: 0 });
            } finally {
                setLoading(false);
            }
        };

        fetchReferralData();
    }, []);

    // Skeleton Loader
    if (loading) {
        return (
            <div className="animate-pulse">
                <div className="skeleton h-7 w-48 mb-6 bg-base-300/50"></div>
                
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {/* Number of Referrals Skeleton */}
                    <div className='bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50 shadow-lg rounded-lg p-4 sm:p-6'>
                        <div className='sm:hidden flex justify-between items-center'>
                            <div className="skeleton h-4 w-20 bg-base-300/50"></div>
                            <div className="skeleton h-7 w-16 bg-base-300/50"></div>
                        </div>
                        <div className='hidden sm:block'>
                            <div className="skeleton h-4 w-24 mb-3 bg-base-300/50"></div>
                            <div className="skeleton h-9 w-20 bg-base-300/50"></div>
                        </div>
                    </div>
                    
                    {/* Active Referrals Skeleton */}
                    {/* <div className='bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50 shadow-lg rounded-lg p-4 sm:p-6'>
                        <div className='sm:hidden flex justify-between items-center'>
                            <div className="skeleton h-4 w-24 bg-base-300/50"></div>
                            <div className="skeleton h-7 w-16 bg-base-300/50"></div>
                        </div>
                        <div className='hidden sm:block'>
                            <div className="skeleton h-4 w-32 mb-3 bg-base-300/50"></div>
                            <div className="skeleton h-9 w-20 bg-base-300/50"></div>
                        </div>
                    </div> */}
                    
                    {/* Total Commission Skeleton */}
                    <div className='bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50 shadow-lg rounded-lg p-4 sm:p-6'>
                        <div className='sm:hidden flex justify-between items-center'>
                            <div className="skeleton h-4 w-32 bg-base-300/50"></div>
                            <div className="skeleton h-7 w-20 bg-base-300/50"></div>
                        </div>
                        <div className='hidden sm:block'>
                            <div className="skeleton h-4 w-40 mb-3 bg-base-300/50"></div>
                            <div className="skeleton h-9 w-24 bg-base-300/50"></div>
                        </div>
                    </div>
                </div>

                <div className='mt-6 pt-4 border-t border-base-300'>
                    <div className="skeleton h-3 w-40 mx-auto bg-base-300/50"></div>
                </div>
            </div>
        );
    }

    const numRef = referralData?.numRef || 0;
    const totalCommission = referralData?.total || 0;

    return (
        <div>
            <div className='flex items-center gap-2 mb-4 sm:mb-6'>
                <Users className="h-6 w-6 text-primary" />
                <h2 className='text-lg sm:text-xl font-bold'>Referral Statistics</h2>
            </div>

            {/* Responsive Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {/* Number of Referrals */}
                <div className='stat-card group bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50 shadow-lg rounded-2xl p-5 sm:p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300'>
                    <div className='sm:hidden flex justify-between items-center'>
                        <div className='flex items-center gap-2'>
                            <Users className="h-5 w-5 text-primary/70" />
                            <p className='font-medium text-sm'>Total Referrals</p>
                        </div>
                        <p className='text-2xl font-bold text-primary group-hover:scale-105 transition-transform'>
                            {numRef}
                        </p>
                    </div>
                    <div className='hidden sm:block'>
                        <div className='flex items-center gap-2 mb-3'>
                            <Users className="h-5 w-5 text-primary/70" />
                            <p className='text-sm font-medium text-base-content/70 uppercase tracking-wider'>
                                Total Referrals
                            </p>
                        </div>
                        <p className='text-4xl font-bold text-primary group-hover:translate-x-1 transition-transform'>
                            {numRef}
                        </p>
                        <p className='text-xs text-base-content/50 mt-2'>
                            {numRef === 1 ? 'Person referred' : 'People referred'}
                        </p>
                    </div>
                </div>

                {/* Active Referrals */}
                {/* <div className='stat-card group bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50 shadow-lg rounded-2xl p-5 sm:p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300'>
                    <div className='sm:hidden flex justify-between items-center'>
                        <div className='flex items-center gap-2'>
                            <UserCheck className="h-5 w-5 text-primary/70" />
                            <p className='font-medium text-sm'>Active Referrals</p>
                        </div>
                        <p className='text-2xl font-bold text-primary group-hover:scale-105 transition-transform'>
                            {numRef}
                        </p>
                    </div>
                    <div className='hidden sm:block'>
                        <div className='flex items-center gap-2 mb-3'>
                            <UserCheck className="h-5 w-5 text-primary/70" />
                            <p className='text-sm font-medium text-base-content/70 uppercase tracking-wider'>
                                Active Referrals
                            </p>
                        </div>
                        <p className='text-4xl font-bold text-primary group-hover:translate-x-1 transition-transform'>
                            {numRef}
                        </p>
                        <p className='text-xs text-base-content/50 mt-2'>
                            All referrals are active
                        </p>
                    </div>
                </div> */}

                {/* Total Commission */}
                <div className='stat-card group bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50 shadow-lg rounded-2xl p-5 sm:p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300'>
                    <div className='sm:hidden flex justify-between items-center'>
                        <div className='flex items-center gap-2'>
                            <DollarSign className="h-5 w-5 text-primary/70" />
                            <p className='font-medium text-sm'>Commission</p>
                        </div>
                        <p className='text-2xl font-bold text-primary group-hover:scale-105 transition-transform'>
                            ${totalCommission.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                    </div>
                    <div className='hidden sm:block'>
                        <div className='flex items-center gap-2 mb-3'>
                            <DollarSign className="h-5 w-5 text-primary/70" />
                            <p className='text-sm font-medium text-base-content/70 uppercase tracking-wider'>
                                Total Commission
                            </p>
                        </div>
                        <p className='text-4xl font-bold text-primary group-hover:translate-x-1 transition-transform'>
                            ${totalCommission.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                        <p className='text-xs text-base-content/50 mt-2'>
                            Lifetime earnings
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer with last updated */}
            <div className='mt-6 pt-4 border-t border-base-300/50'>
                <p className='text-xs text-base-content/50 text-center'>
                    Last updated: {new Date().toLocaleString()}
                </p>
            </div>
        </div>
    )
}