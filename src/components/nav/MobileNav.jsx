import { ChevronDown } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function MobileNav() {
  return (
    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                            </div>
                            <ul
                                tabIndex="-1"
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/about">About</Link></li>
                                <li>
                                    <div className="dropdown dropdown-">
                                        <div tabIndex={0} role="button" className="flex items-center">Investments <ChevronDown size={16} /> </div>
                                        <ul tabIndex="-1" className="dropdown-content menu bg-base-300 rounded-box z-1 -ml-2 w-52 p-2 shadow-sm">
                                            <li><a>Item 1</a></li>
                                            <li><a>Item 2</a></li>
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
                            </ul>
                        </div>
                    </div>
  )
}
