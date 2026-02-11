import React from 'react'

export default function Faqs() {
    return (
        <div className='w-2/3 pb-8'>
            <p className='text-3xl mb-8 leading-10'>
                <span className='text-base'>Our FAQ</span> <br />
                Frequently Asked Questions
            </p>
            <div className='join join-vertical space-y-1'>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, i) => (
                    <div key={i} className="join-item collapse collapse-arrow bg-base-300 border border-base-300">
                        <input type="radio" name="my-accordion-2" defaultChecked={i === 1} />
                        <div className="collapse-title font-semibold text-base">How do I create an account?</div>
                        <div className="collapse-content text-sm md:text-base">Emerald Holdings Limited our company provides a full investment service focused on the bitcoin and cryptocurrency market We are among the best platforms to invest and grow your bitcoin and other cryptocurrency.</div>
                    </div>
                ))}


            </div>
        </div>
        // <div className="join join-vertical bg-base-100 w-2/3">
        //     <div className="collapse collapse-arrow join-item border-base-300 border">
        //         <input type="radio" name="my-accordion-4" defaultChecked />
        //         <div className="collapse-title font-semibold">How do I create an account?</div>
        //         <div className="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
        //     </div>
        //     <div className="collapse collapse-arrow join-item border-base-300 border">
        //         <input type="radio" name="my-accordion-4" />
        //         <div className="collapse-title font-semibold">I forgot my password. What should I do?</div>
        //         <div className="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
        //     </div>
        //     <div className="collapse collapse-arrow join-item border-base-300 border">
        //         <input type="radio" name="my-accordion-4" />
        //         <div className="collapse-title font-semibold">How do I update my profile information?</div>
        //         <div className="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
        //     </div>
        // </div>


    )
}
