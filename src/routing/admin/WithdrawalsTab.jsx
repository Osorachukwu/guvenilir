import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL, DOMAIN_KEY } from '../../utils/constants'
import TransactionActions from './TransactionActions'
import TimedAlert from '../../components/ui/TimedAlert'

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    } catch {
        return dateString;
    }
};

const TransactionCard = ({ item, type, onAction }) => {
    const amount = parseFloat(item.amount) || 0;
    return (
        <div className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body p-4">
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <p className="font-semibold text-sm">{item.username}</p>
                        <p className="text-xs text-base-content/40">{formatDate(item.date_created)}</p>
                    </div>
                    <p className="text-lg font-bold text-error font-mono">-${amount.toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex gap-2 text-xs text-base-content/50">
                        {item.plan && <span>Plan: {item.plan}</span>}
                        {item.payMethod && <span>· {item.payMethod}</span>}
                    </div>
                    <TransactionActions status={item.withdrawStatus} onAction={onAction} />
                </div>
            </div>
        </div>
    );
};

export default function WithdrawalsTab({ onRefresh }) {
    const [withdrawals, setWithdrawals] = useState([])
    const [loading, setLoading] = useState(true)
    const [alert, setAlert] = useState(null)

    useEffect(() => {
        fetchWithdrawals()
    }, [])

    const fetchWithdrawals = async () => {
        try {
            setLoading(true)
            const response = await axios.post(`${BASE_URL}/admindata.php`, { domainKey: DOMAIN_KEY })
            if (response.data?.withdrawList) {
                setWithdrawals(response.data.withdrawList)
            }
        } catch (err) {
            console.error("Error fetching withdrawals:", err)
        } finally {
            setLoading(false)
        }
    }

    const handleAction = async (id, status) => {
        try {
            const response = await axios.post(`${BASE_URL}/action.php`, {
                tid: id,
                action: "withdraw",
                whichAction: status,
                domainKey: DOMAIN_KEY
            })
            if (response.status === 200) {
                setAlert({ text: `Withdrawal ${status} successfully`, type: "success" })
                fetchWithdrawals()
                onRefresh()
            }
        } catch (err) {
            setAlert({ text: "Failed to process withdrawal action", type: "error" })
        }
    }

    const pendingWithdrawals = withdrawals.filter(w => w.withdrawStatus === "pending").length

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {alert && <TimedAlert text={alert.text} type={alert.type} onClose={() => setAlert(null)} />}

            <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold flex-1">Withdrawal Requests</h3>
                <span className="badge badge-ghost text-xs">Total: {withdrawals.length}</span>
                <span className="badge badge-warning text-xs">Pending: {pendingWithdrawals}</span>
                <span className="badge badge-success text-xs">Approved: {withdrawals.filter(w => w.withdrawStatus === "approved").length}</span>
            </div>

            {/* Mobile */}
            <div className="lg:hidden space-y-3">
                {withdrawals.map((w) => (
                    <TransactionCard key={w.id} item={w} type="withdrawal" onAction={(status) => handleAction(w.id, status)} />
                ))}
            </div>

            {/* Desktop */}
            <div className="hidden lg:block card bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50 shadow-md">
                <div className="overflow-x-auto">
                    <table className="table table-sm">
                        <thead>
                            <tr className="text-xs text-base-content/40 uppercase tracking-wider bg-base-300/50">
                                <th>#ID</th>
                                <th>User</th>
                                <th>Amount</th>
                                <th>Method</th>
                                <th>Wallet</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {withdrawals.map((w) => (
                                <tr key={w.id} className="hover:bg-base-300/30 transition-colors">
                                    <td className="font-mono text-xs text-base-content/30">#{String(w.id).padStart(4, "0")}</td>
                                    <td>
                                        <p className="font-medium text-sm">{w.username}</p>
                                        <p className="text-xs text-base-content/40">Plan {w.plan}</p>
                                    </td>
                                    <td className="font-mono font-bold text-error">-${parseFloat(w.amount).toLocaleString()}</td>
                                    <td className="text-sm">{w.payMethod}</td>
                                    <td className="font-mono text-xs text-base-content/50 max-w-32 truncate">{w.walletAddress}</td>
                                    <td className="text-xs text-base-content/50">{formatDate(w.date_created)}</td>
                                    <td>
                                        <TransactionActions status={w.withdrawStatus} onAction={(s) => handleAction(w.id, s)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}