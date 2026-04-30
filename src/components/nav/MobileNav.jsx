import { ChevronDown } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import ThemeSwitcher from '../ui/ThemeSwitcher'

// TODO
// Add and make sure the theme swither and lang translator are working
// Add and
export default function MobileNav() {
    return (
        <div className="navbar-start">
            <div className="dropdown">

                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden justify-end">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                <ul
                    tabIndex="-1"
                    className="menu menu-lg dropdown-content bg-base-100  z-1 mt-3 w-screen -ml-2 p-2 shadow">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="flex items-center">
                                Investments
                                <ChevronDown size={16} />
                            </div>
                            <ul tabIndex="-1" className="dropdown-content menu bg-base-300 rounded-box z-1 -ml-2 w-52 p-2 shadow-sm">
                                <li><a>Bitcoin</a></li>
                                <li><a>Oil & Gas</a></li>
                                <li><a>Loan</a></li>
                                <li><a>NFP</a></li>
                            </ul>
                        </div>
                    </li>
                    <li><Link to="/faqs">FAQs</Link></li>
                    <li><Link to="/support">Support</Link></li>
                    <li><Link to="/affiliate">Affiliate</Link></li>
                    <li><Link to="/legal">Legal</Link></li>
                    <li><Link to="/user/dashboard">Dashboard</Link></li>
                    <li><a className='cursor-pointer'>Logout</a></li>
                    <li><Link to="/login">Buy digital currency</Link></li>
                    <li><Link to="/register">Signup</Link></li>
                    <li>
                        <ThemeSwitcher />
                    </li>
                </ul>
            </div>
        </div>
    )
}
