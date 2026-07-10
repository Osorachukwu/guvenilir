import React, { useState, useEffect } from 'react'
import { Search, Wallet, RefreshCw } from 'lucide-react'
import axios from 'axios'
import { BASE_URL, DOMAIN_KEY } from '../../utils/constants'
import BalanceAdjustModal from './BalanceAdjustModal'
import TimedAlert from '../../components/ui/TimedAlert'

export default function BalancesTab() {
    const [balanceData, setBalanceData] = useState([])
    const [balanceLoading, setBalanceLoading] = useState(false)
    const [adjustModal, setAdjustModal] = useState(null)
    const [adjustLoading, setAdjustLoading] = useState(false)
    const [balanceSearch, setBalanceSearch] = useState("")
    const [alert, setAlert] = useState(null)

    useEffect(() => {
        fetchBalanceData()
    }, [])

    const fetchBalanceData = async () => {
        try {
            setBalanceLoading(true)
            const response = await axios.post(`${BASE_URL}/getbalance.php`, { domainKey: DOMAIN_KEY })
            if (response.data && Array.isArray(response.data.msg)) {
                setBalanceData(response.data.msg)
            } else if (Array.isArray(response.data)) {
                setBalanceData(response.data)
            } else {
                setBalanceData([])
            }
        } catch (err) {
            console.error("Error fetching balances:", err)
            setAlert({ text: "Failed to load balance data", type: "error" })
        } finally {
            setBalanceLoading(false)
        }
    }

    const handleAdjustSubmit = async (adjustData) => {
        try {
            setAdjustLoading(true)
            const response = await axios.post(`${BASE_URL}/adjustbalance.php`, {
                userId: adjustData.userId,
                amount: adjustData.amount,
                action: adjustData.action
            })
            if (response.data.code === "200") {
                setAlert({ text: "Balance adjusted successfully!", type: "success" })
                setAdjustModal(null)
                fetchBalanceData()
            } else {
                setAlert({ text: response.data.msg || "Failed to adjust balance", type: "error" })
            }
        } catch (err) {
            setAlert({ text: "Failed to adjust balance. Please try again.", type: "error" })
        } finally {
            setAdjustLoading(false)
        }
    }

    const filteredBalances = balanceData.filter(b =>
        (b.username || '').toLowerCase().includes(balanceSearch.toLowerCase())
    )

    return (
        <div className="space-y-4">
            {alert && <TimedAlert text={alert.text} type={alert.type} onClose={() => setAlert(null)} />}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">User Balances</h3>
                    <span className="badge badge-ghost text-xs">Total: {balanceData.length}</span>
                </div>
                <div className="flex items-center gap-2">
                    <label className="input input-bordered input-sm flex items-center gap-2 w-full sm:w-64">
                        <Search className="w-3.5 h-3.5 opacity-40 shrink-0" />
                        <input type="text" placeholder="Search by username…" value={balanceSearch} onChange={(e) => setBalanceSearch(e.target.value)} className="grow text-sm" />
                    </label>
                    <button onClick={fetchBalanceData} className="btn btn-ghost btn-sm btn-square" title="Refresh" type="button">
                        <RefreshCw size={16} className={balanceLoading ? "animate-spin" : ""} />
                    </button>
                </div>
            </div>

            {balanceLoading && (
                <div className="flex items-center justify-center py-12">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            )}

            {!balanceLoading && (
                <>
                    {/* Mobile */}
                    <div className="lg:hidden space-y-3">
                        {filteredBalances.length === 0 ? (
                            <div className="text-center py-12 text-base-content/30 text-sm">No balances found</div>
                        ) : (
                            filteredBalances.map((balance) => (
                                <div key={balance.id} className="card bg-base-100 border border-base-300 shadow-sm">
                                    <div className="card-body p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <p className="font-semibold text-sm">{balance.username}</p>
                                                <p className="text-xs text-base-content/40">Plan {balance.plan}</p>
                                            </div>
                                            <p className="text-xl font-bold text-primary">
                                                ${parseFloat(balance.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </p>
                                        </div>
                                        <button onClick={() => setAdjustModal(balance)} className="btn btn-sm btn-outline w-full" type="button">
                                            <Wallet size={14} /> Adjust Balance
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Desktop */}
                    <div className="hidden lg:block card bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50 shadow-md">
                        <div className="overflow-x-auto">
                            <table className="table table-sm">
                                <thead>
                                    <tr className="text-xs text-base-content/40 uppercase tracking-wider bg-base-300/50">
                                        <th>#ID</th>
                                        <th>Username</th>
                                        <th>Plan</th>
                                        <th>Balance</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredBalances.map((balance) => (
                                        <tr key={balance.id} className="hover:bg-base-300/30 transition-colors">
                                            <td className="font-mono text-xs text-base-content/30">#{String(balance.id).padStart(4, "0")}</td>
                                            <td className="font-medium text-sm">{balance.username}</td>
                                            <td className="text-sm">Plan {balance.plan}</td>
                                            <td className="font-mono font-bold text-primary">
                                                ${parseFloat(balance.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </td>
                                            <td>
                                                <button onClick={() => setAdjustModal(balance)} className="btn btn-xs btn-outline" type="button">
                                                    <Wallet size={12} /> Adjust
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredBalances.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="text-center py-8 text-base-content/40 text-sm">No balances found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

            {adjustModal && (
                <BalanceAdjustModal
                    balanceEntry={adjustModal}
                    onClose={() => setAdjustModal(null)}
                    onSubmit={handleAdjustSubmit}
                    loading={adjustLoading}
                />
            )}
        </div>
    )
}