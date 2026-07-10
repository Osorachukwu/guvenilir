import React from 'react'
import { Check, X } from 'lucide-react'
import StatusBadge from './StatusBadge'

export default function TransactionActions({ status, onAction }) {
    if (status === "pending") {
        return (
            <div className="flex gap-1">
                <button
                    onClick={() => onAction("approved")}
                    className="btn btn-xs btn-success btn-outline"
                    title="Approve"
                    type="button"
                >
                    <Check size={12} />
                </button>
                <button
                    onClick={() => onAction("cancelled")}
                    className="btn btn-xs btn-error btn-outline"
                    title="Reject"
                    type="button"
                >
                    <X size={12} />
                </button>
            </div>
        );
    }
    return <StatusBadge status={status} />;
}