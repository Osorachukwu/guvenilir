import { ChevronDown, Mail, MailOpen } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';

export default function NavBar() {
    const handleItemClick = () => {
        document.activeElement.blur();
    };
    return (
        <div className='relative'>
            <div className='py-6 hidden md:block'>
                <div className='flex justify-between items-center max-w-4xl mx-auto'>
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                    {/*  */}
                    <div className='flex'>
                        <div>
                            {/* <p className='text-xs'>Send us a mail</p> */}
                            <div className='flex items-center gap-2'>
                                {/* <Mail /> */}
                                <MailOpen />
                                <p>support@example.com</p>
                            </div>
                            <p className='text-xs mt-2'>Send us a mail</p>
                        </div>
                        <div className='pl-4 ml-4 border-l border-base-content/20'>
                            <Link to="/login" className='btn btn-primary'>Login</Link>
                        </div>
                    </div>

                </div>
            </div>
            {/* main nav 👇 */}
            <div className="navbar bg-base-100/50 backdrop-blur-sm shadow-sm absolute border-b border-gray-600 z-50">
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
                                        <li onClick={handleItemClick}><a>Item 1</a></li>
                                        <li onClick={handleItemClick}><a>Item 2</a></li>
                                    </ul>
                                </div>
                            </li>
                            <li><Link to="/faq">FAQs</Link></li>
                            <li><Link to="/support">Support</Link></li>
                            <li><Link to="/affiliate">Affiliate</Link></li>
                            <li><Link to="/legal">Legal</Link></li>
                            <li><Link to="/user/dashboard">Buy digital currency</Link></li>
                            <li><Link to="/register">Signup</Link></li>
                        </ul>
                    </div>
                    {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
                </div>
                {/* Desktop Nav */}
                <div className="navbar-center hidden lg:flex font-semibold">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to="/">HOME</Link></li>
                        <li><Link to="/about">ABOUT</Link></li>
                        <li>
                            <div className="dropdown dropdown-hover dropdown-center">
                                <div tabIndex={0} role="button" className="flex items-center gap-1">INVESTMENTS <ChevronDown size={16} /></div>
                                <ul tabIndex="-1" className="dropdown-content mt-2 menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                    <li onClick={handleItemClick}><Link to="/login">Bitcoin</Link></li>
                                    <li onClick={handleItemClick}><Link to="">Oil & Gas</Link></li>
                                    <li onClick={handleItemClick}><Link to="">Loan</Link></li>
                                    <li onClick={handleItemClick}><Link to="">NFP</Link></li>
                                </ul>
                            </div>
                        </li>

                        <li><Link to="/faq">FAQS</Link></li>
                        <li><Link to="/support">SUPPORT</Link></li>
                        <li><Link to="/affiliate">AFFILIATE</Link></li>
                        <li><Link to="/legal">LEGAL</Link></li>
                        <li><Link to="/user/dashboard">BUY DIGITAL CURRENCY</Link></li>
                        <li><Link to="/register">SIGNUP</Link></li>
                    </ul>
                </div>
                <div className="navbar-end ">
                    <Link to="/login" className="btn btn-sm btn-primary md:hidden">Login</Link>
                </div>
            </div>
        </div>
    )
}

// if you want it centered with not logo or login button
// 1. add lg:hidden to the last login button on the page and comment out the logo then uncomment the Login button under the BUY DIGITAL CURRENCY
