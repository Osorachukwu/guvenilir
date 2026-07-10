import React from 'react'
import { Users, ArrowUp, ArrowDown, Ban } from 'lucide-react'
import StatusBadge from './StatusBadge'

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    } catch {
        return dateString;
    }
};

export default function OverviewTab({ dashboardData, setActiveTab }) {
    const deposits = dashboardData.depositList || [];
    const withdrawals = dashboardData.withdrawList || [];
    
    const totalDeposited = dashboardData.totlDeposit || deposits.reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0);
    const totalWithdrawn = dashboardData.totalWithdraw || withdrawals.reduce((sum, w) => sum + (parseFloat(w.amount) || 0), 0);
    const pendingDeposits = deposits.filter(d => d.payStatus === "pending").length;
    const pendingWithdrawals = withdrawals.filter(w => w.withdrawStatus === "pending").length;

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                    { label: "Total Users", value: dashboardData.totalUsers, sub: `${dashboardData.totalAcive} active`, color: "text-primary", bg: "bg-primary/10", icon: <Users size={20} /> },
                    { label: "Total Deposited", value: `$${totalDeposited.toLocaleString()}`, sub: `${pendingDeposits} pending`, color: "text-success", bg: "bg-success/10", icon: <ArrowUp size={20} /> },
                    { label: "Total Withdrawn", value: `$${totalWithdrawn.toLocaleString()}`, sub: `${pendingWithdrawals} pending`, color: "text-warning", bg: "bg-warning/10", icon: <ArrowDown size={20} /> },
                    { label: "Suspended", value: dashboardData.totalSuspend, sub: "accounts", color: "text-error", bg: "bg-error/10", icon: <Ban /> },
                ].map((stat) => (
                    <div key={stat.label} className="stat-card group card bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50 shadow-md hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                        <div className="card-body p-5">
                            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center text-lg mb-3`}>
                                {stat.icon}
                            </div>
                            <p className={`text-2xl lg:text-3xl font-bold mono ${stat.color}`}>{stat.value}</p>
                            <p className="text-sm font-medium text-base-content/70 mt-1">{stat.label}</p>
                            <p className="text-xs text-base-content/40 mt-0.5">{stat.sub}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Recent Deposits */}
                <div className="card bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50 shadow-md">
                    <div className="card-body p-0">
                        <div className="px-5 py-4 border-b border-base-300/50 flex items-center justify-between">
                            <h3 className="font-semibold">Recent Deposits</h3>
                            <button onClick={() => setActiveTab("deposits")} className="btn btn-ghost btn-xs text-primary" type="button">View all →</button>
                        </div>
                        <div className="divide-y divide-base-300/30">
                            {(dashboardData.lastFiveDeposit || []).map((item) => (
                                <div key={item.id} className="flex items-center justify-between px-5 py-3 hover:bg-base-300/30 transition-colors">
                                    <div>
                                        <p className="text-sm font-medium">{item.username}</p>
                                        <p className="text-xs text-base-content/40 font-mono">{formatDate(item.date_created)}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-success font-mono">+${parseFloat(item.amount).toLocaleString()}</p>
                                        <StatusBadge status={item.payStatus} />
                                    </div>
                                </div>
                            ))}
                            {(dashboardData.lastFiveDeposit || []).length === 0 && (
                                <p className="text-center text-sm text-base-content/40 py-8">No deposits yet</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Recent Withdrawals */}
                <div className="card bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50 shadow-md">
                    <div className="card-body p-0">
                        <div className="px-5 py-4 border-b border-base-300/50 flex items-center justify-between">
                            <h3 className="font-semibold">Recent Withdrawals</h3>
                            <button onClick={() => setActiveTab("withdrawals")} className="btn btn-ghost btn-xs text-primary" type="button">View all →</button>
                        </div>
                        <div className="divide-y divide-base-300/30">
                            {(dashboardData.lastFiveWithdraw || []).map((item) => (
                                <div key={item.id} className="flex items-center justify-between px-5 py-3 hover:bg-base-300/30 transition-colors">
                                    <div>
                                        <p className="text-sm font-medium">{item.username}</p>
                                        <p className="text-xs text-base-content/40 font-mono">{formatDate(item.date_created)}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-error font-mono">-${parseFloat(item.amount).toLocaleString()}</p>
                                        <StatusBadge status={item.withdrawStatus} />
                                    </div>
                                </div>
                            ))}
                            {(dashboardData.lastFiveWithdraw || []).length === 0 && (
                                <p className="text-center text-sm text-base-content/40 py-8">No withdrawals yet</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}