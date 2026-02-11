import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className='bg-base-300'>
            <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="sm:col-span-2">
                        <a
                            href="/"
                            aria-label="Go home"
                            title="Company"
                            className="inline-flex items-center"
                        >
                            {/* <svg
                            className="w-8 text-deep-purple-accent-400"
                            viewBox="0 0 24 24"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeMiterlimit="10"
                            stroke="currentColor"
                            fill="none"
                        >
                            <rect x="3" y="1" width="7" height="12" />
                            <rect x="3" y="17" width="7" height="6" />
                            <rect x="14" y="1" width="7" height="6" />
                            <rect x="14" y="11" width="7" height="12" />
                        </svg> */}
                            <span className="ml-2 text-xl font-bold tracking-wide uppercase">
                                Company
                            </span>
                        </a>
                        <div className="mt-6 lg:max-w-sm">
                            <p className=" leading-6">
                               We are everything a traditional financial institution is not. We set out to give investors better, simpler and more profitable ways to become financially successful and secure.
                            </p>
                            
                        </div>
                    </div>
                    <div className="space-y-2 text-sm">
                        <p className="text-base font-bold tracking-wide">
                            Contacts
                        </p>
                        <div className="flex">
                            <p className="mr-1">Phone:</p>
                            <a
                                href="tel:850-123-5021"
                                aria-label="Our phone"
                                title="Our phone"
                                className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-d"
                            >
                                850-123-5021
                            </a>
                        </div>
                        <div className="flex">
                            <p className="mr-1">Email:</p>
                            <a
                                href="mailto:info@lorem.mail"
                                aria-label="Our email"
                                title="Our email"
                                className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-d"
                            >
                                info@lorem.mail
                            </a>
                        </div>
                        <div className="flex">
                            <p className="mr-1">Address:</p>
                            <a
                                href="https://www.google.com/maps"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Our address"
                                title="Our address"
                                className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-d"
                            >
                                312 Lovely Street, NY
                            </a>
                        </div>
                    </div>
                    <div>
                        <p className="text-base font-bold tracking-wide mb-2">
                            Social
                        </p>
                       
                        <nav>
                            <ul className='space-y-2'>
                                <li>
                                    <Link>About us</Link>
                                </li>
                                <li>
                                    <Link>Privacy</Link>
                                </li>
                                <li>
                                    <Link>Legal</Link>
                                </li>
                                <li>
                                    <Link>Get Support</Link>
                                </li>
                            </ul>
                        </nav>

                    </div>
                </div>
                <div className='my-8 space-y-4'>
                    <p className='text-2xl font-semibold'>RISK DISCLAIMER</p>
                    <p className='text-sm leading-6'>
                        Nothing contained in this website should be construed as a solicitation or offer, or recommendation, to acquire or dispose of any investment or to engage in any other transaction. The information provided herein is not intended for distribution to, or use by, any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation. Some services may not be available to certain investors due to regulatory or other constraints either in UK, the United States or elsewhere. It is advised that most services are only available following completion of the Customer Agreement and/or any other relevant documentation as required. Investments in securities or financial instruments (including digital currencies, futures, options, contracts for differences, spot and forward foreign exchange contracts) can fluctuate in value. Accordingly, you should be aware that you might not realise the initial amount invested and indeed may incur additional liabilities as investments in securities or financial instruments may entail above average risk. You must therefore carefully consider whether your financial circumstances permit you to invest. Emerald Holdings Limited strongly suggests that you seek the advice of an independent financial advisor in this regard.
                    </p>
                </div>
                <div className="flex flex-col-reverse justify-between pt-6 pb-10 border-t border-base-100 lg:flex-row">
                    <p className="text-sm">
                        © Copyright 2020 Lorem Inc. All rights reserved.
                    </p>
                    <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
                        <li>
                            <a
                                href="/"
                                className="text-sm transition-colors duration-300 hover:text-deep-purple-accent-400"
                            >
                                F.A.Q
                            </a>
                        </li>
                        <li>
                            <a
                                href="/"
                                className="text-sm transition-colors duration-300 hover:text-deep-purple-accent-400"
                            >
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a
                                href="/"
                                className="text-sm transition-colors duration-300 hover:text-deep-purple-accent-400"
                            >
                                Terms &amp; Conditions
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}
