import React from 'react'
import Faqs from '../components/Faqs'

export default function FAQs() {
    return (
        <div className='flex gap-6 mt-20 max-w-7xl mx-auto p-2'>
            <Faqs />

            <div className='w-1/3'>
                <div className="card bg-primary card-xl shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title">Need any help!</h2>
                        <p>Find answers to frequently asked questions about Emerald Holdings Limited</p>
                        <div className="card-actions mt-4">
                            <button className="btn b btn-lg text-base rounded-3xl">Contact us</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
