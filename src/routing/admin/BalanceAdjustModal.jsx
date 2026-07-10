import React, { useState } from 'react'
import { Wallet, Plus, Minus } from 'lucide-react'

export default function BalanceAdjustModal({ balanceEntry, onClose, onSubmit, loading }) {
    const [action, setAction] = useState("plus");
    const [amount, setAmount] = useState("");

    const handleSubmit = () => {
        if (!amount || parseFloat(amount) <= 0) return;
        onSubmit({
            userId: balanceEntry.id,
            amount: amount,
            action: action
        });
    };

    const newBalance = amount && parseFloat(amount) > 0
        ? action === "plus"
            ? parseFloat(balanceEntry.amount) + parseFloat(amount)
            : parseFloat(balanceEntry.amount) - parseFloat(amount)
        : parseFloat(balanceEntry.amount);

    return (
        <dialog className="modal modal-open">
            <div className="modal-box bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50 shadow-xl">
                <h3 className="font-bold text-xl mb-1 flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-primary" />
                    Adjust Balance
                </h3>
                <p className="text-sm text-base-content/60 mb-5">Increase or decrease user balance</p>

                <div className="bg-base-100/50 rounded-xl p-4 mb-5 space-y-2">
                    <div className="flex justify-between">
                        <span className="text-sm text-base-content/60">User</span>
                        <span className="font-semibold">{balanceEntry.username}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-base-content/60">Plan</span>
                        <span className="font-semibold">Plan {balanceEntry.plan}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-base-content/60">Current Balance</span>
                        <span className="font-bold text-lg text-primary">
                            ${parseFloat(balanceEntry.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                    </div>
                </div>

                <div className="form-control mb-4">
                    <label className="label"><span className="label-text font-medium">Action</span></label>
                    <div className="join w-full">
                        <button
                            type="button"
                            className={`join-item btn flex-1 ${action === "plus" ? "btn-success" : "btn-outline"}`}
                            onClick={() => setAction("plus")}
                        >
                            <Plus size={16} /> Increase
                        </button>
                        <button
                            type="button"
                            className={`join-item btn flex-1 ${action === "minus" ? "btn-error" : "btn-outline"}`}
                            onClick={() => setAction("minus")}
                        >
                            <Minus size={16} /> Decrease
                        </button>
                    </div>
                </div>

                <div className="form-control mb-6">
                    <label className="label"><span className="label-text font-medium">Amount ($)</span></label>
                    <input
                        type="number"
                        placeholder="0.00"
                        className="input input-bordered w-full text-lg"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min="0.01"
                        step="0.01"
                    />
                    {amount && parseFloat(amount) > 0 && (
                        <label className="label">
                            <span className="label-text-alt text-base-content/50">
                                New balance: ${newBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                        </label>
                    )}
                    {action === "minus" && amount && parseFloat(amount) > parseFloat(balanceEntry.amount) && (
                        <label className="label"><span className="label-text-alt text-error">Amount exceeds current balance</span></label>
                    )}
                </div>

                <div className="flex gap-3">
                    <button className="btn btn-ghost flex-1" onClick={onClose} type="button">Cancel</button>
                    <button
                        className={`btn flex-1 ${action === "plus" ? "btn-success" : "btn-error"}`}
                        onClick={handleSubmit}
                        disabled={loading || !amount || parseFloat(amount) <= 0 || (action === "minus" && parseFloat(amount) > parseFloat(balanceEntry.amount))}
                        type="button"
                    >
                        {loading ? <span className="loading loading-spinner loading-sm"></span> : action === "plus" ? <Plus size={16} /> : <Minus size={16} />}
                        {action === "plus" ? "Add Funds" : "Deduct Funds"}
                    </button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose} type="button">close</button>
            </form>
        </dialog>
    );
}