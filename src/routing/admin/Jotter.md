import { useState } from "react";

const mockUsers = [
  {
    id: 1,
    name: "Alexandra Rivers",
    email: "alex.rivers@email.com",
    username: "alexrivers",
    location: "New York, US",
    ip: "192.168.1.45",
    status: "active",
    joined: "2024-01-15",
    avatar: "AR",
  },
  {
    id: 2,
    name: "Marcus Chen",
    email: "m.chen@email.com",
    username: "mchen_dev",
    location: "Tokyo, JP",
    ip: "10.0.0.12",
    status: "active",
    joined: "2024-02-03",
    avatar: "MC",
  },
  {
    id: 3,
    name: "Sophia Okafor",
    email: "s.okafor@email.com",
    username: "sophiaokafor",
    location: "Lagos, NG",
    ip: "172.16.0.7",
    status: "suspended",
    joined: "2024-03-20",
    avatar: "SO",
  },
  {
    id: 4,
    name: "Dmitri Volkov",
    email: "d.volkov@email.com",
    username: "dvolkov99",
    location: "Moscow, RU",
    ip: "10.10.5.22",
    status: "active",
    joined: "2024-04-11",
    avatar: "DV",
  },
  {
    id: 5,
    name: "Priya Nair",
    email: "priya.nair@email.com",
    username: "priyanair",
    location: "Mumbai, IN",
    ip: "192.168.99.1",
    status: "active",
    joined: "2024-05-08",
    avatar: "PN",
  },
];

const mockDeposits = [
  { id: 1, userId: 1, amount: 2500.0, date: "2025-02-10", status: "pending" },
  { id: 2, userId: 2, amount: 800.5, date: "2025-02-12", status: "approved" },
  { id: 3, userId: 4, amount: 15000.0, date: "2025-02-14", status: "pending" },
  { id: 4, userId: 5, amount: 320.75, date: "2025-02-18", status: "cancelled" },
  { id: 5, userId: 1, amount: 5000.0, date: "2025-02-20", status: "approved" },
  { id: 6, userId: 3, amount: 1200.0, date: "2025-02-22", status: "pending" },
];

const mockWithdrawals = [
  { id: 1, userId: 2, amount: 450.0, date: "2025-02-11", status: "approved" },
  { id: 2, userId: 1, amount: 1200.0, date: "2025-02-13", status: "pending" },
  { id: 3, userId: 5, amount: 200.0, date: "2025-02-15", status: "pending" },
  { id: 4, userId: 4, amount: 8000.0, date: "2025-02-19", status: "cancelled" },
  { id: 5, userId: 3, amount: 600.0, date: "2025-02-21", status: "pending" },
];

const avatarColors = [
  "bg-violet-500",
  "bg-cyan-500",
  "bg-emerald-500",
  "bg-rose-500",
  "bg-amber-500",
];

const StatusBadge = ({ status }) => {
  const map = {
    active: "badge-success",
    suspended: "badge-error",
    pending: "badge-warning",
    approved: "badge-success",
    cancelled: "badge-error",
  };
  return (
    <span className={`badge badge-sm font-semibold uppercase tracking-wide ${map[status] || "badge-ghost"}`}>
      {status}
    </span>
  );
};

const TransactionActions = ({ status, onAction }) => {
  if (status !== "pending") return <StatusBadge status={status} />;
  return (
    <div className="flex gap-1">
      <button onClick={() => onAction("approved")} className="btn btn-xs btn-success text-white">Approve</button>
      <button onClick={() => onAction("cancelled")} className="btn btn-xs btn-error text-white">Cancel</button>
    </div>
  );
};

