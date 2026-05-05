import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

/**
 * Protects routes for regular users.
 * Redirects to /login if not authenticated, or to /new-a if admin.
 */
export function ProtectedUserRoute() {
    const token = localStorage.getItem("token")
    const username = localStorage.getItem("username")
    const userRole = localStorage.getItem("userRole")

    // Not logged in at all
    if (!token || !username) {
        return <Navigate to="/login" replace />
    }

    // Admin trying to access user routes
    if (userRole === "admin") {
        return <Navigate to="/new-a" replace />
    }

    // Valid user - render the child routes
    return <Outlet />
}

/**
 * Protects routes for admins.
 * Redirects to /login if not authenticated, or to /account if regular user.
 */
export function ProtectedAdminRoute({ children }) {
    const token = localStorage.getItem("token")
    const username = localStorage.getItem("username")
    const userRole = localStorage.getItem("userRole")

    // Not logged in at all
    if (!token || !username) {
        return <Navigate to="/login" replace />
    }

    // Regular user trying to access admin routes
    if (userRole === "user" || !userRole) {
        return <Navigate to="/account" replace />
    }

    // Valid admin - render the children
    return children
}