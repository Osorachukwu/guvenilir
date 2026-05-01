import React from 'react'
import { Link } from 'react-router-dom'

export default function FirstChoice() {
    return (
        <div className='bg-primary py-8'>
            <div className='flex flex-col justify-between items-center sm:flex-row md:items-start  max-w-7xl border border-primary/50 mx-auto p-6 rounded-lg'>
                <div className='border border-gray-100 p-6 rounded-xl mb-10 sm:mb-0 bg-white/30 backdrop-blur-2xl text-2xl'>
                    <p>
                        <span className='text-3xl font-semibold'>
                            Investors #1 Choice
                        </span> <br />
                        CompanyName
                    </p>
                </div>
                <Link to="/register" className='btn btn-neutral px-8 py-4'>
                    Open your account 
                </Link>
            </div>
        </div>
    )
}
