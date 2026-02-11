import { Banknote, BanknoteArrowDown, BanknoteArrowUpIcon, ChevronDown, ChevronsLeft, ChevronsRight, ClipboardClock, Handshake, Home, LayoutDashboard, UserRound } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function UserLayout() {
    const navigate = useNavigate();
    const { user, loading, isAuthenticated, logout, isUser } = useAuth();
    const [currentDate, setCurrentDate] = useState('');
    // console.log("testing :" + user)

    useEffect(() => {
        if (!loading) {
            // If not authenticated, redirect to login
            if (!isAuthenticated) {
                navigate('/login');
                return;
            }

            // If not a user (e.g., admin), redirect to appropriate layout
            if (!isUser()) {
                navigate('/admin');
                return;
            }
        }
    }, [loading, isAuthenticated, navigate, isUser]);

    useEffect(() => {
        // Set current date
        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        });
        setCurrentDate(formattedDate);
    }, []);

    const handleItemClick = () => {
        document.activeElement.blur();
    };

    // Show loading while checking auth
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    // Don't render if not authenticated or wrong role
    if (!isAuthenticated || !isUser()) {
        return null;
    }

    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Navbar */}
                    <nav className="navbar w-full bg-base-200">
                        <div className="px-4 w-full flex justify-between">
                            <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-sm btn-square btn-nuetral md:hidden">
                                <ChevronsRight size={20} className='is-drawer-open:hidden is-drawer-close:block' />
                                {/* <ChevronsLeft size={20} className='is-drawer-open:block is-drawer-close:hidden' /> */}
                            </label>
                            <p>Dashboard</p>
                            <div className='flex justify-center items-center gap-2'>
                                <div className='bg-base-300 rounded-2xl px-3 py-1 mr-10 shadow-lg text-xs'>
                                    {currentDate}
                                </div>
                                <div className="avatar">
                                    <div className="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
                                        <UserRound />
                                    </div>
                                </div>

                                <div className="dropdown dropdown-end dropdown-hover">
                                    <div tabIndex={0} role="button" className="m-1 flex gap-2 justify-center items-center text-sm cursor-pointer bg-base-100 p-2 rounded">
                                        {user?.fullname || user?.username}
                                        <ChevronDown size={14} />
                                    </div>
                                    <ul tabIndex="-1" className="dropdown-content menu bg-gray-600 rounded-box z-1 w-40 p-2 shadow-md mt-1">
                                        <li onClick={handleItemClick}>
                                            <Link to="/user/settings">Edit Account</Link>
                                        </li>
                                        <li onClick={handleItemClick}>
                                            <button onClick={logout}>Logout</button>
                                        </li>
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
                    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-20 is-drawer-open:w-64">
                        {/* Sidebar content here */}
                        <ul className="menu w-full grow bg-base-300">
                            {/* List item */}
                            <li className='is-drawer-open:items-end is-drawer-close:items-end mb-4'>
                                <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-sm btn-square btn-nuetral bg-base-100">
                                    <ChevronsRight size={20} className='is-drawer-open:hidden is-drawer-close:block' />
                                    <ChevronsLeft size={20} className='is-drawer-open:block is-drawer-close:hidden' />
                                </label>
                            </li>
                            <li>
                                <Link to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right items-center" data-tip="Home">
                                    <Home size={20} />
                                    <span className="is-drawer-close:hidden">Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/user" className="is-drawer-close:tooltip is-drawer-close:tooltip-right items-center" data-tip="Dashboard">
                                    <LayoutDashboard size={20} />
                                    <span className="is-drawer-close:hidden">Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/user/deposit" className="is-drawer-close:tooltip is-drawer-close:tooltip-right items-center" data-tip="Make a Deposit">
                                    <BanknoteArrowUpIcon size={20} />
                                    <span className="is-drawer-close:hidden">Make a Deposit</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/user/withdraw" className="is-drawer-close:tooltip is-drawer-close:tooltip-right items-center" data-tip="Withdrawal">
                                    <BanknoteArrowDown size={20} />
                                    <span className="is-drawer-close:hidden">Withdrawal</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/user/active-deposit" className="is-drawer-close:tooltip is-drawer-close:tooltip-right items-center" data-tip="Active Deposits">
                                    <Banknote size={20} />
                                    <span className="is-drawer-close:hidden">Active Deposits</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/user/history" className="is-drawer-close:tooltip is-drawer-close:tooltip-right items-center" data-tip="Account History">
                                    <ClipboardClock size={20} />
                                    <span className="is-drawer-close:hidden">Account History</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/user/referral" className="is-drawer-close:tooltip is-drawer-close:tooltip-right " data-tip="Referral Program">
                                    <Handshake size={18} />
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