// hooks/useAuth.js

import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export function useAuth() {
    const navigate = useNavigate();
    
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        setLoading(true);
        try {
            const storedToken = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');

            if (storedToken) {
                setToken(storedToken);
                // Try to refresh full user data from the API (so we get timestamps)
                const API_URL = import.meta.env.VITE_API_URL || '/api';
                try {
                    const res = await fetch(`${API_URL}/auth/me`, {
                        headers: { 'Authorization': `Bearer ${storedToken}` }
                    });
                    if (!res.ok) throw res;
                    const data = await res.json();
                    const fetchedUser = data.user;
                    if (fetchedUser) {
                        setUser(fetchedUser);
                        localStorage.setItem('user', JSON.stringify(fetchedUser));
                        setIsAuthenticated(true);
                    } else if (storedUser) {
                        setUser(JSON.parse(storedUser));
                        setIsAuthenticated(true);
                    } else {
                        setIsAuthenticated(false);
                    }
                } catch (err) {
                    // If API call fails, fall back to stored user (if any)
                    if (storedUser) {
                        try { setUser(JSON.parse(storedUser)); setIsAuthenticated(true); }
                        catch (e) { setIsAuthenticated(false); }
                    } else {
                        setIsAuthenticated(false);
                    }
                }
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Error checking auth:', error);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const login = async (userData, userToken) => {
        localStorage.setItem('token', userToken);
        setToken(userToken);

        // Try to fetch full user data (includes timestamps) and store that
        const API_URL = import.meta.env.VITE_API_URL || '/api';
        try {
            const res = await fetch(`${API_URL}/auth/me`, {
                headers: { 'Authorization': `Bearer ${userToken}` }
            });
            if (!res.ok) throw res;
            const data = await res.json();
            const fetchedUser = data.user || userData;
            localStorage.setItem('user', JSON.stringify(fetchedUser));
            setUser(fetchedUser);
            setIsAuthenticated(true);
            return { user: fetchedUser, token: userToken };
        } catch (e) {
            // fallback to provided userData if fetch fails
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            setIsAuthenticated(true);
            return { user: userData, token: userToken };
        }
    };

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        
        navigate('/login');
    }, [navigate]);

    const updateUser = (updatedUserData) => {
        localStorage.setItem('user', JSON.stringify(updatedUserData));
        setUser(updatedUserData);
    };

    // AUTO LOGOUT FUNCTIONALITY
    useEffect(() => {
        // Only run auto-logout if user is authenticated
        if (!isAuthenticated) return;

        let timeout;
        const IDLE_TIME = 8 * 60 * 1000; // 15 minutes in milliseconds

        const resetTimer = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                console.log('Session expired due to inactivity');
                logout();
            }, IDLE_TIME);
        };

        // Events that indicate user activity
        const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'mousemove'];
        
        events.forEach(event => {
            window.addEventListener(event, resetTimer);
        });

        // Start the timer
        resetTimer();

        // Cleanup function
        return () => {
            clearTimeout(timeout);
            events.forEach(event => {
                window.removeEventListener(event, resetTimer);
            });
        };
    }, [isAuthenticated, logout]);

    const isAdmin = () => {
        return user?.role === 'admin';
    };

    const isUser = () => {
        return user?.role === 'user';
    };

    const hasRole = (role) => {
        return user?.role === role;
    };

    return {
        user,
        token,
        loading,
        isAuthenticated,
        login,
        logout,
        updateUser,
        checkAuth,
        isAdmin,
        isUser,
        hasRole
    };
}



// 
// 
// 
// 
// 
// 
// 
// 


// // hooks/useAuth.js

// // Import necessary React hooks and routing utilities
// import { useState, useEffect, useCallback } from 'react'
// import { useNavigate } from 'react-router-dom'

// // Custom authentication hook that manages user state, authentication status, and token handling
// export function useAuth() {
//     // Hook for programmatic navigation
//     const navigate = useNavigate();

