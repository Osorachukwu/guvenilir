import React, { useRef } from 'react'
import { CopyableText } from '../../components/ui/CopyableText'
import Buttons from '../../components/Buttons'
import { BanknoteArrowDown, BanknoteArrowUp, Calendar, Clock, Coins, Home, LayoutDashboard, LogOut, Menu, PanelLeftOpen, User, Users } from 'lucide-react'

import ChartTransaction from '../../components/ChartTransaction'
import { Link, Outlet, useLocation } from 'react-router-dom'
import LogoutButton from '../../components/LogoutButton'
import CurrentDate from '../../components/ui/CurrentDate'
import Icon from './Icon'

export default function UserLayout() {
    const drawerToggleRef = useRef(null);
    const location = useLocation();

    const closeSidebar = () => {
        if (window.innerWidth < 1024) {
            drawerToggleRef.current.checked = false;
        }
    };

    const isActive = (path) => {
        if (path === '/account') {
            return location.pathname === '/account';
        }
        return location.pathname.startsWith(path);
    };

    const sidebarItems = [
        { to: "/account", label: "Dashboard", icon: LayoutDashboard, tip: "Dashboard" },
        { to: "/account/deposit", label: "Make Deposit", icon: BanknoteArrowUp, tip: "Make Deposit" },
        { to: "/account/withdraw", label: "Withdrawal", icon: BanknoteArrowDown, tip: "Withdrawal" },
        { 
            to: "/account/your-deposit", 
            label: "Your Deposit", 
            icon: null, 
            customIcon: true,
            tip: "Your Deposit" 
        },
        { to: "/account/edit-account", label: "Account", icon: User, tip: "Account" },
        { to: "/account/referrals", label: "Your Referrals", icon: Users, tip: "Your Referrals" },
    ];

    return (
        <div className="drawer lg:drawer-open text-base-content">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" ref={drawerToggleRef} />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-gradient-to-r from-base-200 to-base-300 border-b border-base-300/50 sticky top-0 z-40 flex justify-between pr-4 shadow-sm">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-sm btn-square btn-ghost lg:hidden">
                        {/* Sidebar toggle icon */}
                        <PanelLeftOpen size={18} />
                    </label>
                    {/* <Logo /> */}
                    {/* <LogOut /> */}
                    <CurrentDate />
                    <div className='flex items-center gap-8'>
                        <Link to="/account/edit-account" title='My account'>
                            <div className='flex items-center space-x-2 md:space-x-3 text-sm hover:bg-base-300/50 px-3 py-1.5 rounded-lg transition-colors'>
                                <div className="avatar avatar-online avatar-placeholder">
                                    <div className="bg-primary text-primary-content w-8 rounded-full">
                                        <span className="text-sm font-bold">J</span>
                                    </div>
                                </div>
                                <p>Hi, Username</p>
                            </div>
                        </Link>
                        <LogoutButton confirmLogout={true} />
                    </div>
                </nav>
                {/* Page content here */}
                {/* Main Content - grows to take available space */}
                <main className='flex-1'>
                    <div className='max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6'>
                        <Outlet />
                    </div>
                </main>
            </div>

            <div className="drawer-side z-50">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-gradient-to-b from-base-200 to-base-300 border-r border-base-300/50 shadow-xl w-64">
                    {/* Sidebar Header - visible when sidebar is open */}
                    <div className="flex items-center gap-3 px-5 py-5 border-b border-base-300/50 w-full">
                        <div className="bg-primary/10 p-2 rounded-xl">
                            <LayoutDashboard className="h-6 w-6 text-primary" />
                        </div>
                        <div className="overflow-hidden transition-all duration-200">
                            <p className="font-bold text-lg leading-tight whitespace-nowrap">Dashboard</p>
                            <p className="text-xs text-base-content/50 leading-tight whitespace-nowrap">User Panel</p>
                        </div>
                    </div>
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow px-3 py-4 gap-1">
                        {sidebarItems.map((item, index) => {
                            const active = isActive(item.to);
                            
                            return (
                                <li key={index}>
                                    <Link
                                        to={item.to}
                                        onClick={closeSidebar}
                                        className={`
                                            flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                                            transition-all duration-200
                                            ${active 
                                                ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' 
                                                : 'hover:bg-base-300/50 text-base-content/70'
                                            }
                                        `}
                                    >
                                        {item.customIcon ? (
                                            <Icon
                                                name="yourDeposits"
                                                className={`w-5 h-5 flex-shrink-0 ${active ? 'text-primary' : 'text-base-content/50'}`}
                                            />
                                        ) : (
                                            <item.icon size={18} className={`flex-shrink-0 ${active ? 'text-primary' : 'text-base-content/50'}`} />
                                        )}
                                        <span className="overflow-hidden transition-all duration-200 whitespace-nowrap">{item.label}</span>
                                        {active && (
                                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                        {/* Mobile logout */}
                        <li className="md:hidden block">
                            <LogoutButton confirmLogout={true} />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}