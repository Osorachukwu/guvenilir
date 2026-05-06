import { useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const TIMEOUT_MINUTES = 15
const TIMEOUT_MS = TIMEOUT_MINUTES * 60 * 1000
const EXPIRY_KEY = 'inactivityExpiresAt'

export default function useInactivityLogout() {
    const navigate = useNavigate()
    const timerRef = useRef(null)

    const logout = useCallback(() => {
        // Clear inactivity timestamp
        localStorage.removeItem(EXPIRY_KEY)

        // Clear all auth data
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("userRole")
        localStorage.removeItem("fullname")
        localStorage.removeItem("email")
        localStorage.removeItem("date")
        localStorage.removeItem("btcAd")
        localStorage.removeItem("ethAd")
        localStorage.removeItem("bnbSmartAd")
        localStorage.removeItem("bnbAd")
        localStorage.removeItem("usdtTrcAd")
        localStorage.removeItem("usdtErcAd")
        localStorage.removeItem("note")
        localStorage.removeItem("adminData")
        localStorage.removeItem("regDate")

        // Redirect to login
        navigate("/login", { replace: true })
    }, [navigate])

    const setExpiry = useCallback(() => {
        const expiresAt = Date.now() + TIMEOUT_MS
        localStorage.setItem(EXPIRY_KEY, expiresAt.toString())
        return expiresAt
    }, [])

    const resetTimer = useCallback(() => {
        // Clear existing timeout
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }

        // Set new expiry and start countdown
        const expiresAt = setExpiry()
        const remainingMs = expiresAt - Date.now()

        timerRef.current = setTimeout(logout, remainingMs)
    }, [logout, setExpiry])

    useEffect(() => {
        // Check if already expired (e.g., user closed tab and came back later)
        const storedExpiry = localStorage.getItem(EXPIRY_KEY)

        if (storedExpiry) {
            const expiresAt = parseInt(storedExpiry, 10)

            if (Date.now() >= expiresAt) {
                // Timer already expired - logout immediately
                logout()
                return
            }

            // Timer hasn't expired yet - set timeout for remaining time
            const remainingMs = expiresAt - Date.now()
            timerRef.current = setTimeout(logout, remainingMs)
        }

        // Activity events that reset the timer
        const events = ['mousedown', 'keydown', 'scroll', 'touchstart']

        events.forEach(event => {
            window.addEventListener(event, resetTimer)
        })

        // Handle tab visibility changes
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                // User returned to tab - check expiry
                const currentExpiry = localStorage.getItem(EXPIRY_KEY)

                if (currentExpiry) {
                    const expiresAt = parseInt(currentExpiry, 10)

                    if (Date.now() >= expiresAt) {
                        // Expired while tab was hidden
                        logout()
                    } else {
                        // Still valid - reset to give full time
                        resetTimer()
                    }
                }
            }
        }
        document.addEventListener('visibilitychange', handleVisibilityChange)

        // Also set initial expiry if not set (first mount)
        if (!storedExpiry) {
            setExpiry()
        }

        // Cleanup
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
            }
            events.forEach(event => {
                window.removeEventListener(event, resetTimer)
            })
            document.removeEventListener('visibilitychange', handleVisibilityChange)
        }
    }, [logout, resetTimer, setExpiry])

    return { logout, resetTimer }
}