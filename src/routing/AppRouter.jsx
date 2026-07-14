import React from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'
// import NavBar from '../components/nav/NavBar'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ActiveDeposits from '../components/user-dashboard/ActiveDeposits'
import NotFound from '../pages/NotFound'
import FAQs from '../pages/FAQs'
import UserProfile from '../components/user-dashboard/UserProfile'
import Support from '../pages/Support'
import Affiliate from '../pages/Affiliate'
import Bitcoin from '../pages/Bitcoin'
import OilAndGas from '../pages/OilAndGas'
import Loan from '../pages/Loan'
import NFP from '../pages/NFP'
import Footer from '../components/Footer'
import GoogleTranslateSwitcher from '../components/ui/GoogleTranslateSwitcher'
import { NavBar } from '../components/ui/nav/NavBar'
import ForexTrading from '../pages/services/ForexTrading'
import GoldInvestments from '../pages/services/GoldInvestments'
import RealEstate from '../pages/services/RealEstate'
import RetirmentPlanning from '../pages/services/RetirmentPlanning'
import CannabisInvestments from '../pages/services/CannabisInvestments'
import Cryptocurrency from '../pages/services/Cryptocurrency'
import FinancialPlanning from '../pages/services/FinancialPlanning'
import LoansAndGrants from '../pages/services/LoansAndGrants'
import ScrollToTop from '../components/ui/ScrollToTop'
import UserLayout from './user/UserLayout'
import Dashboard from './user/Dashboard'
import ConfirmDeposit from './user/ConfirmDeposit'
import Deposit from './user/Deposit'
import Account from './user/Account'
import Withdraw from './user/Withdraw'
import Referals from './user/Referals'
import AdminLayout from './admin/AdminLayout'
import { ProtectedAdminRoute, ProtectedUserRoute } from '../components/ProtectedRoute'
import ThemeSwitcher from '../components/ui/ThemeSwitcher'
import InvestmentPlans from '../pages/InvestmentPlans'
import WhatsAppWidget from '../components/WhatsAppWidget'

export default function AppRouter() {
    let currentPath = useLocation().pathname;
    // console.log(currentPath)

    const hideNavBarPaths = [
        "*",
        "/login",
        "/register",
        "/forgot-password",
        "/user",
        "/user/dashboard",
        "/user/deposit",
        "/user/withdraw",
        "/user/active-deposit",
        "/user/profile",
        "/admin",
        "/admin/test1",
        "/admin/test2",
        "/contact",
        "/user/account",
        "/user/deposit",
        "/user/withdraw",
        "/user/active-deposit",
        "/user/profile",
        "/admin",
        "/new-a",
        "/account",
        "/account/confirm-deposit",
        "/account/deposit",
        "/account/your-deposit",
        "/account/withdraw",
        "/account/edit-account",
        "/account/referrals",
    ];

    return (
        <>
            {/* {currentPath != "/login" && currentPath != "/register" && <NavBar />} */}
            
            {!hideNavBarPaths.includes(currentPath) && <NavBar />}
            {!hideNavBarPaths.includes(currentPath) && <GoogleTranslateSwitcher />}
            {/* <div className='flex justify-between items-center py-1 px-4 md:px-4 bg-base-100 border-b border-base-300 pb-2'>
                <div className='pt-2'><GoogleTranslateSwitcher /></div>
                <div><ThemeSwitcher /></div>
            </div> */}
            {/* <div className='hidden md:block'> */}
            {/* </div> */}
            <ScrollToTop />
            <WhatsAppWidget />
            <Routes>
                <Route path='*' element={<NotFound />} />
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                {/* <Route path="/contact" element={<Contact />} /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/support" element={<Support />} />
                <Route path="/plans" element={<InvestmentPlans />} />
                <Route path="/affiliate" element={<Affiliate />} />
                <Route path="/bitcoin" element={<Bitcoin />} />
                <Route path="/oil-and-gas" element={<OilAndGas />} />
                <Route path="/loan" element={<Loan />} />
                <Route path="/nfp" element={<NFP />} />
                {/* SErvices */}
                <Route path="/forex-trading" element={<ForexTrading />} />
                <Route path="/real-estate-investments" element={<RealEstate />} />
                <Route path="/gold-investments" element={<GoldInvestments />} />
                <Route path="/retirement-planning" element={<RetirmentPlanning />} />
                <Route path="/medical-cannabis" element={<CannabisInvestments />} />
                <Route path="/cryptocurrencies" element={<Cryptocurrency />} />
                <Route path="/financial-planning" element={<FinancialPlanning />} />
                <Route path="/oil-and-gas" element={<OilAndGas />} />
                <Route path="/loans-and-grants" element={<LoansAndGrants />} />


                {/* ────────── Protected Admin Routes 🎫💥 ────────── */}
                <Route
                    path="/new-a"
                    element={
                        <ProtectedAdminRoute>
                            <AdminLayout />
                        </ProtectedAdminRoute>
                    }
                />

                {/* ────────── Protected User Routes 👤💥 ────────── */}
                <Route element={<ProtectedUserRoute />}>
                    <Route path="/account" element={<UserLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="confirm-deposit" element={<ConfirmDeposit />} />
                        <Route path="deposit" element={<Deposit />} />
                        {/* <Route path="your-deposit" element={<YourDeposit />} /> */}
                        <Route path="edit-account" element={<Account />} />
                        <Route path="withdraw" element={<Withdraw />} />
                        <Route path="referrals" element={<Referals />} />
                    </Route>
                </Route>
            </Routes>

            {!hideNavBarPaths.includes(currentPath) && <Footer />}
        </>
    )
}
