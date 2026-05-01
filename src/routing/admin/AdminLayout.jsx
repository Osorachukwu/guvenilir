import React, { useState, useEffect } from 'react'
import {
    Home, Users, BanknoteArrowDown, BanknoteArrowUp,
    User, LogOut, PanelLeftOpen, LayoutDashboard, Search,
    X, Check, Clock, AlertTriangle, Settings, Key, Lock, Save, Eye, EyeClosed,
    ArrowUp,
    ArrowDown
} from 'lucide-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import CurrentDate from '../../components/ui/CurrentDate'
import LogoutButton from '../../components/LogoutButton'
import TimedAlert from '../../components/ui/TimedAlert'

// ──────────────────────────────────────────────
// Helper Functions
// ──────────────────────────────────────────────
const getUserName = (userId, users) => {
    const user = users.find(u => u.id === userId);
    return user ? user.fullname || user.name : `User #${userId}`;
};

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    } catch {
        return dateString;
    }
};

// ──────────────────────────────────────────────
// Sub-Components
// ──────────────────────────────────────────────
const StatusBadge = ({ status }) => {
    const config = {
        active: { bg: "badge-success", text: "Active" },
        suspended: { bg: "badge-error", text: "Suspended" },
        approved: { bg: "badge-success", text: "Approved" },
        pending: { bg: "badge-warning", text: "Pending" },
        rejected: { bg: "badge-error", text: "Rejected" },
    };
    const c = config[status] || { bg: "badge-ghost", text: status };
    return <span className={`badge ${c.bg} badge-sm font-medium`}>{c.text}</span>;
};

const TransactionActions = ({ status, onAction }) => {
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
                    onClick={() => onAction("rejected")}
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
};

const TransactionCard = ({ item, userName, type, onAction }) => {
    const isDeposit = type === "deposit";
    const amount = parseFloat(item.amount) || 0;
    return (
        <div className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body p-4">
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <p className="font-semibold text-sm">{userName}</p>
                        <p className="text-xs text-base-content/40">{formatDate(item.date_created)}</p>
                    </div>
                    <p className={`text-lg font-bold mono ${isDeposit ? "text-success" : "text-error"}`}>
                        {isDeposit ? "+" : "-"}${amount.toLocaleString()}
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex gap-2 text-xs text-base-content/50">
                        {item.plan && <span>Plan: {item.plan}</span>}
                        {item.paymethod && <span>· {item.paymethod.toUpperCase()}</span>}
                        {item.payMethod && <span>· {item.payMethod}</span>}
                    </div>
                    <TransactionActions status={item.payStatus || item.withdrawStatus} onAction={onAction} />
                </div>
            </div>
        </div>
    );
};

const UserCard = ({ user, onSuspend }) => (
    <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body p-4">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    {user.fullname?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="flex-1">
                    <p className="font-semibold text-sm">{user.fullname}</p>
                    <p className="text-xs text-base-content/40">@{user.username}</p>
                </div>
                <StatusBadge status={user.userStatus} />
            </div>
            <div className="text-xs text-base-content/50 space-y-1 mb-3">
                <p>{user.email}</p>
                <p>ID: {user.id} · Biz: {user.biz}</p>
                <p>Joined: {formatDate(user.date_created)}</p>
            </div>
            <button
                onClick={() => onSuspend(user)}
                className={`btn btn-xs w-full ${user.userStatus === "suspended" ? "btn-outline btn-success" : "btn-outline btn-error"}`}
                type="button"
            >
                {user.userStatus === "suspended" ? "Unsuspend" : "Suspend User"}
            </button>
        </div>
    </div>
);

