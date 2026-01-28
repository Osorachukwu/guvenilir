import { Upload, User2, Users2, Users2Icon, Wallet } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function ThreeSteps() {
    return (
        <div>
            <p className='text-center text-4xl pb-8'>3 Simple Steps</p>
            <div className='flex'>
                {[
                    {
                        title: "Create An Account",
                        desc: "for an account with us to get started, it is easy and simple.",
                        icon: <Users2Icon size={50} />
                    },
                    {
                        title: "Make Deposit",
                        desc: "Deposit into any of our investment plans of your choice.",
                        icon: <Upload size={50} />
                    },
                    {
                        title: "Make Withdrawal",
                        desc: "You can withdraw as soon as your investment duration is completed.",
                        icon: <Wallet size={50} />
                    }].map((step, i) => (
                        <div key={i} className='h-96 bg-primary/30 flex-1 flex gap-4 flex-col justify-center items-center text-center px-10 group hover:text-white hover:border'>
                            {step.icon}
                            <p className='text-3xl font-semibold mt-6'>{step.title}</p>
                            <p>
                                {i === 0 && <Link to="">Sign up</Link>} {step.desc}
                            </p>
                        </div>
                    ))}
            </div>
        </div>
    )
}
