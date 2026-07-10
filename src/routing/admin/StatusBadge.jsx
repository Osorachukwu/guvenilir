import React from 'react'

export default function StatusBadge({ status }) {
    const config = {
        active: { bg: "badge-success", text: "Active" },
        suspended: { bg: "badge-error", text: "Suspended" },
        approved: { bg: "badge-success", text: "Approved" },
        pending: { bg: "badge-warning", text: "Pending" },
        rejected: { bg: "badge-error", text: "Rejected" },
    };
    const c = config[status] || { bg: "badge-error", text: status };
    return <span className={`badge ${c.bg} badge-sm font-medium`}>{c.text}</span>;
}