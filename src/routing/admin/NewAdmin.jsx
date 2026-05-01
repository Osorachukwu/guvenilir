import React from 'react'
import { CopyableText } from '../../components/ui/CopyableText'
import Buttons from '../../components/Buttons'
import { BanknoteArrowDown, BanknoteArrowUp, Calendar, Clock, Coins, Home, LayoutDashboard, LogOut, Menu, PanelLeftOpen, User, Users } from 'lucide-react'

import ChartTransaction from '../../components/ChartTransaction'
import { Link, Outlet } from 'react-router-dom'
import LogoutButton from '../../components/LogoutButton'
import CurrentDate from '../../components/ui/CurrentDate'
import Icon from '../user/Icon'
// import Icon from './Icon'


export default function NewAdmin() {
    return (
        <div className="drawer lg:drawer-open text-base-content">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300 sticky top-0 z-40 flex justify-between pr-4">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-sm btn-square btn-ghost">
                        {/* Sidebar toggle icon */}
                        <PanelLeftOpen size={18} />
                    </label>
                    {/* <Logo /> */}
                    {/* <LogOut /> */}
                    <CurrentDate />
                    <div className='flex items-center gap-8'>
                        <Link to="/account/edit-account" title='My account'>
                            <div className='flex items-center space-x-2 md:space-x-3 text-sm'>
                                <div className="avatar avatar-online avatar-placeholder">
                                    <div className="bg-neutral text-neutral-content w-6 md:w-8 rounded-full">
                                        <span>J</span>
                                    </div>
                                </div>
                                <p>Hi, Username</p>
                            </div>
                        </Link>
                        <button className='btn btn-sm btn-neutral text-sm hidden md:block'>Logout</button>
                    </div>

                </nav>
                {/* Page content here */}
                {/* Main Content - grows to take available space */}
                <main className='flex-1'>
                    <div className='max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6'>
                        <p>Content here</p>
                    </div>
                </main>
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible z-50">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-300 is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow">
                        {/* List item */}
                        <li>
                            <Link to="/account" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Dashboard">
                                {/* Home icon */}
                                <LayoutDashboard size={18} />
                                <span className="is-drawer-close:hidden">Dashboard</span>
                            </Link>
                        </li>

                        {/* List item */}
                        <li>
                            <Link to="/account/deposit" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Make Deposit">
                                <BanknoteArrowUp size={18} />
                                <span className="is-drawer-close:hidden">Make Deposit</span>
                            </Link>
                        </li>

                        {/* List item */}
                        <li>
                            <Link to="/account/withdraw" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Withdrawal">
                                <BanknoteArrowDown size={18} />
                                <span className="is-drawer-close:hidden">Withdrawal</span>
                            </Link>
                        </li>

                        {/* List item */}
                        <li>
                            <Link to="/account/your-deposit" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Your Deposit">
                                {/* Settings icon */}
                                <Icon
                                    name="yourDeposits"
                                    className={`w-5 h-5`}
                                />
                                <span className="is-drawer-close:hidden">Your Deposit</span>
                            </Link>
                        </li>
                        {/* List item */}
                        <li>
                            <Link to="/account/edit-account" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Account">
                                {/* Settings icon */}
                                <User size={18} />
                                <span className="is-drawer-close:hidden">Account</span>
                            </Link>
                        </li>
                        {/* List item */}
                        <li>
                            <Link to="/account/referrals" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Your Referrals">
                                {/* Settings icon */}
                                <Users size={18} />
                                <span className="is-drawer-close:hidden">Your Referrals</span>
                            </Link>
                        </li>
                        {/* List item */}
                        <li className="md:hidden block">
                            <Link to="/account/referrals" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Your Referrals">
                                {/* Settings icon */}
                                <LogOut size={18} />
                                <span className="is-drawer-close:hidden">Log out</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
