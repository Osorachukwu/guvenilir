import React from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'
import NavBar from '../components/nav/NavBar'
import Login from '../pages/Login'
import Register from '../pages/Register'
import AdminLayout from './AdminLayout'
import ActiveDeposits from '../components/user-dashboard/ActiveDeposits'
import Deposit from '../components/user-dashboard/Deposit'
import Withdrawer from '../components/user-dashboard/Withdrawer'
import NotFound from '../pages/NotFound'
import FAQs from '../pages/FAQs'
import UserLayout from './UserLayout'
import UserProfile from '../components/user-dashboard/UserProfile'
import Dashboard from '../components/user-dashboard/Dashboard'
import Test1 from '../components/admin-dashboard/Test1'
import Test2 from '../components/admin-dashboard/Test2'
import Support from '../pages/Support'
import Affiliate from '../pages/Affiliate'
import Bitcoin from '../pages/Bitcoin'
import OilAndGas from '../pages/OilAndGas'
import Loan from '../pages/Loan'
import NFP from '../pages/NFP'

export default function AppRouter() {
    let currentPath = useLocation().pathname;
    console.log(currentPath)
    
    const hideNavBarPaths = [
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
        "/contact"
    ];

    return (
        <>
            {/* {currentPath != "/login" && currentPath != "/register" && <NavBar />} */}
            {!hideNavBarPaths.includes(currentPath) && <NavBar />}
            <Routes>
                <Route path='*' element={<NotFound />} />
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/support" element={<Support />} />
                <Route path="/affiliate" element={<Affiliate />} />
                <Route path="/bitcoin" element={<Bitcoin />} />
                <Route path="/oil-and-gas" element={<OilAndGas />} />
                <Route path="/loan" element={<Loan />} />
                <Route path="/nfp" element={<NFP />} />

                {/* User Dashboard Layout */}
                <Route path='/user' element={<UserLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="deposit" element={<Deposit />} />
                    <Route path="withdraw" element={<Withdrawer />} />
                    <Route path="active-deposit" element={<ActiveDeposits />} />
                    <Route path="profile" element={<UserProfile />} />
                </Route>
                {/* Admin Dashboard Layout */}
                <Route path='/admin' element={<AdminLayout />}>
                    <Route path='test1' element={<Test1 />} />
                    <Route path='test2' element={<Test2 />} />

                </Route>
            </Routes>
        </>
    )
}