const navItems = [
  { id: "overview", label: "Overview", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { id: "users", label: "Users", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { id: "deposits", label: "Deposits", icon: "M12 4v16m8-8H4" },
  { id: "withdrawals", label: "Withdrawals", icon: "M20 12H4" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState(mockUsers);
  const [deposits, setDeposits] = useState(mockDeposits);
  const [withdrawals, setWithdrawals] = useState(mockWithdrawals);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [confirmModal, setConfirmModal] = useState(null);

  const getUserName = (id) => users.find((u) => u.id === id)?.name || "Unknown";

  const handleDepositAction = (id, status) => {
    setDeposits((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
  };

  const handleWithdrawalAction = (id, status) => {
    setWithdrawals((prev) => prev.map((w) => (w.id === id ? { ...w, status } : w)));
  };

  const handleSuspend = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "suspended" ? "active" : "suspended" } : u
      )
    );
    setConfirmModal(null);
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase())
  );

  const totalDeposited = deposits.filter((d) => d.status === "approved").reduce((s, d) => s + d.amount, 0);
  const totalWithdrawn = withdrawals.filter((w) => w.status === "approved").reduce((s, w) => s + w.amount, 0);
  const pendingDeposits = deposits.filter((d) => d.status === "pending").length;
  const pendingWithdrawals = withdrawals.filter((w) => w.status === "pending").length;

  return (
    <div className="min-h-screen bg-base-200 font-sans flex" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .mono { font-family: 'DM Mono', monospace; }
        .sidebar-item { transition: all 0.15s ease; }
        .sidebar-item:hover { transform: translateX(3px); }
        .stat-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .stat-card:hover { transform: translateY(-2px); }
        .table-row-hover:hover { background: oklch(var(--b3)); }
      `}</style>

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-64" : "w-16"} bg-base-100 border-r border-base-300 flex flex-col transition-all duration-300 fixed h-full z-20`}>
        <div className="flex items-center gap-3 px-4 py-5 border-b border-base-300">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-primary-content" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          {sidebarOpen && <span className="font-bold text-lg tracking-tight">AdminPanel</span>}
        </div>

        <nav className="flex-1 py-4 px-2 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`sidebar-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? "bg-primary text-primary-content"
                  : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
              }`}
            >
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              {sidebarOpen && <span>{item.label}</span>}
              {sidebarOpen && item.id === "deposits" && pendingDeposits > 0 && (
                <span className="ml-auto badge badge-warning badge-sm">{pendingDeposits}</span>
              )}
              {sidebarOpen && item.id === "withdrawals" && pendingWithdrawals > 0 && (
                <span className="ml-auto badge badge-warning badge-sm">{pendingWithdrawals}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="px-2 py-4 border-t border-base-300">
          <div className={`flex items-center gap-3 px-3 py-2 rounded-lg bg-base-200`}>
            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">A</div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate">Super Admin</p>
                <p className="text-xs text-base-content/50 truncate">admin@panel.com</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className={`flex-1 ${sidebarOpen ? "ml-64" : "ml-16"} transition-all duration-300`}>
        {/* Top bar */}
        <header className="bg-base-100 border-b border-base-300 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="btn btn-ghost btn-sm btn-square">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-bold leading-tight capitalize">{activeTab}</h1>
              <p className="text-xs text-base-content/50">
                {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="indicator">
              <span className="indicator-item badge badge-error badge-xs"></span>
              <button className="btn btn-ghost btn-sm btn-square">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">

          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Users", value: users.length, sub: `${users.filter(u => u.status === "active").length} active`, color: "text-primary", bg: "bg-primary/10" },
                  { label: "Total Deposited", value: `$${totalDeposited.toLocaleString()}`, sub: `${pendingDeposits} pending`, color: "text-success", bg: "bg-success/10" },
                  { label: "Total Withdrawn", value: `$${totalWithdrawn.toLocaleString()}`, sub: `${pendingWithdrawals} pending`, color: "text-warning", bg: "bg-warning/10" },
                  { label: "Suspended", value: users.filter(u => u.status === "suspended").length, sub: "accounts", color: "text-error", bg: "bg-error/10" },
                ].map((stat) => (
                  <div key={stat.label} className="stat-card card bg-base-100 border border-base-300">
                    <div className="card-body p-5">
                      <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                        <span className={`text-lg font-bold ${stat.color}`}>
                          {typeof stat.value === "number" ? stat.value : stat.value[0]}
                        </span>
                      </div>
                      <p className="text-2xl font-bold mono">{stat.value}</p>
                      <p className="text-xs text-base-content/50 mt-0.5">{stat.label}</p>
                      <p className="text-xs text-base-content/40">{stat.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-4">
                <div className="card bg-base-100 border border-base-300">
                  <div className="card-body p-0">
                    <div className="px-5 py-4 border-b border-base-300 flex items-center justify-between">
                      <h2 className="font-semibold">Recent Deposits</h2>
                      <button onClick={() => setActiveTab("deposits")} className="btn btn-ghost btn-xs">View all →</button>
                    </div>
                    <div className="divide-y divide-base-200">
                      {deposits.slice(0, 4).map((d) => (
                        <div key={d.id} className="flex items-center justify-between px-5 py-3">
                          <div>
                            <p className="text-sm font-medium">{getUserName(d.userId)}</p>
                            <p className="text-xs text-base-content/50 mono">{d.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold mono text-success">+${d.amount.toLocaleString()}</p>
                            <StatusBadge status={d.status} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="card bg-base-100 border border-base-300">
                  <div className="card-body p-0">
                    <div className="px-5 py-4 border-b border-base-300 flex items-center justify-between">
                      <h2 className="font-semibold">Recent Withdrawals</h2>
                      <button onClick={() => setActiveTab("withdrawals")} className="btn btn-ghost btn-xs">View all →</button>
                    </div>
                    <div className="divide-y divide-base-200">
                      {withdrawals.slice(0, 4).map((w) => (
                        <div key={w.id} className="flex items-center justify-between px-5 py-3">
                          <div>
                            <p className="text-sm font-medium">{getUserName(w.userId)}</p>
                            <p className="text-xs text-base-content/50 mono">{w.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold mono text-error">-${w.amount.toLocaleString()}</p>
                            <StatusBadge status={w.status} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* USERS */}
          {activeTab === "users" && (
            <div className="card bg-base-100 border border-base-300">
              <div className="card-body p-0">
                <div className="px-5 py-4 border-b border-base-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="font-semibold">Registered Users</h2>
                    <p className="text-xs text-base-content/50">{filteredUsers.length} users found</p>
                  </div>
                  <label className="input input-bordered input-sm flex items-center gap-2 w-full sm:w-64">
                    <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="grow"
                    />
                  </label>
                </div>
                <div className="overflow-x-auto">
                  <table className="table table-sm">
                    <thead>
                      <tr className="text-xs text-base-content/50 uppercase tracking-wider">
                        <th>User</th>
                        <th>Username</th>
                        <th>Location</th>
                        <th>IP Address</th>
                        <th>Joined</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user, i) => (
                        <tr key={user.id} className="table-row-hover">
                          <td>
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                                {user.avatar}
                              </div>
                              <div>
                                <p className="font-medium text-sm">{user.name}</p>
                                <p className="text-xs text-base-content/50">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="mono text-sm text-base-content/70">@{user.username}</td>
                          <td>
                            <div className="flex items-center gap-1 text-sm">
                              <svg className="w-3 h-3 text-base-content/40 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                              </svg>
                              {user.location}
                            </div>
                          </td>
                          <td className="mono text-xs text-base-content/60">{user.ip}</td>
                          <td className="text-xs text-base-content/60">{user.joined}</td>
                          <td><StatusBadge status={user.status} /></td>
                          <td>
                            <button
                              onClick={() => setConfirmModal({ type: "suspend", user })}
                              className={`btn btn-xs ${user.status === "suspended" ? "btn-outline btn-success" : "btn-outline btn-error"}`}
                            >
                              {user.status === "suspended" ? "Unsuspend" : "Suspend"}
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

          {/* DEPOSITS */}
          {activeTab === "deposits" && (
            <div className="card bg-base-100 border border-base-300">
              <div className="card-body p-0">
                <div className="px-5 py-4 border-b border-base-300 flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold">Deposit Requests</h2>
                    <p className="text-xs text-base-content/50">{deposits.length} total · {pendingDeposits} pending</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="badge badge-success gap-1"><span className="w-1.5 h-1.5 rounded-full bg-success-content"></span>Approved: {deposits.filter(d => d.status === "approved").length}</span>
                    <span className="badge badge-warning gap-1"><span className="w-1.5 h-1.5 rounded-full bg-warning-content"></span>Pending: {pendingDeposits}</span>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="table table-sm">
                    <thead>
                      <tr className="text-xs text-base-content/50 uppercase tracking-wider">
                        <th>#ID</th>
                        <th>User</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Status / Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deposits.map((d) => {
                        const user = users.find((u) => u.id === d.userId);
                        return (
                          <tr key={d.id} className="table-row-hover">
                            <td className="mono text-xs text-base-content/40">#{String(d.id).padStart(4, "0")}</td>
                            <td>
                              <div>
                                <p className="font-medium text-sm">{user?.name}</p>
                                <p className="text-xs text-base-content/50">@{user?.username}</p>
                              </div>
                            </td>
                            <td className="mono font-bold text-success">+${d.amount.toLocaleString()}</td>
                            <td className="text-xs text-base-content/60">{d.date}</td>
                            <td>
                              <TransactionActions status={d.status} onAction={(s) => handleDepositAction(d.id, s)} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* WITHDRAWALS */}
          {activeTab === "withdrawals" && (
            <div className="card bg-base-100 border border-base-300">
              <div className="card-body p-0">
                <div className="px-5 py-4 border-b border-base-300 flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold">Withdrawal Requests</h2>
                    <p className="text-xs text-base-content/50">{withdrawals.length} total · {pendingWithdrawals} pending</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="badge badge-success gap-1"><span className="w-1.5 h-1.5 rounded-full bg-success-content"></span>Approved: {withdrawals.filter(w => w.status === "approved").length}</span>
                    <span className="badge badge-warning gap-1"><span className="w-1.5 h-1.5 rounded-full bg-warning-content"></span>Pending: {pendingWithdrawals}</span>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="table table-sm">
                    <thead>
                      <tr className="text-xs text-base-content/50 uppercase tracking-wider">
                        <th>#ID</th>
                        <th>User</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Status / Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {withdrawals.map((w) => {
                        const user = users.find((u) => u.id === w.userId);
                        return (
                          <tr key={w.id} className="table-row-hover">
                            <td className="mono text-xs text-base-content/40">#{String(w.id).padStart(4, "0")}</td>
                            <td>
                              <div>
                                <p className="font-medium text-sm">{user?.name}</p>
                                <p className="text-xs text-base-content/50">@{user?.username}</p>
                              </div>
                            </td>
                            <td className="mono font-bold text-error">-${w.amount.toLocaleString()}</td>
                            <td className="text-xs text-base-content/60">{w.date}</td>
                            <td>
                              <TransactionActions status={w.status} onAction={(s) => handleWithdrawalAction(w.id, s)} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Confirm Modal */}
      {confirmModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-sm">
            <h3 className="font-bold text-lg">
              {confirmModal.user.status === "suspended" ? "Unsuspend User?" : "Suspend User?"}
            </h3>
            <p className="py-4 text-sm text-base-content/70">
              {confirmModal.user.status === "suspended"
                ? `This will restore access for `
                : `This will revoke access for `}
              <strong>{confirmModal.user.name}</strong>. Are you sure?
            </p>
            <div className="modal-action">
              <button onClick={() => setConfirmModal(null)} className="btn btn-ghost btn-sm">Cancel</button>
              <button
                onClick={() => handleSuspend(confirmModal.user.id)}
                className={`btn btn-sm ${confirmModal.user.status === "suspended" ? "btn-success" : "btn-error"} text-white`}
              >
                {confirmModal.user.status === "suspended" ? "Yes, Unsuspend" : "Yes, Suspend"}
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setConfirmModal(null)}></div>
        </div>
      )}
    </div>
  );
}