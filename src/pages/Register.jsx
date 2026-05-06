import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Home, Eye, EyeClosed, User, Mail, KeyRound, Lock, FileText } from 'lucide-react';
import ThemeSwitcher from '../components/ui/ThemeSwitcher';
import Logo from '../components/ui/Logo';
import TimedAlert from '../components/ui/TimedAlert';
import { BASE_URL, BIZ, DOMAIN_KEY } from '../utils/constants';

export default function Register() {
    const navigate = useNavigate();

    const [passwordVisible, setPasswordVisible] = useState(false)
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
    const [alert, setAlert] = useState(null) // { text, type }
    const [isLoading, setIsLoading] = useState(false)
    const [agreedToTerms, setAgreedToTerms] = useState(false)
    const [termsWarning, setTermsWarning] = useState(false)

    const [formData, setFormData] = useState({
        fullname: "",
        username: "",
        email: "",
        password: "",
        repeatpassword: "",
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        if (type === "checkbox") {
            setAgreedToTerms(checked)
            if (checked) setTermsWarning(false)
        } else {
            setFormData(prev => ({ ...prev, [name]: value }))
        }
    }

    const handlePasswordVisible = () => setPasswordVisible(prev => !prev)
    const handleConfirmPasswordVisible = () => setConfirmPasswordVisible(prev => !prev)

    const validate = () => {
        if (!formData.fullname.trim()) return "Full name is required."
        if (!formData.username.trim()) return "Username is required."
        if (!formData.email.trim()) return "Email is required."
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Please enter a valid email address."
        if (formData.password.length < 8) return "Password must be at least 8 characters."
        if (formData.password !== formData.repeatpassword) return "Passwords do not match."
        return null
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setAlert(null)
        setTermsWarning(false)

        // Terms check
        if (!agreedToTerms) {
            setTermsWarning(true)
            return
        }

        const validationError = validate()
        if (validationError) {
            setAlert({ text: validationError, type: "error" })
            return
        }

        setIsLoading(true)

        try {
            const response = await axios.post(`${BASE_URL}/signup.php`, {
                fullname: formData.fullname.trim(),
                username: formData.username.trim(),
                email: formData.email.trim().toLowerCase(),
                password: formData.password,
                biz: BIZ,
                domainKey: DOMAIN_KEY,
                referrer: ""
            })

            const data = response.data
            console.log("Backend response:", JSON.stringify(data))

            const code = String(data?.code ?? "").trim()
            const msg = String(data?.msg ?? "").trim()

            if (code === "400") {
                setAlert({ text: msg || "Registration failed. Please try again.", type: "error" })
                return
            }

            if (msg.toLowerCase().includes("exists")) {
                setAlert({ text: "An account with this email or username already exists. Please log in or use different details.", type: "warning" })
                return
            }

            if (msg.toLowerCase().includes("successful")) {
                setAlert({ text: "Account created successfully! Redirecting to login...", type: "success" })
                setTimeout(() => {
                    navigate("/login", {
                        state: {
                            message: 'Account created successfully!',
                            type: 'success'
                        }
                    })
                }, 5000)
                return
            }

            console.warn("Unhandled backend response:", data)
            setAlert({ text: msg || "Something went wrong. Please try again.", type: "error" })

        } catch (err) {
            console.error("Registration error:", err)
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
            
            {/* Alert */}
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
            <div className='bg-base-300/50 backdrop-blur-xs absolute inset-0 w-full h-full'></div>

            <div className='relative px-2 sm:px-3 w-full max-w-lg'>
                <form
                    onSubmit={handleSubmit}
                    className="bg-base-300/50 backdrop-blur-sm border-base-300/50 rounded-box border p-6 space-y-4 shadow-2xl w-full"
                >
                    <div className='space-y-4 mb-6'>
                        <div>
                            <Logo />
                        </div>
                        <p className="text-lg font-semibold">
                            Get Started! <br />
                            <span className='text-sm font-normal line-clamp-2'>It's free to signup and only takes a minute.</span>
                        </p>
                    </div>

                    {/* Full Name */}
                    <div>
                        <label className="input validator w-full">
                            <User className="h-[1em] opacity-50" />
                            <input
                                type="text"
                                name="fullname"
                                placeholder="Full name"
                                autoComplete="name"
                                required
                                minLength="3"
                                maxLength="30"
                                pattern="[A-Za-z][A-Za-z0-9\- ]*"
                                title="Only letters, numbers or dash"
                                value={formData.fullname}
                                onChange={handleChange}
                            />
                        </label>
                        <p className="validator-hint hidden text-[10px]">Must be 3 to 30 characters containing only letters, numbers or dash</p>
                    </div>

                    {/* Username */}
                    <div>
                        <label className="input validator w-full">
                            <User className="h-[1em] opacity-50" />
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                autoComplete="username"
                                required
                                pattern="[A-Za-z][A-Za-z0-9\-]*"
                                minLength="3"
                                maxLength="30"
                                title="Only letters, numbers or dash"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </label>
                        <p className="validator-hint hidden text-[10px]">Must be 3 to 30 characters containing only letters, numbers or dash</p>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="input validator w-full">
                            <Mail className="h-[1em] opacity-50" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </label>
                        <p className="validator-hint hidden text-[10px]">Enter valid email address</p>
                    </div>

                    {/* Password with Key icon left and Eye toggle right */}
                    <div>
                        <label className="input validator w-full">
                            <KeyRound size={17} className='text-base-content/60' />
                            <input
                                type={passwordVisible ? "text" : "password"}
                                name="password"
                                required
                                placeholder="Password"
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
                    </div>

                    {/* Confirm Password with Key icon left and Eye toggle right */}
                    <div>
                        <label className="input w-full">
                            <KeyRound size={17} className='text-base-content/60' />
                            <input
                                type={confirmPasswordVisible ? "text" : "password"}
                                name="repeatpassword"
                                required
                                placeholder="Confirm password"
                                minLength="8"
                                value={formData.repeatpassword}
                                onChange={handleChange}
                            />
                            <button 
                                type="button" 
                                className='text-base-content/50 hover:text-base-content transition-colors'
                                onClick={handleConfirmPasswordVisible}
                            >
                                {confirmPasswordVisible ? <Eye size={17} /> : <EyeClosed size={17} />}
                            </button>
                        </label>
                    </div>

                    {/* Terms & Conditions */}
                    <div>
                        <div className='space-x-2 text-sm flex items-center'>
                            <input
                                type="checkbox"
                                name="terms"
                                className={`checkbox checkbox-primary checkbox-sm ${termsWarning ? 'checkbox-error' : ''}`}
                                checked={agreedToTerms}
                                onChange={handleChange}
                            />
                            <label>I agree to the 
                                <Link to="#" className="link link-hover font-medium link-primary"> terms and conditions</Link>
                            </label>
                        </div>
                        {termsWarning && (
                            <p className="text-error text-xs mt-1 ml-1">You must agree to the terms & conditions to continue.</p>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className='flex flex-col gap-2'>
                        <button
                            className="btn btn-primary w-full"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Creating Account...
                                </>
                            ) : 'Create Account'}
                        </button>
                        <Link to="/login" className='text-sm btn btn-ghost font-normal'>Already have an account?
                            <span className="link link-hover link-primary font-medium"> Login</span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}