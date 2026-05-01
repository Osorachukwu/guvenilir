import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Home } from 'lucide-react';
import ThemeSwitcher from '../components/ui/ThemeSwitcher';

export default function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
        terms: false,
        gender: '',
        country: ''
    });

    const [formError, setFormError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');

        // Validate passwords match for passwor and repeat-password (this is done both in the front and back)
        if (formData.password !== formData.repeatPassword) {
            setFormError('Passwords do not match');
            return;
        }

        // Validate terms acceptance checkbox
        if (!formData.terms) {
            setFormError('You must agree to the terms and conditions');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                fullname: formData.fullname,
                username: formData.username,
                email: formData.email,
                password: formData.password,
                repeatPassword: formData.repeatPassword

            });

            // Registration successful
            console.log('Registration successful:');

            // Optionally store the token if your backend returns one
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }

            // Redirect to UserLayout
            navigate('/login', {
                state: {
                    message: 'Register successful',
                    type: 'success'
                }
            });

        } catch (error) {
            // Handle errors
            if (error.response) {
                // Server responded with error
                setFormError(error.response.data.message || 'Registration failed. Please try again.');
            } else if (error.request) {
                // Request made but no response
                setFormError('Unable to connect to server. Please check your connection.');
            } else {
                // Something else happened
                setFormError('An unexpected error occurred. Please try again.');
            }
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='relative min-h-screen flex justify-center items-center'>
            <div className='hidden'>
                <ThemeSwitcher />
            </div>
            {/* <Link to="/" className='btn btn-square m-4 absolute'><Home size={16} /></Link> */}
            {/* Video Background md:min-h-[90vh] */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="/vid-2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            {/* Oavrlay */}
            <div className='bg-base-300/50 backdrop-blur-xs absolute inset-0 w-full h-full'></div>

            <div className='relative px-2 sm:px-3'>
                <form
                    onSubmit={handleSubmit}
                    className="bg-base-300/50 backdrop-blur-sm border-base-300 rounded-box border p-4 space-y-3 shadow-2xl max-w-lg"
                >
                    <div className='space-y-6 mb-8'>
                        <div>
                            <Link to="/" className="btn btn-primary text-xl">Crypto-Invest</Link>
                        </div>
                        <p className="text-lg font-semibold pl-3">
                            Get Started! <br />
                            <span className='text-sm font-normal line-clamp-2'>It's free to signup and only takes a minute.</span>
                        </p>
                    </div>


                    {/* Error Message */}
                    {formError && (
                        <div className="alert alert-error">
                            <span>{formError}</span>
                        </div>
                    )}

                    {/* Full Name */}
                    <input
                        type="text"
                        name="fullname"
                        placeholder="Enter your Full Name"
                        autoComplete="name"
                        className="input validator w-full"
                        required
                        minLength="3"
                        maxLength="50"
                        title="Please enter a valid full name"
                        value={formData.fullname}
                        onChange={handleChange}
                    />
                    <p className="validator-hint hidden -mt-5">
                        Must be 3 to 50 characters
                    </p>

                    {/* Username */}
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your Username"
                        autoComplete="username"
                        className="input validator w-full"
                        required
                        pattern="[A-Za-z0-9_\-]{3,30}"
                        minLength="3"
                        maxLength="30"
                        title="Only letters, numbers, dash or underscore"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <p className="validator-hint hidden -mt-5">
                        Must be 3 to 30 characters (letters, numbers, dash, underscore)
                    </p>

                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your Email"
                        autoComplete="email"
                        className="input validator w-full"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <p className="validator-hint hidden -mt-5">Enter valid email address</p>

                    {/* Password */}
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your Password"
                        autoComplete="new-password"
                        className="input validator w-full"
                        required
                        minLength="6"
                        title="Minimum 6 characters"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <p className="validator-hint hidden -mt-5">
                        Minimum 6 characters
                    </p>

                    {/* Confirm Password */}
                    <input
                        type="password"
                        name="repeatPassword"
                        placeholder="Confirm Password"
                        autoComplete="new-password"
                        className="input validator w-full"
                        required
                        minLength="6"
                        title="Passwords must match"
                        value={formData.repeatPassword}
                        onChange={handleChange}
                    />
                    <p className="validator-hint hidden -mt-5">
                        Passwords must match
                    </p>

                    {/* Terms */}
                    <div className='flex items-center gap-2'>
                        <input
                            type="checkbox"
                            name="terms"
                            checked={formData.terms}
                            onChange={handleChange}
                            required
                            className="checkbox checkbox-primary checkbox-sm validator" />
                        <p className='text-sm'>I agree to the
                            <Link to="#" className="link link-hover font-medium link-primary"> terms and conditions</Link>
                        </p>
                    </div>
                    <p className="validator-hint hidden text-xs -mt-3">You must agree to the terms and conditions</p>

                    {/* Buttons */}
                    <div className='flex flex-col'>
                        <button
                            className="btn btn-primary font-normal text-base"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account'}
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