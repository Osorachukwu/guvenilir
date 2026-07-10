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
                    <p className="text-lg font-bold text-success font-mono">+${amount.toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex gap-2 text-xs text-base-content/50">
                        {item.plan && <span>Plan: {item.plan}</span>}
                        {item.paymethod && <span>· {item.paymethod.toUpperCase()}</span>}
                    </div>
                    <TransactionActions status={item.payStatus} onAction={onAction} />
                </div>
            </div>
        </div>
    );
};

export default function DepositsTab({ onRefresh }) {
    const [deposits, setDeposits] = useState([])
    const [loading, setLoading] = useState(true)
    const [alert, setAlert] = useState(null)

    useEffect(() => {
        fetchDeposits()
    }, [])

    const fetchDeposits = async () => {
        try {
            setLoading(true)
            const response = await axios.post(`${BASE_URL}/admindata.php`, { domainKey: DOMAIN_KEY })
            if (response.data?.depositList) {
                setDeposits(response.data.depositList)
            }
        } catch (err) {
            console.error("Error fetching deposits:", err)
        } finally {
            setLoading(false)
        }
    }

    const handleAction = async (id, status) => {
        try {
            const response = await axios.post(`${BASE_URL}/action.php`, {
                tid: id,
                action: "deposit",
                whichAction: status,
                domainKey: DOMAIN_KEY
            })
            if (response.status === 200) {
                setAlert({ text: `Deposit ${status} successfully`, type: "success" })
                fetchDeposits()
                onRefresh()
            }
        } catch (err) {
            setAlert({ text: "Failed to process deposit action", type: "error" })
        }
    }

    const pendingDeposits = deposits.filter(d => d.payStatus === "pending").length

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
                <h3 className="font-semibold flex-1">Deposit Requests</h3>
                <span className="badge badge-ghost text-xs">Total: {deposits.length}</span>
                <span className="badge badge-warning text-xs">Pending: {pendingDeposits}</span>
                <span className="badge badge-success text-xs">Approved: {deposits.filter(d => d.payStatus === "approved").length}</span>
            </div>

            {/* Mobile */}
            <div className="lg:hidden space-y-3">
                {deposits.map((d) => (
                    <TransactionCard key={d.id} item={d} type="deposit" onAction={(status) => handleAction(d.id, status)} />
                ))}
            </div>

            {/* Desktop */}
            <div className="hidden lg:block card bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50 shadow-md">
                <div className="overflow-x-auto">
                    <table className="table table-sm">
                        <thead>
                            <tr className="text-xs text-base-content/40 uppercase tracking-wider bg-base-300/50">
                                <th>User</th>
                                <th>Plan</th>
                                <th>Method</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deposits.map((d) => (
                                <tr key={d.id} className="hover:bg-base-300/30 transition-colors">
                                    <td>
                                        <p className="font-medium text-sm">{d.username}</p>
                                        <p className="text-xs text-base-content/40">ID: {d.id}</p>
                                    </td>
                                    <td className="text-sm">Plan {d.plan}</td>
                                    <td className="text-sm">{d.paymethod?.toUpperCase()}</td>
                                    <td className="font-mono font-bold text-success">+${parseFloat(d.amount).toLocaleString()}</td>
                                    <td className="text-xs text-base-content/50">{formatDate(d.date_created)}</td>
                                    <td>
                                        <TransactionActions status={d.payStatus} onAction={(s) => handleAction(d.id, s)} />
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