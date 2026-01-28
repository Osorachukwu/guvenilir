import React from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
    return (
        <div className=''>
            <div className='flex justify-center items-center h-screen'>
                <form className="fieldset bg-base-200 border-base-300 rounded-box w-lg border p-4 space-y-5">
                    <div>
                        <a className="btn btn-ghost text-xl">daisyUI</a>
                    </div>
                    <p className="text-lg font-semibold pl-3">
                        Get Started! <br />
                        <span className='text-base font-normal line-clamp-2'>It's free to signup and only takes a minute.</span>
                    </p>

                    {/*  */}
                    <input type="text" placeholder="Enter your Full Name" className="input validator input-lg w-full"
                        required
                        pattern="[A-Za-z][A-Za-z0-9\-]*"
                        minLength="3"
                        maxLength="30"
                        title="Only letters, numbers or dash" />
                    <p className="validator-hint hidden -mt-5">
                        Must be 3 to 30 characters
                        <br />containing only letters, numbers or dash
                    </p>

                    <input type="text" placeholder="Enter your Username" className="input validator input-lg w-full"
                        required
                        pattern="[A-Za-z][A-Za-z0-9\-]*"
                        minLength="3"
                        maxLength="30"
                        title="Only letters, numbers or dash" />
                    <p className="validator-hint hidden -mt-5">
                        Must be 3 to 30 characters
                        <br />containing only letters, numbers or dash
                    </p>

                    <input type="email" placeholder="Enter your Email" className="input validator input-lg w-full" />
                    <p className="validator-hint hidden -mt-5">Enter valid email address</p>

                    <input type="password" placeholder="Enter your Password" className="input validator input-lg w-full"
                        required
                        minLength="8"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                    />
                    <p className="validator-hint hidden -mt-5">
                        Must be more than 8 characters, including
                        <br />At least one number
                        <br />At least one lowercase letter
                        <br />At least one uppercase letter
                    </p>
                    <input type="password" placeholder="Confirm Password" className="input validator input-lg w-full"
                        required
                        minLength="8"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                    />
                    <p className="validator-hint hidden -mt-5">
                        Must be more than 8 characters, including
                        <br />At least one number
                        <br />At least one lowercase letter
                        <br />At least one uppercase letter
                    </p>

                    {/*  */}
                    <div className='flex items-center gap-2'>
                        <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
                        <p className='text-sm'>I agree to the
                            <Link to="" className="link link-hover link-primary"> terms and conditions</Link>
                        </p>
                    </div>
                    <div className='flex flex-col'>
                        <button className="btn btn-lg btn-neutral font-normal text-base" type="submit">Create Account</button>
                        <button className='text-sm btn btn-lg btn-ghost font-normal'>Already have an account?
                            <Link to="/login" className="link link-hover link-primary"> Login</Link>
                        </button>
                    </div>



                    {/* <Link className="btn btn-lg btn-ghost">Forgot Password</Link> */}
                </form>
            </div>
        </div>
    )
}
