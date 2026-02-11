import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'
import { CheckCircle, CheckCircle2, ChevronLeft, KeyRound, Mail, XCircle } from 'lucide-react'
import TimedAlert from '../components/ui/TimedAlert'


export default function Login() {
    const navigate = useNavigate();
    const { login, loading } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [alert, setAlert] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    console.log("Naso " + alert)


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setAlert('');
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email: formData.email,
                password: formData.password
            });

            console.log('Login successful:', response.data);

            // Use the login function from useAuth hook and wait for it to finish
            const authResult = await login(response.data.user, response.data.token);

            // Redirect based on role (prefer the user returned from authResult)
            const role = authResult?.user?.role || response.data.user?.role;
            if (role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/user', {
                    state: { message: 'Login successful.' }
                });
            }
        } catch (error) {
            if (error.response) {
                setAlert({ type: 'error', text: error.response.data.message || 'Login failed. Please check your credentials.' });
                // error.response.data.message || 'Login failed. Please check your credentials.'
            } else if (error.request) {
                setAlert({ type: "error", text: 'New Unable to connect to server. Please check your connection.' });
            } else {
                setAlert('An unexpected error occurred. Please try again.');
            }
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    }

    //Registration succesfull alert
    const location = useLocation();
    // const [alert, setAlert] = useState(null);
    // console.log("Alert msg " + alert);

    //Recieving the message from the registration to know if it was succeful
    useEffect(() => {
        // Check if there's a message in the location state
        if (location.state?.message) {
            setAlert({
                text: location.state.message,
                type: location.state.type || 'success' // Default to 'success' if not provided
            });
        }
    }, [location]);



    // For testing💥💥💥
    //  const testAlert = (type = 'success') => {
    //     setAlert({
    //         text: `This is a ${type} alert for testing!`,
    //         type: type
    //     });
    // };



    return (
        <div className=''>

            {alert &&
                <TimedAlert
                    text={alert.text}
                    type={alert.type}
                />
            }

            <div className='flex justify-center items-center h-screen'>
                <div className='w-lg'>

                    <form
                        onSubmit={handleSubmit}
                        className="fieldset bg-base-300 border-base-300 rounded-box border p-4 space-y-3 mt-4"
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


                        {/* Email Field */}
                        <label className="input validator w-full">
                            <Mail size={17} className='text-base-content/60' />
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="Email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </label>
                        <p className="validator-hint hidden -mt-4">
                            Enter a valid email address
                        </p>

                        {/* Password Field */}
                        <label className="input w-full validator">
                            <KeyRound size={17} className='text-base-content/60' />
                            <input
                                type="password"
                                name="password"
                                required
                                placeholder="Password"
                                autoComplete="current-password"
                                minLength="6"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </label>
                        <p className="validator-hint hidden text-xs -mt-4">
                            Must be at least 6 characters
                        </p>

                        {/* Register Link */}
                        <div className='flex items-center gap-2'>
                            <p className='text-sm'>Don't have an account?
                                <Link to="/register" className="link link-hover link-primary"> Register</Link>
                            </p>
                        </div>

                        {/* Submit Buttons */}
                        <div className='flex flex-col'>
                            <button
                                className="btn btn-neutral font-normal text-base"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>
                            <Link to="/forgot-password" className="btn btn-ghost font-normal text-base">Forgot Password</Link>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}

// Admin User
// admin
// admin@email.com
// @adminUser123

// Random person
// random
// person1@email.com @personUser123


// Second User
// user2
// user2@email.com
// @anotherUser123