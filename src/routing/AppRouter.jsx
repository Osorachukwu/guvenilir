import React from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'
import NavBar from '../components/nav/NavBar'
import Login from '../pages/Login'
import Register from '../pages/Register'
import AdminLayout from './UserLayout'
import ActiveDeposits from '../components/user-dashboard/ActiveDeposits'
import Dashboard from '../components/user-dashboard/Dashboard'
import Deposit from '../components/user-dashboard/Deposit'
import Withdrawer from '../components/user-dashboard/Withdrawer'
import NotFound from '../pages/NotFound'
import FAQs from '../pages/FAQs'
import UserLayout from './UserLayout'
import UserProfile from '../components/user-dashboard/UserProfile'

export default function AppRouter() {
    let currentPath = useLocation().pathname;
    console.log(currentPath)
    const hideNavBarPaths = [
        "/login",
        "/register",
        "/forgot-password",
        "/user/dashboard",
        "/user/deposit",
        "/user/withdraw",
        "/user/active-deposit",
        "/user/profile"
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

                {/* User Dashboard Layout */}
                <Route element={<UserLayout />}>
                    <Route path='/user/dashboard' element={<Dashboard />} />
                    <Route path="/user/deposit" element={<Deposit />} />
                    <Route path="/user/withdraw" element={<Withdrawer />} />
                    <Route path="/user/active-deposit" element={<ActiveDeposits />} />
                    <Route path="/user/profile" element={<UserProfile />} />
                </Route>
                {/* Admin Dashboard Layout */}
                <Route element={<AdminLayout />}>
                    <Route path='/admin/test1' element={<Dashboard />} />
                    <Route path='/admin/test2' element={<Dashboard />} />

                </Route>
            </Routes>
        </>
    )
}
