import React, { useState, useEffect } from 'react'
import {
    Home, Users, BanknoteArrowDown, BanknoteArrowUp,
    PanelLeftOpen, LayoutDashboard, Settings, TrendingUp, Wallet
} from 'lucide-react'
import axios from 'axios'
import CurrentDate from '../../components/ui/CurrentDate'
import LogoutButton from '../../components/LogoutButton'
import TimedAlert from '../../components/ui/TimedAlert'
import useInactivityLogout from '../../hooks/useInactivityLogout'
import { BASE_URL, DOMAIN_KEY } from '../../utils/constants'

// Tab Components
import OverviewTab from './OverviewTab'
import UsersTab from './UsersTab'
import DepositsTab from './DepositsTab'
import WithdrawalsTab from './WithdrawalsTab'
import PlansManager from './PlansManager'
import BalancesTab from './BalancesTab'
import SettingsTab from './SettingsTab'

export default function AdminLayout() {
    useInactivityLogout();

    const [activeTab, setActiveTab] = useState("overview");
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);

    const [dashboardData, setDashboardData] = useState({
        totalUsers: 0, totlDeposit: 0, totalWithdraw: 0, totalSuspend: 0, totalAcive: 0,
        activeUsers: [], suspendedUsers: [], lastFiveDeposit: [], lastFiveWithdraw: [],
        userList: [], depositList: [], withdrawList: []
    });

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${BASE_URL}/admindata.php`, { domainKey: DOMAIN_KEY });
            if (response.data) setDashboardData(response.data);
        } catch (err) {
            setAlert({ text: "Failed to load dashboard data", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchDashboardData(); }, [refreshKey]);

    const triggerRefresh = () => setRefreshKey(prev => prev + 1);

    const sidebarItems = [
        { id: "overview", label: "Overview", icon: Home },
        { id: "users", label: "Users", icon: Users },
        { id: "deposits", label: "Deposits", icon: BanknoteArrowDown },
        { id: "withdrawals", label: "Withdrawals", icon: BanknoteArrowUp },
        { id: "plans", label: "Plans", icon: TrendingUp },
        { id: "balances", label: "Balances", icon: Wallet },
    ];

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
                {alert && <TimedAlert text={alert.text} type={alert.type} onClose={() => setAlert(null)} />}

                {/* Navbar */}
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
                        <button onClick={() => setActiveTab("settings")} className="hidden sm:flex" title="Settings" type="button">
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

                {/* Main Content */}
                <main className="flex-1 p-4 lg:p-6 pb-24 lg:pb-6 space-y-6">
                    {/* Page Title */}
                    <div className="flex items-center gap-3">
                        {(() => {
                            const allItems = [...sidebarItems, { id: "settings", label: "Settings", icon: Settings }];
                            const activeItem = allItems.find(item => item.id === activeTab);
                            const IconComp = activeItem?.icon || Home;
                            return (
                                <>
                                    <div className="bg-primary/10 p-2 rounded-xl"><IconComp className="h-5 w-5 text-primary" /></div>
                                    <div>
                                        <h2 className="text-xl font-bold">{activeItem?.label || "Overview"}</h2>
                                        <p className="text-xs text-base-content/50">Manage your platform</p>
                                    </div>
                                </>
                            );
                        })()}
                    </div>

                    {/* Tab Content */}
                    {activeTab === "overview" && <OverviewTab dashboardData={dashboardData} setActiveTab={setActiveTab} />}
                    {activeTab === "users" && <UsersTab users={dashboardData.userList || []} onRefresh={triggerRefresh} />}
                    {activeTab === "deposits" && <DepositsTab onRefresh={triggerRefresh} />}
                    {activeTab === "withdrawals" && <WithdrawalsTab onRefresh={triggerRefresh} />}
                    {activeTab === "plans" && <PlansManager />}
                    {activeTab === "balances" && <BalancesTab />}
                    {activeTab === "settings" && <SettingsTab />}
                </main>
            </div>

            {/* Sidebar */}
            <div className="drawer-side z-50">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col bg-gradient-to-b from-base-200 to-base-300 border-r border-base-300/50 shadow-xl w-64">
                    <div className="flex items-center gap-3 px-5 py-5 border-b border-base-300/50">
                        <div className="bg-primary/10 p-2 rounded-xl"><LayoutDashboard className="h-6 w-6 text-primary" /></div>
                        <div>
                            <p className="font-bold text-lg leading-tight">Admin</p>
                            <p className="text-xs text-base-content/50 leading-tight">Management Panel</p>
                        </div>
                    </div>

                    <ul className="menu flex-1 px-3 py-4 gap-1">
                        {sidebarItems.map((item) => {
                            const IconComp = item.icon;
                            const isActive = activeTab === item.id;
                            return (
                                <li key={item.id}>
                                    <button
                                        onClick={() => setActiveTab(item.id)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium w-full transition-all duration-200 ${isActive ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' : 'hover:bg-base-300/50 text-base-content/70'}`}
                                        type="button"
                                    >
                                        <IconComp size={18} className={isActive ? 'text-primary' : 'text-base-content/50'} />
                                        <span>{item.label}</span>
                                        {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"></span>}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="px-3 py-4 border-t border-base-300/50 space-y-2">
                        <button
                            onClick={() => setActiveTab("settings")}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium w-full transition-all duration-200 ${activeTab === "settings" ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' : 'text-base-content/70 hover:bg-base-300/50'}`}
                            type="button"
                        >
                            <Settings size={18} className={activeTab === "settings" ? 'text-primary' : 'text-base-content/50'} />
                            <span>Settings</span>
                            {activeTab === "settings" && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"></span>}
                        </button>
                        <LogoutButton confirmLogout={true} />
                    </div>
                </div>
            </div>
        </div>
    )
}