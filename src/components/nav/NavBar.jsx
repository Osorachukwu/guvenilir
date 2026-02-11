import { ChevronDown, Mail, MailOpen } from 'lucide-react';
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import MobileNav from './MobileNav';
import { useAuth } from '../../hooks/useAuth';

export default function NavBar() {
    const { token, logout } = useAuth();
    // console.log(token);

    let currentRoute = useLocation().pathname;

    let dropDownItems = [
        { page: "Bitcoin", linkUrl: "/bitcoin" },
        { page: "Oil & Gas", linkUrl: "/oil-and-gas" },
        { page: "Loan", linkUrl: "/loan" },
        { page: "NFP", linkUrl: "/nfp" }
    ]

    const [toggle, setToggle] = useState(false);
    let handleToggle = () => {
        setToggle(!toggle)
    }



    return (
        <div className='relative'>
            <div className='py-6 hidden md:block z-50 relative'>
                <div className='flex justify-between items-center max-w-4xl mx-auto'>
                    <a className="btn btn-ghost text-xl">CryptoInvest</a>
                    <div className='flex'>
                        <div>
                            <div className='flex items-center gap-2'>
                                <MailOpen />
                                <p>support@example.com</p>
                            </div>
                            <p className='text-xs mt-2'>Send us a mail</p>
                        </div>
                        <div className='pl-4 ml-4 border-l border-base-content/20'>
                            {token ?
                                <button onClick={logout} className='btn btn-primary'>
                                    Logout
                                </button>
                                :
                                <Link to="/login" className='btn btn-primary'>Login</Link>
                            }


                        </div>
                    </div>
                </div>
            </div>
            {/* main nav 👇 */}
            <div className="navbar bg-black/30 backdrop-blur-sm shadow-sm absolute border-b border-gray-600 z-50">
                {/* <div className="navbar-start">
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
                </div> */}
                <MobileNav />
                {/* Desktop Nav */}
                <div className="navbar-center hidden lg:flex font-semibold">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to="/" className={`${currentRoute === "/" && "text-primary"}`}>HOME</Link></li>
                        <li><Link to="/about" className={`${currentRoute === "/about" && "text-primary"}`}>ABOUT</Link></li>
                        <li>
                            <div className="dropdown dropdown-hover dropdown-center">
                                <div tabIndex={0} role="button" className={`${currentRoute === "/bitcoin" || currentRoute === "/oil-and-gas" || currentRoute === "loan" || currentRoute === "/nfp" ? "text-primary" : null}  flex items-center gap-1`}>INVESTMENTS <ChevronDown size={16} /></div>
                                <ul tabIndex="-1" className="dropdown-content mt-2 menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                    {dropDownItems.map((item) => (
                                        <li key={item.page}>
                                            <Link to={item.linkUrl} className={`${currentRoute === "/oil-and-gas" && "border-b border-primary"}`}>{item.page}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>

                        <li><Link to="/faqs">FAQS</Link></li>
                        <li><Link to="/support">SUPPORT</Link></li>
                        <li><Link to="/affiliate">AFFILIATE</Link></li>
                        <li><Link to="/legal">LEGAL</Link></li>
                        <li><Link to="/user">DASHBOARD</Link></li>
                        <li><Link to="/user">BUY DIGITAL CURRENCY</Link></li>
                    </ul>
                </div>
                <div className="navbar-end flex gap-2"></div>
            </div>
        </div>
    )
}
