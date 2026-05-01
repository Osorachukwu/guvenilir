import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const mockUsers = [
  { id: 1, name: "Alexandra Rivers", email: "alex.rivers@email.com", username: "alexrivers", location: "New York, US", ip: "192.168.1.45", status: "active", joined: "2024-01-15", avatar: "AR" },
  { id: 2, name: "Marcus Chen", email: "m.chen@email.com", username: "mchen_dev", location: "Tokyo, JP", ip: "10.0.0.12", status: "active", joined: "2024-02-03", avatar: "MC" },
  { id: 3, name: "Sophia Okafor", email: "s.okafor@email.com", username: "sophiaokafor", location: "Lagos, NG", ip: "172.16.0.7", status: "suspended", joined: "2024-03-20", avatar: "SO" },
  { id: 4, name: "Dmitri Volkov", email: "d.volkov@email.com", username: "dvolkov99", location: "Moscow, RU", ip: "10.10.5.22", status: "active", joined: "2024-04-11", avatar: "DV" },
  { id: 5, name: "Priya Nair", email: "priya.nair@email.com", username: "priyanair", location: "Mumbai, IN", ip: "192.168.99.1", status: "active", joined: "2024-05-08", avatar: "PN" },
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

const avatarColors = ["bg-violet-500", "bg-cyan-500", "bg-emerald-500", "bg-rose-500", "bg-amber-500"];

const StatusBadge = ({ status }) => {
  const map = { active: "badge-success", suspended: "badge-error", pending: "badge-warning", approved: "badge-success", cancelled: "badge-error" };
  return <span className={`badge badge-sm font-semibold uppercase tracking-wide ${map[status] || "badge-ghost"}`}>{status}</span>;
};

const TransactionActions = ({ status, onAction }) => {
  if (status !== "pending") return <StatusBadge status={status} />;
  return (
    <div className="flex gap-1 flex-wrap">
      <button onClick={() => onAction("approved")} className="btn btn-xs btn-success text-white">Approve</button>
      <button onClick={() => onAction("cancelled")} className="btn btn-xs btn-error text-white">Cancel</button>
    </div>
  );
};

const UserCard = ({ user, index, onSuspend }) => (
  <div className="card bg-base-100 border border-base-300 shadow-sm">
    <div className="card-body p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className={`w-10 h-10 rounded-full ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
            {user.avatar}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm truncate">{user.name}</p>
            <p className="text-xs text-base-content/50 truncate">{user.email}</p>
            <p className="text-xs text-base-content/40 font-mono">@{user.username}</p>
          </div>
        </div>
        <StatusBadge status={user.status} />
      </div>
      <div className="divider my-2"></div>
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <p className="text-base-content/40 uppercase tracking-wide text-[10px] font-semibold mb-0.5">Location</p>
          <p className="text-base-content/70">{user.location}</p>
        </div>
        <div>
          <p className="text-base-content/40 uppercase tracking-wide text-[10px] font-semibold mb-0.5">IP Address</p>
          <p className="font-mono text-base-content/70">{user.ip}</p>
        </div>
        <div>
          <p className="text-base-content/40 uppercase tracking-wide text-[10px] font-semibold mb-0.5">Joined</p>
          <p className="text-base-content/70">{user.joined}</p>
        </div>
        <div className="flex items-end justify-end">
          <button
            onClick={() => onSuspend(user)}
            className={`btn btn-xs ${user.status === "suspended" ? "btn-outline btn-success" : "btn-outline btn-error"}`}
          >
            {user.status === "suspended" ? "Unsuspend" : "Suspend"}
          </button>
        </div>
      </div>
    </div>
  </div>
);

const TransactionCard = ({ item, userName, type, onAction }) => (
  <div className="card bg-base-100 border border-base-300 shadow-sm">
    <div className="card-body p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold text-sm truncate">{userName}</p>
          <p className="text-xs text-base-content/40 font-mono">#{String(item.id).padStart(4, "0")} · {item.date}</p>
        </div>
        <p className={`font-bold text-xl font-mono shrink-0 ${type === "deposit" ? "text-success" : "text-error"}`}>
          {type === "deposit" ? "+" : "-"}${item.amount.toLocaleString()}
        </p>
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-base-content/30 uppercase tracking-wide font-semibold">{type}</span>
        <TransactionActions status={item.status} onAction={onAction} />
      </div>
    </div>
  </div>
);

function SidebarContent({ activeTab, setActiveTab, pendingDeposits, pendingWithdrawals, expanded }) {
  const items = [
    {
      id: "overview", label: "Overview",
      icon: <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
    },
    {
      id: "users", label: "Users",
      icon: <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    },
    {
      id: "deposits", label: "Deposits",
      icon: <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
    },
    {
      id: "withdrawals", label: "Withdrawals",
      icon: <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
    },
  ];

  return (
    <>
      <div className="flex items-center gap-3 px-4 py-5 border-b border-base-300">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-primary-content" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        {expanded && <span className="font-bold text-base tracking-tight">AdminPanel</span>}
      </div>
      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
        {items.map((item) => {
          const badge = item.id === "deposits" ? pendingDeposits : item.id === "withdrawals" ? pendingWithdrawals : 0;
          return (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${activeTab === item.id ? "bg-primary text-primary-content" : "text-base-content/60 hover:bg-base-200 hover:text-base-content"}`}
            >
              {item.icon}
              {expanded && <><span className="flex-1 text-left">{item.label}</span>{badge > 0 && <span className="badge badge-warning badge-sm">{badge}</span>}</>}
            </button>
          );
        })}
      </nav>
      <div className="px-2 py-4 border-t border-base-300">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-base-200">
          <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">A</div>
          {expanded && <div className="flex-1 min-w-0"><p className="text-xs font-semibold truncate">Super Admin</p><p className="text-[10px] text-base-content/40 truncate">admin@panel.com</p></div>}
        </div>
      </div>
    </>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState(mockUsers);
  const [deposits, setDeposits] = useState(mockDeposits);
  const [withdrawals, setWithdrawals] = useState(mockWithdrawals);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [confirmModal, setConfirmModal] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const [adminData, setAdminData] = useState(localStorage.getItem("adminData"));
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (adminData !== "admin") {
  //     localStorage.removeItem("adminData")
  //     localStorage.removeItem("note")
  //     navigate("/login")
  //   }
  //   const check = () => {
  //     const mobile = window.innerWidth < 1024;
  //     setIsMobile(mobile);
  //     setSidebarOpen(!mobile);
  //   };
  //   check();
  //   window.addEventListener("resize", check);
  //   return () => window.removeEventListener("resize", check);
  // }, []);



  //  useEffect(()=> {
  //      

  //   }, [navigate])

  const getUserName = (id) => users.find((u) => u.id === id)?.name || "Unknown";
  const handleDepositAction = (id, status) => setDeposits((p) => p.map((d) => d.id === id ? { ...d, status } : d));
  const handleWithdrawalAction = (id, status) => setWithdrawals((p) => p.map((w) => w.id === id ? { ...w, status } : w));
  const handleSuspend = (id) => { setUsers((p) => p.map((u) => u.id === id ? { ...u, status: u.status === "suspended" ? "active" : "suspended" } : u)); setConfirmModal(null); };

  const filteredUsers = users.filter((u) =>
    [u.name, u.email, u.username].some((f) => f.toLowerCase().includes(search.toLowerCase()))
  );

  const totalDeposited = deposits.filter((d) => d.status === "approved").reduce((s, d) => s + d.amount, 0);
  const totalWithdrawn = withdrawals.filter((w) => w.status === "approved").reduce((s, w) => s + w.amount, 0);
  const pendingDeposits = deposits.filter((d) => d.status === "pending").length;
  const pendingWithdrawals = withdrawals.filter((w) => w.status === "pending").length;

  const mobileNavItems = [
    { id: "overview", label: "Home", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { id: "users", label: "Users", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
    { id: "deposits", label: "Deposits", badge: pendingDeposits, icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg> },
    { id: "withdrawals", label: "Withdraw", badge: pendingWithdrawals, icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg> },
  ];

  return (
    <div className="min-h-screen bg-base-200" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Mono:wght@400;500&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .mono { font-family: 'DM Mono', monospace; }
        .sidebar { transition: width 0.3s cubic-bezier(0.4,0,0.2,1); }
        .main-content { transition: margin-left 0.3s cubic-bezier(0.4,0,0.2,1); }
        .row-hover:hover { background: oklch(var(--b3) / 0.5); }
        .stat-card { transition: transform 0.2s ease; }
        .stat-card:hover { transform: translateY(-2px); }
        .bottom-nav-btn { transition: color 0.15s ease; }
      `}</style>

      {/* Mobile drawer overlay */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-72 max-w-[80vw] bg-base-100 h-full flex flex-col shadow-2xl z-10">
            <SidebarContent activeTab={activeTab} setActiveTab={(t) => { setActiveTab(t); setSidebarOpen(false); }} pendingDeposits={pendingDeposits} pendingWithdrawals={pendingWithdrawals} expanded={true} />
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      {!isMobile && (
        <aside className={`sidebar fixed top-0 left-0 h-full bg-base-100 border-r border-base-300 flex flex-col z-30 ${sidebarOpen ? "w-64" : "w-16"}`}>
          <SidebarContent activeTab={activeTab} setActiveTab={setActiveTab} pendingDeposits={pendingDeposits} pendingWithdrawals={pendingWithdrawals} expanded={sidebarOpen} />
        </aside>
      )}

      {/* Main */}
      <div className={`flex flex-col min-h-screen main-content ${!isMobile ? (sidebarOpen ? "lg:ml-64" : "lg:ml-16") : ""}`}>

        {/* Header */}
        <header className="bg-base-100 border-b border-base-300 px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="btn btn-ghost btn-sm btn-square">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-sm font-bold capitalize leading-tight">{activeTab === "overview" ? "Dashboard" : activeTab}</h1>
              <p className="text-[10px] text-base-content/40 hidden sm:block">
                {new Date().toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isMobile && <span className="font-bold text-sm tracking-tight">AdminPanel</span>}
            <div className="indicator">
              {(pendingDeposits + pendingWithdrawals) > 0 && (
                <span className="indicator-item badge badge-error badge-xs font-bold">{pendingDeposits + pendingWithdrawals}</span>
              )}
              <button className="btn btn-ghost btn-sm btn-square">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary cursor-pointer">A</div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-6 pb-24 lg:pb-6 space-y-4 lg:space-y-5">

          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { label: "Total Users", value: users.length, sub: `${users.filter(u => u.status === "active").length} active`, color: "text-primary", bg: "bg-primary/10", symbol: "👤" },
                  { label: "Total Deposited", value: `$${totalDeposited.toLocaleString()}`, sub: `${pendingDeposits} pending`, color: "text-success", bg: "bg-success/10", symbol: "↑" },
                  { label: "Total Withdrawn", value: `$${totalWithdrawn.toLocaleString()}`, sub: `${pendingWithdrawals} pending`, color: "text-warning", bg: "bg-warning/10", symbol: "↓" },
                  { label: "Suspended", value: users.filter(u => u.status === "suspended").length, sub: "accounts", color: "text-error", bg: "bg-error/10", symbol: "⛔" },
                ].map((s) => (
                  <div key={s.label} className="stat-card card bg-base-100 border border-base-300 shadow-sm">
                    <div className="card-body p-4">
                      <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center text-base mb-2`}>{s.symbol}</div>
                      <p className={`text-xl lg:text-2xl font-bold mono ${s.color}`}>{s.value}</p>
                      <p className="text-xs font-medium text-base-content/60 mt-0.5">{s.label}</p>
                      <p className="text-[10px] text-base-content/30">{s.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {[
                  { title: "Recent Deposits", data: deposits.slice(0, 4), type: "deposit", tab: "deposits" },
                  { title: "Recent Withdrawals", data: withdrawals.slice(0, 4), type: "withdrawal", tab: "withdrawals" },
                ].map(({ title, data, type, tab }) => (
                  <div key={title} className="card bg-base-100 border border-base-300 shadow-sm">
                    <div className="card-body p-0">
                      <div className="px-4 py-3 border-b border-base-300 flex items-center justify-between">
                        <h2 className="font-semibold text-sm">{title}</h2>
                        <button onClick={() => setActiveTab(tab)} className="btn btn-ghost btn-xs text-xs opacity-60">View all →</button>
                      </div>
                      <div className="divide-y divide-base-200">
                        {data.map((item) => (
                          <div key={item.id} className="flex items-center justify-between px-4 py-3 row-hover">
                            <div>
                              <p className="text-sm font-medium">{getUserName(item.userId)}</p>
                              <p className="text-xs text-base-content/40 mono">{item.date}</p>
                            </div>
                            <div className="text-right">
                              <p className={`text-sm font-bold mono ${type === "deposit" ? "text-success" : "text-error"}`}>
                                {type === "deposit" ? "+" : "-"}${item.amount.toLocaleString()}
                              </p>
                              <StatusBadge status={item.status} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* USERS */}
          {activeTab === "users" && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <p className="text-sm text-base-content/50 flex-1">{filteredUsers.length} of {users.length} users</p>
                <label className="input input-bordered input-sm flex items-center gap-2 w-full sm:w-64">
                  <svg className="w-3.5 h-3.5 opacity-40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input type="text" placeholder="Search by name, email, username…" value={search} onChange={(e) => setSearch(e.target.value)} className="grow text-sm" />
                </label>
              </div>

              {/* Mobile: cards */}
              <div className="lg:hidden space-y-3">
                {filteredUsers.length === 0
                  ? <div className="text-center py-12 text-base-content/30 text-sm">No users found</div>
                  : filteredUsers.map((user, i) => (
                    <UserCard key={user.id} user={user} index={i} onSuspend={(u) => setConfirmModal({ user: u })} />
                  ))
                }
              </div>

              {/* Desktop: table */}
              <div className="hidden lg:block card bg-base-100 border border-base-300 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="table table-sm">
                    <thead>
                      <tr className="text-xs text-base-content/40 uppercase tracking-wider bg-base-200/50">
                        <th>User</th><th>Username</th><th>Location</th><th>IP Address</th><th>Joined</th><th>Status</th><th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user, i) => (
                        <tr key={user.id} className="row-hover">
                          <td>
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold shrink-0`}>{user.avatar}</div>
                              <div><p className="font-medium text-sm">{user.name}</p><p className="text-xs text-base-content/40">{user.email}</p></div>
                            </div>
                          </td>
                          <td className="mono text-sm text-base-content/60">@{user.username}</td>
                          <td className="text-sm">{user.location}</td>
                          <td className="mono text-xs text-base-content/50">{user.ip}</td>
                          <td className="text-xs text-base-content/50">{user.joined}</td>
                          <td><StatusBadge status={user.status} /></td>
                          <td>
                            <button onClick={() => setConfirmModal({ user })} className={`btn btn-xs ${user.status === "suspended" ? "btn-outline btn-success" : "btn-outline btn-error"}`}>
                              {user.status === "suspended" ? "Unsuspend" : "Suspend"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* DEPOSITS */}
          {activeTab === "deposits" && (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-semibold flex-1 text-sm">Deposit Requests</h2>
                <span className="badge badge-ghost text-xs">Total: {deposits.length}</span>
                <span className="badge badge-warning text-xs">Pending: {pendingDeposits}</span>
                <span className="badge badge-success text-xs">Approved: {deposits.filter(d => d.status === "approved").length}</span>
              </div>
              <div className="lg:hidden space-y-3">
                {deposits.map((d) => (
                  <TransactionCard key={d.id} item={d} userName={getUserName(d.userId)} type="deposit" onAction={(s) => handleDepositAction(d.id, s)} />
                ))}
              </div>
              <div className="hidden lg:block card bg-base-100 border border-base-300 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="table table-sm">
                    <thead><tr className="text-xs text-base-content/40 uppercase tracking-wider bg-base-200/50"><th>User</th><th>Plan</th><th>Method</th><th>Amount</th><th>Date</th><th>Action</th></tr></thead>
                    <tbody>
                      {deposits.map((d) => {
                        const user = users.find((u) => u.id === d.userId);
                        return (
                          <tr key={d.id} className="row-hover">
                            <td><p className="font-medium text-sm">{user?.name}</p><p className="text-xs text-base-content/40">@{user?.username}</p></td>
                            <td className="mono text-xs text-base-content/30">Plan A</td>
                            <td className="mono text-xs text-base-content/30">Bitcoin</td>

                            <td className="mono font-bold text-success">+${d.amount.toLocaleString()}</td>
                            <td className="text-xs text-base-content/50">{d.date}</td>
                            <td><TransactionActions status={d.status} onAction={(s) => handleDepositAction(d.id, s)} /></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* WITHDRAWALS */}
          {activeTab === "withdrawals" && (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-semibold flex-1 text-sm">Withdrawal Requests</h2>
                <span className="badge badge-ghost text-xs">Total: {withdrawals.length}</span>
                <span className="badge badge-warning text-xs">Pending: {pendingWithdrawals}</span>
                <span className="badge badge-success text-xs">Approved: {withdrawals.filter(w => w.status === "approved").length}</span>
              </div>
              <div className="lg:hidden space-y-3">
                {withdrawals.map((w) => (
                  <TransactionCard key={w.id} item={w} userName={getUserName(w.userId)} type="withdrawal" onAction={(s) => handleWithdrawalAction(w.id, s)} />
                ))}
              </div>
              <div className="hidden lg:block card bg-base-100 border border-base-300 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="table table-sm">
                    <thead><tr className="text-xs text-base-content/40 uppercase tracking-wider bg-base-200/50"><th>#ID</th><th>User</th><th>Amount</th><th>Date</th><th>Action</th></tr></thead>
                    <tbody>
                      {withdrawals.map((w) => {
                        const user = users.find((u) => u.id === w.userId);
                        return (
                          <tr key={w.id} className="row-hover">
                            <td className="mono text-xs text-base-content/30">#{String(w.id).padStart(4, "0")}</td>
                            <td><p className="font-medium text-sm">{user?.name}</p><p className="text-xs text-base-content/40">@{user?.username}</p></td>
                            <td className="mono font-bold text-error">-${w.amount.toLocaleString()}</td>
                            <td className="text-xs text-base-content/50">{w.date}</td>
                            <td><TransactionActions status={w.status} onAction={(s) => handleWithdrawalAction(w.id, s)} /></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </main>

        {/* Mobile bottom tab bar */}
        {isMobile && (
          <nav className="fixed bottom-0 left-0 right-0 bg-base-100 border-t border-base-300 z-20" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
            <div className="flex items-stretch h-16">
              {mobileNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`bottom-nav-btn flex-1 flex flex-col items-center justify-center gap-0.5 relative ${activeTab === item.id ? "text-primary" : "text-base-content/35"}`}
                >
                  {item.badge > 0 && (
                    <span className="absolute top-2 right-[calc(50%-14px)] w-4 h-4 bg-warning rounded-full text-[9px] font-bold flex items-center justify-center text-warning-content z-10">
                      {item.badge}
                    </span>
                  )}
                  <span className={`${activeTab === item.id ? "scale-110" : "scale-100"} transition-transform duration-150`}>
                    {item.icon}
                  </span>
                  <span className="text-[10px] font-semibold leading-none">{item.label}</span>
                  {activeTab === item.id && (
                    <span className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-primary rounded-full"></span>
                  )}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>

      {/* Confirm modal — slides up on mobile */}
      {confirmModal && (
        <div className="modal modal-open modal-bottom sm:modal-middle">
          <div className="modal-box max-w-sm w-full rounded-t-2xl sm:rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${confirmModal.user.status === "suspended" ? "bg-success/15" : "bg-error/15"}`}>
                {confirmModal.user.status === "suspended" ? "✅" : "⛔"}
              </div>
              <h3 className="font-bold text-base">{confirmModal.user.status === "suspended" ? "Unsuspend User?" : "Suspend User?"}</h3>
            </div>
            <p className="text-sm text-base-content/60 mb-4">
              {confirmModal.user.status === "suspended" ? "Restore access for " : "Revoke access for "}
              <strong className="text-base-content">{confirmModal.user.name}</strong>? This can be reversed later.
            </p>
            <div className="flex gap-2">
              <button onClick={() => setConfirmModal(null)} className="btn btn-ghost btn-sm flex-1">Cancel</button>
              <button onClick={() => handleSuspend(confirmModal.user.id)} className={`btn btn-sm flex-1 text-white ${confirmModal.user.status === "suspended" ? "btn-success" : "btn-error"}`}>
                {confirmModal.user.status === "suspended" ? "Yes, Unsuspend" : "Yes, Suspend"}
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setConfirmModal(null)} />
        </div>
      )}
    </div>
  );
}