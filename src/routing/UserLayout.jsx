import { Banknote, BanknoteArrowDown, BanknoteArrowDownIcon, BanknoteArrowUpIcon, Briefcase, BriefcaseBusiness, ChevronDown, ChevronsDown, ChevronsLeft, ChevronsRight, CircleDollarSign, ClipboardClock, Coins, DollarSign, HandCoins, Handshake, Home, HomeIcon, LayoutDashboard, PanelLeftOpen, PanelRightOpen, Settings, User, UserRound, WalletCards } from 'lucide-react';
import React from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom';
// import DropdownMenu from '../components/DropdownMenu';

export default function UserLayout() {
    const handleItemClick = () => {
        document.activeElement.blur();
    };
    return (
        <div className=''>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Navbar */}
                    <nav className="navbar w-full bg-base-200">
                        {/* <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                        </label> */}
                        <div className="px-4 w-full flex justify-between">
                            <p>Navbar Title</p>
                            <div className='flex justify-center items-center gap-2'>
                                <div className='bg-base-100 rounded-2xl px-2 text-sm mr-10'>
                                    Jan-20-2026
                                </div>
                                <div className="avatar">
                                    <div className="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
                                        <UserRound />
                                    </div>
                                </div>

                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="m-1 flex justify-center items-center text-sm cursor-pointer">
                                        Joe Martin
                                        <ChevronDown size={14} />
                                    </div>
                                    <ul tabIndex="-1" className="dropdown-content menu bg-gray-600 rounded-box z-1 w-40 p-2 shadow-md mt-2">
                                        <li onClick={handleItemClick}><a>Edit Account</a></li>
                                        <li onClick={handleItemClick}><a>Logout</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                    {/* Page content here */}
                    <main className='p-4'>
                        <Outlet />
                    </main>
                </div>

                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                        {/* Sidebar content here */}
                        <ul className="menu w-full grow bg-base-300">
                            {/* List item */}
                            <li className='is-drawer-open:items-end is-drawer-close:items-center mb-4'>
                                <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-sm btn-square btn-nuetral">
                                    {/* Sidebar toggle icon */}
                                    <ChevronsRight size={20} className='is-drawer-open:hidden is-drawer-close:block' />
                                    <ChevronsLeft size={20} className='is-drawer-open:block is-drawer-close:hidden' />
                                </label>
                            </li>
                            {/* List item */}
                            <li>
                                <Link to="/admin/dashboard" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Dashboard">
                                    {/* Home icon */}
                                    <LayoutDashboard />
                                    <span className="is-drawer-close:hidden">Dashboard</span>
                                </Link>
                            </li>

                             {/* List item */}
                            <li>
                                <Link to="/admin/deposit" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Make a Deposit">
                                    {/* Settings icon */}
                                    <BanknoteArrowUpIcon />
                                    <span className="is-drawer-close:hidden">Make a Deposit</span>
                                </Link>
                            </li>

                            {/* List item */}
                            <li>
                                <Link to="/admin/withdraw" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Withdrawal">
                                    {/* Settings icon */}
                                    <BanknoteArrowDown />
                                    <span className="is-drawer-close:hidden">Withdrawal</span>
                                </Link>
                            </li>
                            {/* List item */}
                            <li>
                                <Link to="/admin/active-deposit" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Active Deposits">
                                    {/* Settings icon */}
                                    <Banknote />
                                    <span className="is-drawer-close:hidden">Active Deposits</span>
                                </Link>
                            </li>
                            {/* List item */}
                            <li>
                                <Link className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Acount History">
                                    {/* Settings icon */}
                                    <ClipboardClock />
                                    <span className="is-drawer-close:hidden">Acount History</span>
                                </Link>
                            </li>
                            {/* List item */}
                            <li>
                                <Link className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Referral Program">
                                    {/* Settings icon */}
                                    <Handshake />
                                    <span className="is-drawer-close:hidden">Referral Program</span>
                                </Link>
                            </li>
                           
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
