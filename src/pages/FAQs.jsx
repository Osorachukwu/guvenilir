import React from 'react'
import Faqs from '../components/Faqs'

export default function FAQs() {
    return (
        <div className='flex gap-6 mt-20 max-w-7xl mx-auto p-2'>
            <Faqs />

            <div className='w-1/3'>
                <div className="card bg-base-100 card-xl shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title">Xlarge Card</h2>
                        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                        <div className="card-actions">
                            <button className="btn btn-primary btn-lg text-base rounded-full">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
