import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check localStorage on mount
        const token = localStorage.getItem("token")
        const username = localStorage.getItem("username")
        const userRole = localStorage.getItem("userRole")

        if (token && username) {
            setUser({ token, username, role: userRole })
        }
        setLoading(false)
    }, [])

    const isLoggedIn = !!user
    const isAdmin = user?.role === "admin"
    const isUser = user?.role === "user"

    const logout = () => {
        localStorage.clear()
        setUser(null)
    }

    const login = (userData) => {
        setUser(userData)
    }

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, isAdmin, isUser, logout, login, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)