import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CheckCircle, CheckCircle2, ChevronLeft, Eye, EyeClosed, KeyRound, Mail, XCircle } from 'lucide-react'
import TimedAlert from '../components/ui/TimedAlert'
import ThemeSwitcher from '../components/ui/ThemeSwitcher'
import Logo from '../components/ui/Logo'

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [alert, setAlert] = useState(null) // { text, type }
    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })

    // Check if already logged in
    const token = localStorage.getItem("token")
    const userRole = localStorage.getItem("userRole")

    // Handle redirects based on existing session
    useEffect(() => {
        if (token && userRole === "admin") {
            navigate("/new-a")
        } else if (token && userRole === "user") {
            navigate("/account")
        }
    }, [token, userRole, navigate])

    // Registration success alert from location state
    useEffect(() => {
        if (location.state?.message) {
            setAlert({
                text: location.state.message,
                type: location.state.type || 'success'
            });
            // Clear the location state to prevent showing again on refresh
            window.history.replaceState({}, document.title)
        }
    }, [location]);

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handlePasswordVisible = () => setPasswordVisible(prev => !prev)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setAlert(null)

        if (!formData.username.trim()) {
            setAlert({ text: "Username is required.", type: "error" })
            return
        }
        if (!formData.password) {
            setAlert({ text: "Password is required.", type: "error" })
            return
        }

        setIsLoading(true)

        try {
            const response = await axios.post("https://invest.esbatech.org/login.php", {
                userData: formData.username.trim(),
                password: formData.password,
                biz: "bank"
            })

            const data = response.data
            const code = String(data?.code ?? "").trim()
            const msg = data?.msg

            if (code === "200" && typeof msg === "object") {
                const { token, user } = msg
                // Store common data
                localStorage.setItem("token", token)
                localStorage.setItem("userRole", user.who) 
                localStorage.setItem("username", user.username)
                localStorage.setItem("fullname", user.fullname)
                localStorage.setItem("email", user.email)
                localStorage.setItem("regDate", user.date)
                localStorage.setItem("btcAd", user.btcAd)
                localStorage.setItem("ethAd", user.ethAd)
                localStorage.setItem("bnbSmartAd", user.bnbSmartAd)
                localStorage.setItem("bnbAd", user.bnbAd)
                localStorage.setItem("usdtTrcAd", user.usdtTrcAd)
                localStorage.setItem("usdtErcAd", user.usdtErcAd)

                setAlert({ text: "Login successful! Redirecting...", type: "success" })

                setTimeout(() => {
                    // Redirect based on user role
                    if (user.who === "admin") {
                        navigate("/new-a")
                    } else {
                        navigate("/account")
                    }
                }, 2000)

            } else if (code === "202") {
                // Keep this as fallback for any legacy response format
                const userId = data?.note
                localStorage.setItem("adminData", userId)
                navigate("/new-a")

            } else {
                setAlert({ text: typeof msg === "string" ? msg : "Login failed. Please try again.", type: "error" })
            }

        } catch (err) {
            console.error("Login error:", err)
            setAlert({ text: "Network error. Please check your connection and try again.", type: "error" })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='relative min-h-screen flex justify-center items-center'>
            <div className='hidden'>
                <ThemeSwitcher />
            </div>

            {alert && (
                <TimedAlert
                    text={alert.text}
                    type={alert.type}
                    duration={5000}
                    onClose={() => setAlert(null)}
                />
            )}
            
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="/auth-vid.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            
            {/* Overlay */}
            <div className='bg-base-300/20 backdrop-blu absolute inset-0 w-full h-full'></div>

            <div className='relative px-2 sm:px-3 w-full max-w-lg'>
                <form
                    onSubmit={handleSubmit}
                    className="bg-base-300/50 backdrop-blur-sm border-base-300/50 rounded-box border p-6 space-y-4 shadow-2xl w-full"
                >
                    <div className='space-y-6 mb-8'>
                        <div>
                            <Logo />
                        </div>
                        <p className="text-lg font-semibold pl-3">
                            Welcome Back! <br />
                            <span className='text-sm font-normal line-clamp-2'>Sign in to access your account and continue your journey.</span>
                        </p>
                    </div>

                    {/* Username Field (changed from email) */}
                    <label className="input validator w-full">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </g>
                        </svg>
                        <input
                            type="text"
                            name="username"
                            required
                            placeholder="Username"
                            autoComplete="username"
                            pattern="[A-Za-z][A-Za-z0-9\-]*"
                            minLength="3"
                            maxLength="30"
                            title="Only letters, numbers or dash"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </label>
                    <p className="validator-hint hidden text-[10px]">
                        Must be 3 to 30 characters containing only letters, numbers or dash
                    </p>

                    {/* Password Field with visibility toggle */}
                    <label className="input w-full validator">
                        <KeyRound size={17} className='text-base-content/60' />
                        <input
                            type={passwordVisible ? "text" : "password"}
                            name="password"
                            required
                            placeholder="Password"
                            autoComplete="current-password"
                            minLength="8"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <button 
                            type="button" 
                            className='text-base-content/50 hover:text-base-content transition-colors'
                            onClick={handlePasswordVisible}
                        >
                            {passwordVisible ? <Eye size={17} /> : <EyeClosed size={17} />}
                        </button>
                    </label>
                    <p className="validator-hint hidden text-[10px]">
                        Must be more than 8 characters, including
                        <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
                    </p>

                    {/* Forgot Password Link */}
                    <div className='flex justify-end'>
                        <Link to="/forgot-password" className="link link-hover link-primary text-sm">
                            Forgot your password?
                        </Link>
                    </div>

                    {/* Register Link */}
                    <div className='flex items-center gap-2'>
                        <p className='text-sm'>Don't have an account?
                            <Link to="/register" className="link link-hover link-primary font-medium"> Register</Link>
                        </p>
                    </div>

                    {/* Submit Button */}
                    <div className='flex flex-col'>
                        <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Signing in...
                                </>
                            ) : 'Sign in'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}