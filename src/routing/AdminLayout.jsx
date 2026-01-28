import { ChevronDown, UserRound } from 'lucide-react';
import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'

export default function AdminLayout() {
    const { isAuthenticated, isLoading, user, logout } = useAuth()
    const navigate = useNavigate()

    const handleItemClick = () => {
        document.activeElement.blur();
    };

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <div className='text-center'>
                    <span className='loading loading-spinner loading-lg'></span>
                    <p className='mt-4'>Loading...</p>
                </div>
            </div>
        )
    }

    // Redirect if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    // Redirect if user is not admin
    if (user?.role !== 'admin') {
        return (
            <div className='flex justify-center items-center h-screen'>
                <div className='alert alert-error max-w-md'>
                    <span>Access Denied - Admin Only</span>
                </div>
            </div>
        )
    }

    return (
        <div className=''>
            <div className="drawer lg:drawer-open">
                <input id="admin-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Navbar */}
                    <nav className="navbar w-full bg-base-200">
                        <div className="px-4 w-full flex justify-between">
                            <p>Admin Dashboard</p>
                            <div className='flex justify-center items-center gap-2'>
                                <div className='bg-base-100 rounded-2xl px-2 text-sm mr-10'>
                                    {new Date().toLocaleDateString()}
                                </div>
                                <div className="avatar">
                                    <div className="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
                                        <UserRound />
                                    </div>
                                </div>

                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="m-1 flex justify-center items-center text-sm cursor-pointer">
                                        {user?.fullname}
                                        <ChevronDown size={14} />
                                    </div>
                                    <ul tabIndex="-1" className="dropdown-content menu bg-gray-600 rounded-box z-1 w-40 p-2 shadow-md mt-2">
                                        <li onClick={handleItemClick}><a href="/user/profile">Edit Account</a></li>
                                        <li onClick={handleLogout}><a>Logout</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                    {/* Page content here */}
                    <main className='p-4'>
                        <Outlet />
                    </main>
                </div>

                {/* Sidebar */}
                <div className="drawer-side">
                    <label htmlFor="admin-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        <li><a href="/admin/test1">Admin Test 1</a></li>
                        <li><a href="/admin/test2">Admin Test 2</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
