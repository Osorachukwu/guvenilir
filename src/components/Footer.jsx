import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './ui/Logo'

export default function Footer() {
    return (
        <footer className='relative bg-gradient-to-b from-base-200 to-base-300 overflow-hidden border-t border-base-300/30'>
            {/* CSS-only background pattern */}
            <div className='absolute inset-0 -z-10'>
                {/* Grid pattern - more visible */}
                <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(168,240,2,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(168,240,2,0.5) 1px, transparent 1px)
                        `,
                        backgroundSize: '80px 80px'
                    }}
                />
                
                {/* Large glowing orbs for depth */}
                <div className="absolute -top-60 -right-40 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-20 w-[400px] h-[400px] bg-success/8 rounded-full blur-3xl" />
                <div className="absolute top-1/3 left-1/3 w-[350px] h-[350px] bg-info/5 rounded-full blur-3xl" />
                
                {/* Subtle radial lines */}
                <div 
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `
                            repeating-linear-gradient(
                                45deg,
                                transparent,
                                transparent 30px,
                                rgba(255,255,255,0.5) 30px,
                                rgba(255,255,255,0.5) 31px
                            )
                        `
                    }}
                />
                
                {/* Dot pattern overlay */}
                <div 
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(168,240,2,0.8) 1px, transparent 1px)',
                        backgroundSize: '24px 24px'
                    }}
                />
            </div>
            
            {/* Darker gradient overlay so text is readable */}
            <div className='absolute inset-0 bg-gradient-to-t from-base-300/97 via-base-300/90 to-base-200/70 -z-[5]' />

            <div className="relative z-10 px-4 pt-16 md:pt-28 md:px-24 lg:px-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
                <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="sm:col-span-2" data-aos="fade-up">
                        <div
                            href="/"
                            aria-label="Go home"
                            title="Company"
                            className="inline-flex items-center"
                        >
                            <Logo />
                        </div>
                        <div className="mt-6 lg:max-w-sm">
                            <p className="leading-6 text-base-content/80">
                                We are everything a traditional financial institution is not. We set out to give investors better, simpler and more profitable ways to become financially successful and secure.
                            </p>
                        </div>
                    </div>
                    <div className="space-y-2 text-sm" data-aos="fade-up" data-aos-delay="100">
                        <p className="text-base font-bold tracking-wide text-primary">
                            Contacts
                        </p>
                        <div className="flex">
                            <p className="mr-1 text-base-content/70">Phone:</p>
                            <a
                                href="tel:+447492218174"
                                aria-label="Our phone"
                                title="Our phone"
                                className="transition-colors duration-300 hover:text-primary"
                            >
                                +447492218174
                            </a>
                        </div>
                        <div className="flex">
                            <p className="mr-1 text-base-content/70">Email:</p>
                            <a
                                href="mailto:support@glassdoorholding.com"
                                aria-label="Our email"
                                title="Our email"
                                className="transition-colors duration-300 hover:text-primary"
                            >
                                support@glassdoorholding.com
                            </a>
                        </div>
                        <div className="flex">
                            <p className="mr-1 text-base-content/70">Address:</p>
                            <a
                                href="https://www.google.com/maps"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Our address"
                                title="Our address"
                                className="transition-colors duration-300 hover:text-primary"
                            >
                                312 Lovely Street, NY
                            </a>
                        </div>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="200">
                        <p className="text-base font-bold tracking-wide text-primary mb-2">
                            Quick Links
                        </p>
                        <nav>
                            <ul className='space-y-2'>
                                <li>
                                    <Link to="/about" className="text-base-content/70 hover:text-primary transition-colors text-sm">About us</Link>
                                </li>
                                <li>
                                    <Link to="/privacy" className="text-base-content/70 hover:text-primary transition-colors text-sm">Privacy</Link>
                                </li>
                                <li>
                                    <Link to="/legal" className="text-base-content/70 hover:text-primary transition-colors text-sm">Legal</Link>
                                </li>
                                <li>
                                    <Link to="/support" className="text-base-content/70 hover:text-primary transition-colors text-sm">Get Support</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                
                <div className='my-8 space-y-4' data-aos="fade-up">
                    <p className='text-2xl font-semibold text-primary'>RISK DISCLAIMER</p>
                    <p className='text-sm leading-6 text-base-content/70'>
                        Nothing contained in this website should be construed as a solicitation or offer, or recommendation, to acquire or dispose of any investment or to engage in any other transaction. The information provided herein is not intended for distribution to, or use by, any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation. Some services may not be available to certain investors due to regulatory or other constraints either in UK, the United States or elsewhere. It is advised that most services are only available following completion of the Customer Agreement and/or any other relevant documentation as required. Investments in securities or financial instruments (including digital currencies, futures, options, contracts for differences, spot and forward foreign exchange contracts) can fluctuate in value. Accordingly, you should be aware that you might not realise the initial amount invested and indeed may incur additional liabilities as investments in securities or financial instruments may entail above average risk. You must therefore carefully consider whether your financial circumstances permit you to invest. Glassdoor Holdingsings Limited strongly suggests that you seek the advice of an independent financial advisor in this regard.
                    </p>
                </div>
                
                <div className="flex flex-col-reverse justify-between pt-6 pb-10 border-t border-base-content/10 lg:flex-row">
                    <p className="text-sm text-base-content/50">
                        © Copyright 2020 Glassdoor Holdings. All rights reserved.
                    </p>
                    <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
                        <li>
                            <Link to="/faq" className="text-sm text-base-content/50 hover:text-primary transition-colors duration-300">
                                F.A.Q
                            </Link>
                        </li>
                        <li>
                            <Link to="/privacy" className="text-sm text-base-content/50 hover:text-primary transition-colors duration-300">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link to="/terms" className="text-sm text-base-content/50 hover:text-primary transition-colors duration-300">
                                Terms &amp; Conditions
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}