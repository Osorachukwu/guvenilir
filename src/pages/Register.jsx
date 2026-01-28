import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Register() {
    const { register, isLoading, error } = useAuth()
    const navigate = useNavigate()
    const [formError, setFormError] = useState('')

    const handleRegister = async (e) => {
        e.preventDefault()
        setFormError('')

        const fullname = e.target.fullname.value
        const username = e.target.username.value
        const email = e.target.email.value
        const password = e.target.password.value
        const repeatPassword = e.target.repeatPassword.value

        // Validate password match
        if (password !== repeatPassword) {
            setFormError('Passwords do not match')
            return
        }

        try {
            await register(fullname, username, email, password, repeatPassword)
            navigate('/user/dashboard')
        } catch (err) {
            setFormError(err.message || 'Registration failed. Please try again.')
        }
    }

    return (
        <div className=''>
            <div className='flex justify-center items-center h-screen'>
                <form onSubmit={handleRegister} className="fieldset bg-base-200 border-base-300 rounded-box w-lg border p-4 space-y-5">
                    <div>
                        <a className="btn btn-ghost text-xl">Crypto-Invest</a>
                    </div>
                    <p className="text-lg font-semibold pl-3">
                        Get Started! <br />
                        <span className='text-base font-normal line-clamp-2'>It's free to signup and only takes a minute.</span>
                    </p>

                    {/* Error Message */}
                    {(formError || error) && (
                        <div className="alert alert-error">
                            <span>{formError || error}</span>
                        </div>
                    )}

                    {/* Full Name */}
                    <input 
                        type="text" 
                        name="fullname"
                        placeholder="Enter your Full Name" 
                        className="input validator input-lg w-full"
                        required
                        minLength="3"
                        maxLength="50"
                        title="Please enter a valid full name" 
                    />
                    <p className="validator-hint hidden -mt-5">
                        Must be 3 to 50 characters
                    </p>

                    {/* Username */}
                    <input 
                        type="text" 
                        name="username"
                        placeholder="Enter your Username" 
                        className="input validator input-lg w-full"
                        required
                        pattern="[A-Za-z0-9_\-]{3,30}"
                        minLength="3"
                        maxLength="30"
                        title="Only letters, numbers, dash or underscore" 
                    />
                    <p className="validator-hint hidden -mt-5">
                        Must be 3 to 30 characters (letters, numbers, dash, underscore)
                    </p>

                    {/* Email */}
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Enter your Email" 
                        className="input validator input-lg w-full"
                        required
                    />
                    <p className="validator-hint hidden -mt-5">Enter valid email address</p>

                    {/* Password */}
                    <input 
                        type="password" 
                        name="password"
                        placeholder="Enter your Password" 
                        className="input validator input-lg w-full"
                        required
                        minLength="6"
                        title="Minimum 6 characters"
                    />
                    <p className="validator-hint hidden -mt-5">
                        Minimum 6 characters
                    </p>

                    {/* Confirm Password */}
                    <input 
                        type="password" 
                        name="repeatPassword"
                        placeholder="Confirm Password" 
                        className="input validator input-lg w-full"
                        required
                        minLength="6"
                        title="Passwords must match"
                    />
                    <p className="validator-hint hidden -mt-5">
                        Passwords must match
                    </p>

                    {/* Terms */}
                    <div className='flex items-center gap-2'>
                        <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" required />
                        <p className='text-sm'>I agree to the
                            <Link to="#" className="link link-hover link-primary"> terms and conditions</Link>
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className='flex flex-col'>
                        <button 
                            className="btn btn-lg btn-neutral font-normal text-base" 
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </button>
                        <Link to="/login" className='text-sm btn btn-lg btn-ghost font-normal'>Already have an account?
                            <span className="link link-hover link-primary"> Login</span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