// ──────────────────────────────────────────────
// AdminLayout Component
// ──────────────────────────────────────────────
export default function AdminLayout() {
    const [activeTab, setActiveTab] = useState("overview");
    const [search, setSearch] = useState("");
    const [confirmModal, setConfirmModal] = useState(null);
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(true);

    // Dashboard data from backend
    const [dashboardData, setDashboardData] = useState({
        totalUsers: 0,
        totlDeposit: 0,
        totalWithdraw: 0,
        totalSuspend: 0,
        totalAcive: 0,
        activeUsers: [],
        suspendedUsers: [],
        lastFiveDeposit: [],
        lastFiveWithdraw: [],
        userList: [],
        depositList: [],
        withdrawList: []
    });

    // Settings state
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordVisible, setPasswordVisible] = useState({
        old: false,
        new: false,
        confirm: false
    });
    const [saving, setSaving] = useState(false);

    // Fetch dashboard data
    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const response = await axios.post("https://invest.esbatech.org/admindata.php", {
                domainKey: "254342"
            });
            console.log("Dashboard data:", response.data);
            if (response.data) {
                setDashboardData(response.data);
            }
        } catch (err) {
            console.error("Error fetching dashboard:", err);
            setAlert({ text: "Failed to load dashboard data", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    // Computed stats from real data
    const users = dashboardData.userList || [];
    const deposits = dashboardData.depositList || [];
    const withdrawals = dashboardData.withdrawList || [];
    
    const totalDeposited = dashboardData.totlDeposit || deposits.reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0);
    const totalWithdrawn = dashboardData.totalWithdraw || withdrawals.reduce((sum, w) => sum + (parseFloat(w.amount) || 0), 0);
    const pendingDeposits = deposits.filter(d => d.payStatus === "pending").length;
    const pendingWithdrawals = withdrawals.filter(w => w.withdrawStatus === "pending").length;

    // Filtered users
    const filteredUsers = users.filter(u =>
        (u.fullname || '').toLowerCase().includes(search.toLowerCase()) ||
        (u.username || '').toLowerCase().includes(search.toLowerCase()) ||
        (u.email || '').toLowerCase().includes(search.toLowerCase())
    );

    // Action handlers
    const handleDepositAction = (id, status) => {
        console.log(`Deposit ${id} → ${status}`);
        // Backend integration point
    };

    const handleWithdrawalAction = (id, status) => {
        console.log(`Withdrawal ${id} → ${status}`);
        // Backend integration point
    };

    const handleSuspendUser = (user) => {
        console.log(`Toggle suspend for user ${user.id}`);
        setConfirmModal(null);
        // Backend integration point
    };

    // Settings - Change admin password
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    const togglePasswordVisibility = (field) => {
        setPasswordVisible(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const handleUpdatePassword = async () => {
        const username = localStorage.getItem("username");

        if (!passwordData.oldPassword) {
            setAlert({ text: "Current password is required", type: "warning" });
            return;
        }
        if (!passwordData.newPassword) {
            setAlert({ text: "New password is required", type: "warning" });
            return;
        }
        if (passwordData.newPassword.length < 8) {
            setAlert({ text: "Password must be at least 8 characters", type: "warning" });
            return;
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setAlert({ text: "Passwords do not match", type: "warning" });
            return;
        }

        try {
            setSaving(true);
            const response = await axios.post("https://invest.esbatech.org/updateadminpassword.php", {
                username,
                oldPassword: passwordData.oldPassword,
                password: passwordData.newPassword,
                biz: "bank"
            });
            console.log("Password update:", response.data);

            if (response.data.code === "200" || response.data.code === 200) {
                setAlert({ text: "Password updated successfully", type: "success" });
                setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
            } else {
                setAlert({ text: response.data.msg || "Failed to update password", type: "error" });
            }
        } catch (err) {
            console.error("Password update error:", err);
            setAlert({ text: "Failed to update password. Check your connection.", type: "error" });
        } finally {
            setSaving(false);
        }
    };

    // Avatar colors
    const avatarColors = [
        "bg-primary", "bg-success", "bg-warning", "bg-error", "bg-info",
    ];

    const sidebarItems = [
        { id: "overview", label: "Overview", icon: Home },
        { id: "users", label: "Users", icon: Users },
        { id: "deposits", label: "Deposits", icon: BanknoteArrowDown },
        { id: "withdrawals", label: "Withdrawals", icon: BanknoteArrowUp },
    ];

    // Loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="drawer lg:drawer-open text-base-content">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content">
                {/* Alert */}
                {alert && (
                    <TimedAlert
                        text={alert.text}
                        type={alert.type}
                        onClose={() => setAlert(null)}
                    />
                )}

                {/* ────────── Navbar ────────── */}
                <nav className="navbar w-full bg-gradient-to-r from-base-200 to-base-300 border-b border-base-300/50 sticky top-0 z-40 flex justify-between pr-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-sm btn-square btn-ghost lg:hidden">
                            <PanelLeftOpen size={18} />
                        </label>
                        <div className="flex items-center gap-2">
                            <LayoutDashboard className="h-5 w-5 text-primary hidden sm:block" />
                            <h1 className="text-lg font-bold hidden sm:block">Admin Panel</h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <CurrentDate />
                        <div className="divider divider-horizontal mx-0 hidden sm:flex"></div>
                        {/* Opens Settings tab */}
                        <button
                            onClick={() => setActiveTab("settings")}
                            className="hidden sm:flex"
                            title="Settings"
                            type="button"
                        >
                            <div className='flex items-center space-x-2 md:space-x-3 text-sm hover:bg-base-300/50 px-3 py-1.5 rounded-lg transition-colors'>
                                <div className="avatar avatar-online avatar-placeholder">
                                    <div className="bg-primary text-primary-content w-8 rounded-full">
                                        <span className="text-sm font-bold">A</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="font-medium text-sm leading-tight">Admin</p>
                                    <p className="text-xs text-base-content/50 leading-tight">Super Admin</p>
                                </div>
                            </div>
                        </button>
                        <LogoutButton confirmLogout={true} />
                    </div>
                </nav>

                {/* ────────── Main Content ────────── */}
                <main className="flex-1 p-4 lg:p-6 pb-24 lg:pb-6 space-y-6">
                    {/* Page Title */}
                    <div className="flex items-center gap-3">
                        {(() => {
                            const allItems = [...sidebarItems, { id: "settings", label: "Settings", icon: Settings }];
                            const activeItem = allItems.find(item => item.id === activeTab);
                            const IconComp = activeItem?.icon || Home;
                            return (
                                <>
                                    <div className="bg-primary/10 p-2 rounded-xl">
                                        <IconComp className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold">{activeItem?.label || "Overview"}</h2>
                                        <p className="text-xs text-base-content/50">Manage your platform</p>
                                    </div>
                                </>
                            );
                        })()}
                    </div>

                    {/* ────────── OVERVIEW TAB ────────── */}
                    {activeTab === "overview" && (
                        <div className="space-y-6">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                {[
                                    { label: "Total Users", value: dashboardData.totalUsers, sub: `${dashboardData.totalAcive} active`, color: "text-primary", bg: "bg-primary/10", icon: <Users size={20} /> },
                                    { label: "Total Deposited", value: `$${totalDeposited.toLocaleString()}`, sub: `${pendingDeposits} pending`, color: "text-success", bg: "bg-success/10", icon: <ArrowUp size={20} /> },
                                    { label: "Total Withdrawn", value: `$${totalWithdrawn.toLocaleString()}`, sub: `${pendingWithdrawals} pending`, color: "text-warning", bg: "bg-warning/10", icon: <ArrowDown size={20} /> },
                                    { label: "Suspended", value: dashboardData.totalSuspend, sub: "accounts", color: "text-error", bg: "bg-error/10", icon: "⛔" },
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
                    )}

                    {/* ────────── USERS TAB ────────── */}
                    {activeTab === "users" && (
                        <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                <p className="text-sm text-base-content/50 flex-1">{filteredUsers.length} of {users.length} users</p>
                                <label className="input input-bordered input-sm flex items-center gap-2 w-full sm:w-64">
                                    <Search className="w-3.5 h-3.5 opacity-40 shrink-0" />
                                    <input
                                        type="text"
                                        placeholder="Search by name, email, username…"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="grow text-sm"
                                    />
                                </label>
                            </div>

                            {/* Mobile: User Cards */}
                            <div className="lg:hidden space-y-3">
                                {filteredUsers.length === 0 ? (
                                    <div className="text-center py-12 text-base-content/30 text-sm">No users found</div>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <UserCard key={user.id} user={user} onSuspend={(u) => setConfirmModal({ user: u })} />
                                    ))
                                )}
                            </div>

                            {/* Desktop: Users Table */}
                            <div className="hidden lg:block card bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50 shadow-md">
                                <div className="overflow-x-auto">
                                    <table className="table table-sm">
                                        <thead>
                                            <tr className="text-xs text-base-content/40 uppercase tracking-wider bg-base-300/50">
                                                <th>User</th>
                                                <th>Username</th>
                                                <th>Email</th>
                                                <th>Biz</th>
                                                <th>Joined</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredUsers.map((user, i) => (
                                                <tr key={user.id} className="hover:bg-base-300/30 transition-colors">
                                                    <td>
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-9 h-9 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                                                                {user.fullname?.charAt(0)?.toUpperCase() || 'U'}
                                                            </div>
                                                            <p className="font-medium text-sm">{user.fullname}</p>
                                                        </div>
                                                    </td>
                                                    <td className="font-mono text-sm text-base-content/60">@{user.username}</td>
                                                    <td className="text-sm text-base-content/50">{user.email}</td>
                                                    <td className="text-sm">{user.biz}</td>
                                                    <td className="text-xs text-base-content/50">{formatDate(user.date_created)}</td>
                                                    <td><StatusBadge status={user.userStatus} /></td>
                                                    <td>
                                                        <button
                                                            onClick={() => setConfirmModal({ user })}
                                                            className={`btn btn-xs ${user.userStatus === "suspended" ? "btn-outline btn-success" : "btn-outline btn-error"}`}
                                                            type="button"
                                                        >
                                                            {user.userStatus === "suspended" ? "Unsuspend" : "Suspend"}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ────────── DEPOSITS TAB ────────── */}
                    {activeTab === "deposits" && (
                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-2">
                                <h3 className="font-semibold flex-1">Deposit Requests</h3>
                                <span className="badge badge-ghost text-xs">Total: {deposits.length}</span>
                                <span className="badge badge-warning text-xs">Pending: {pendingDeposits}</span>
                                <span className="badge badge-success text-xs">Approved: {deposits.filter(d => d.payStatus === "approved").length}</span>
                            </div>

                            {/* Mobile */}
                            <div className="lg:hidden space-y-3">
                                {deposits.map((d) => (
                                    <TransactionCard
                                        key={d.id}
                                        item={d}
                                        userName={d.username}
                                        type="deposit"
                                        onAction={(status) => handleDepositAction(d.id, status)}
                                    />
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
                                                        <TransactionActions status={d.payStatus} onAction={(s) => handleDepositAction(d.id, s)} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ────────── WITHDRAWALS TAB ────────── */}
                    {activeTab === "withdrawals" && (
                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-2">
                                <h3 className="font-semibold flex-1">Withdrawal Requests</h3>
                                <span className="badge badge-ghost text-xs">Total: {withdrawals.length}</span>
                                <span className="badge badge-warning text-xs">Pending: {pendingWithdrawals}</span>
                                <span className="badge badge-success text-xs">Approved: {withdrawals.filter(w => w.withdrawStatus === "approved").length}</span>
                            </div>

                            {/* Mobile */}
                            <div className="lg:hidden space-y-3">
                                {withdrawals.map((w) => (
                                    <TransactionCard
                                        key={w.id}
                                        item={w}
                                        userName={w.username}
                                        type="withdrawal"
                                        onAction={(status) => handleWithdrawalAction(w.id, status)}
                                    />
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
                                                        <TransactionActions status={w.withdrawStatus} onAction={(s) => handleWithdrawalAction(w.id, s)} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ────────── SETTINGS TAB ────────── */}
                    {activeTab === "settings" && (
                        <div className="max-w-2xl space-y-6">
                            {/* Change Password */}
                            <div className="card bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50 shadow-lg">
                                <div className="card-body p-6">
                                    <div className="flex items-center gap-2 mb-6">
                                        <div className="bg-primary/10 p-2 rounded-xl">
                                            <Lock className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold">Change Admin Password</h3>
                                            <p className="text-xs text-base-content/50">Update your admin account password</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {/* Old Password */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-medium">Current Password</span>
                                            </label>
                                            <label className="input input-bordered flex items-center gap-2 w-full">
                                                <button type="button" onClick={() => togglePasswordVisibility('old')} className="text-base-content/50">
                                                    {passwordVisible.old ? <Eye size={16} /> : <EyeClosed size={16} />}
                                                </button>
                                                <input
                                                    type={passwordVisible.old ? "text" : "password"}
                                                    name="oldPassword"
                                                    value={passwordData.oldPassword}
                                                    onChange={handlePasswordChange}
                                                    className="grow"
                                                    placeholder="Enter current password"
                                                />
                                            </label>
                                        </div>

                                        {/* New Password */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-medium">New Password</span>
                                            </label>
                                            <label className="input input-bordered flex items-center gap-2 w-full">
                                                <button type="button" onClick={() => togglePasswordVisibility('new')} className="text-base-content/50">
                                                    {passwordVisible.new ? <Eye size={16} /> : <EyeClosed size={16} />}
                                                </button>
                                                <input
                                                    type={passwordVisible.new ? "text" : "password"}
                                                    name="newPassword"
                                                    value={passwordData.newPassword}
                                                    onChange={handlePasswordChange}
                                                    className="grow"
                                                    placeholder="Enter new password"
                                                />
                                            </label>
                                        </div>

                                        {/* Confirm Password */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-medium">Confirm New Password</span>
                                            </label>
                                            <label className="input input-bordered flex items-center gap-2 w-full">
                                                <button type="button" onClick={() => togglePasswordVisibility('confirm')} className="text-base-content/50">
                                                    {passwordVisible.confirm ? <Eye size={16} /> : <EyeClosed size={16} />}
                                                </button>
                                                <input
                                                    type={passwordVisible.confirm ? "text" : "password"}
                                                    name="confirmPassword"
                                                    value={passwordData.confirmPassword}
                                                    onChange={handlePasswordChange}
                                                    className="grow"
                                                    placeholder="Confirm new password"
                                                />
                                            </label>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={handleUpdatePassword}
                                            disabled={saving}
                                            className="btn btn-primary w-full mt-2"
                                        >
                                            {saving ? (
                                                <span className="loading loading-spinner loading-sm"></span>
                                            ) : (
                                                <Save className="h-4 w-4" />
                                            )}
                                            Update Password
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Future settings can go here */}
                            <div className="card bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50 shadow-lg">
                                <div className="card-body p-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Settings className="h-5 w-5 text-primary" />
                                        <h3 className="text-lg font-bold">More Settings</h3>
                                    </div>
                                    <p className="text-sm text-base-content/50">
                                        Additional admin settings will be added here in future updates.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>

            {/* ────────── Sidebar ────────── */}
            <div className="drawer-side z-50">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col bg-gradient-to-b from-base-200 to-base-300 border-r border-base-300/50 shadow-xl w-64">
                    {/* Sidebar Header */}
                    <div className="flex items-center gap-3 px-5 py-5 border-b border-base-300/50">
                        <div className="bg-primary/10 p-2 rounded-xl">
                            <LayoutDashboard className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <p className="font-bold text-lg leading-tight">Admin</p>
                            <p className="text-xs text-base-content/50 leading-tight">Management Panel</p>
                        </div>
                    </div>

                    {/* Navigation Items */}
                    <ul className="menu flex-1 px-3 py-4 gap-1">
                        {sidebarItems.map((item) => {
                            const IconComp = item.icon;
                            const isActive = activeTab === item.id;

                            return (
                                <li key={item.id}>
                                    <button
                                        onClick={() => setActiveTab(item.id)}
                                        className={`
                                            flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium w-full
                                            transition-all duration-200
                                            ${isActive
                                                ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm'
                                                : 'hover:bg-base-300/50 text-base-content/70'
                                            }
                                        `}
                                        type="button"
                                    >
                                        <IconComp size={18} className={isActive ? 'text-primary' : 'text-base-content/50'} />
                                        <span>{item.label}</span>
                                        {isActive && (
                                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"></span>
                                        )}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Bottom Section */}
                    <div className="px-3 py-4 border-t border-base-300/50 space-y-2">
                        <button
                            onClick={() => setActiveTab("settings")}
                            className={`
                                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium w-full
                                transition-all duration-200
                                ${activeTab === "settings"
                                    ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm'
                                    : 'text-base-content/70 hover:bg-base-300/50'
                                }
                            `}
                            type="button"
                        >
                            <Settings size={18} className={activeTab === "settings" ? 'text-primary' : 'text-base-content/50'} />
                            <span>Settings</span>
                            {activeTab === "settings" && (
                                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"></span>
                            )}
                        </button>
                        <LogoutButton confirmLogout={true} />
                    </div>
                </div>
            </div>

            {/* ────────── Confirm Modal ────────── */}
            {confirmModal && (
                <dialog className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Confirm Action</h3>
                        <p className="py-4">
                            Are you sure you want to {confirmModal.user.userStatus === "suspended" ? "unsuspend" : "suspend"} <strong>{confirmModal.user.fullname}</strong>?
                        </p>
                        <div className="modal-action">
                            <button
                                className="btn btn-ghost"
                                onClick={() => setConfirmModal(null)}
                                type="button"
                            >
                                Cancel
                            </button>
                            <button
                                className={`btn ${confirmModal.user.userStatus === "suspended" ? "btn-success" : "btn-error"}`}
                                onClick={() => handleSuspendUser(confirmModal.user)}
                                type="button"
                            >
                                {confirmModal.user.userStatus === "suspended" ? "Unsuspend" : "Suspend"}
                            </button>
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button onClick={() => setConfirmModal(null)} type="button">close</button>
                    </form>
                </dialog>
            )}
        </div>
    )
}