//     // State for storing user information
//     const [user, setUser] = useState(null);
//     // State for storing authentication token
//     const [token, setToken] = useState(null);
//     // State to track loading status during auth checks
//     const [loading, setLoading] = useState(true);
//     // State to track overall authentication status
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     // Effect hook runs once on component mount to check authentication status
//     useEffect(() => {
//         checkAuth();
//     }, []); // Empty dependency array ensures this runs only once

//     // Function to check if user is authenticated by checking localStorage
//     const checkAuth = () => {
//         try {
//             // Retrieve token and user data from browser's localStorage
//             const storedToken = localStorage.getItem('token');
//             const storedUser = localStorage.getItem('user');

//             // If both token and user data exist, authenticate the user
//             if (storedToken && storedUser) {
//                 setToken(storedToken);
//                 setUser(JSON.parse(storedUser)); // Parse stored JSON string back to object
//                 setIsAuthenticated(true);
//             } else {
//                 // No credentials found, user is not authenticated
//                 setIsAuthenticated(false);
//             }
//         } catch (error) {
//             // Handle any errors during authentication check
//             console.error('Error checking auth:', error);
//             setIsAuthenticated(false);
//         } finally {
//             // Always set loading to false after auth check completes
//             setLoading(false);
//         }
//     };

//     // Function to log in user and store credentials
//     const login = (userData, userToken) => {
//         // Store token and user data in localStorage for persistence
//         localStorage.setItem('token', userToken);
//         localStorage.setItem('user', JSON.stringify(userData)); // Convert object to JSON string

//         // Update state with user data and token
//         setToken(userToken);
//         setUser(userData);
//         setIsAuthenticated(true);
//     };

//     // Function to log out user and clear all authentication data
//     const logout = () => {
//         // Remove credentials from localStorage
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');

//         // Clear user state
//         setToken(null);
//         setUser(null);
//         setIsAuthenticated(false);

//         // Redirect user to login page
//         navigate('/login');
//     };

//     // Function to update user information while maintaining authentication
//     const updateUser = (updatedUserData) => {
//         // Update user data in localStorage
//         localStorage.setItem('user', JSON.stringify(updatedUserData));
//         // Update user state
//         setUser(updatedUserData);
//     };

//     // AUTO LOGOUT FUNCTIONALITY 💥
//     useEffect(() => {
//         // Only run auto-logout if user is authenticated
//         if (!isAuthenticated) return;

//         let timeout;
//         const IDLE_TIME = 5 * 60 * 1000; // 15 minutes in milliseconds

//         const resetTimer = () => {
//             clearTimeout(timeout);
//             timeout = setTimeout(() => {
//                 console.log('Session expired due to inactivity');
//                 logout();
//             }, IDLE_TIME);
//         };
//         // Start the timer
//         resetTimer();

//         // Cleanup function
//         return () => {
//             clearTimeout(timeout);
//             events.forEach(event => {
//                 window.removeEventListener(event, resetTimer);
//             });
//         };
//     }, [isAuthenticated, logout]);

//     // Events that indicate user activity
//     const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'mousemove'];

//     events.forEach(event => {
//         window.addEventListener(event, resetTimer);
//     });

//     // Helper function to check if current user has admin role
//     const isAdmin = () => {
//         return user?.role === 'admin';
//     };

//     // Helper function to check if current user has regular user role
//     const isUser = () => {
//         return user?.role === 'user';
//     };

//     // Generic role checking function for any role
//     const hasRole = (role) => {
//         return user?.role === role;
//     };

//     // Return all state and functions for external use
//     return {
//         user,           // Current user object
//         token,          // Authentication token
//         loading,        // Loading state
//         isAuthenticated, // Boolean indicating if user is authenticated
//         login,          // Login function
//         logout,         // Logout function
//         updateUser,     // User update function
//         checkAuth,      // Manual auth check function
//         isAdmin,        // Admin check function
//         isUser,         // User role check function
//         hasRole         // Generic role check function
//     };
// }


