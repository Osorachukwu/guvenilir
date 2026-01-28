import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
    const { login, isLoading, error } = useAuth()
    const navigate = useNavigate()
    const [formError, setFormError] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        setFormError('')
        
        const email = e.target.email.value
        const password = e.target.password.value

        try {
            await login(email, password)
            navigate('/user/dashboard')
        } catch (err) {
            setFormError(err.message || 'Login failed. Please try again.')
        }
    }

    return (
        <div className=''>
            <div className='flex justify-center items-center h-screen'>
                <form onSubmit={handleLogin} className="fieldset bg-base-200 border-base-300 rounded-box w-lg border p-4 space-y-5">
                    <legend className="fieldset-legend">Login</legend>

                    {/* Error Message */}
                    {(formError || error) && (
                        <div className="alert alert-error">
                            <span>{formError || error}</span>
                        </div>
                    )}

                    {/* Email Field */}
                    <label className="input input-lg w-full validator">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </g>
                        </svg>
                        <input type="email" name="email" placeholder="mail@site.com" className='' required />
                    </label>
                    <div className="validator-hint hidden">Enter valid email address</div>

                    {/* Password Field */}
                    <label className="input input-lg w-full validator">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path
                                    d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                                ></path>
                                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                            </g>
                        </svg>
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="Password"
                            minLength="6"
                        />
                    </label>

                    {/* Register Link */}
                    <div className='flex items-center gap-2'>
                        <p className='text-sm'>Don't have an account?
                            <Link to="/register" className="link link-hover link-primary"> Register</Link>
                        </p>
                    </div>

                    {/* Submit Buttons */}
                    <div className='flex flex-col'>
                        <button 
                            className="btn btn-lg btn-neutral font-normal text-base" 
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                        <Link to="/forgot-password" className="btn btn-lg btn-ghost font-normal text-base">Forgot Password</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
