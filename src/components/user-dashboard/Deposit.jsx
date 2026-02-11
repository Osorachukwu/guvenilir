import { DollarSign } from 'lucide-react'
import React, { useState } from 'react'
import RedirectToMakePayment from './deposit/RedirectToMakePayment';

export default function Deposit() {
    const [icheck, setICheck] = useState(false)
    const [formData, setFormData] = useState({
        plan: 'Amateur',
        method: 'Bitcoin',
        amount: 100
    });

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleDepositClick = (e) => {
        e.preventDefault();

        // Check if form is completely filled
        const isFormFilled = formData.plan !== '' &&
            formData.method !== '' &&
            formData.amount !== '' &&
            formData.amount >= 100;

        // Update icheck based on form validation
        setICheck(isFormFilled);

        if (isFormFilled) {
            // Form is valid - you can switch components or proceed
            console.log('Form is valid, ready to switch components');
            console.log('Form data:', formData);

            // Here you would typically:
            // 1. Switch to another component
            // 2. Navigate to another page
            // 3. Show a confirmation modal
            // 4. Submit the data to an API

            // Example: If you have a parent component controlling the view
            // onDepositComplete(formData);
        } else {
            alert("Check fields")
        }
    }


    return (
        <div>
            {icheck ?
                <RedirectToMakePayment
                    plan={formData.plan}
                    method={formData.method}
                    amount={formData.amount}
                />
                :

                <form>
                    <p>check {icheck ? "tes" : "noo"}</p>
                    <h2 className="card-title mb-4 pl-2">Deposit Funds Plan: {formData.plan}, Method: {formData.method}, Amount: {formData.amount}</h2>

                    <div className='flex gap-4'>
                        <div className="card w-2/3 bg-base-300">
                            <div className="card-body">
                                <div>
                                    <p className='uppercase font-semibold mb-4'>Select Investment Plans</p>
                                    <select className="select w-full"
                                        name="plan"
                                        value={formData.plan}
                                        onChange={handleChange}
                                    >
                                        {/* <option value="" disabled={true}> Investment Plans</option> */}
                                        <option value="Amateur Plan">Amateur Plan</option>
                                        <option value="Standared">Standared</option>
                                        <option value="Premium Plan">Premium Plan</option>
                                        <option value="Retirement Plan">Retirement Plan</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="card w-1/3 bg-base-300">
                            <div className="card-body gap-3">
                                <p className='uppercase font-semibold mb-2'>Select Payment and enter amount</p>
                                <select className="select w-full"
                                    name='method'
                                    value={formData.method}
                                    onChange={handleChange}
                                >
                                    {/* <option value="" disabled={true}>Payment methods</option> */}
                                    <option value="Bitcoin">Bitcoin</option>
                                    <option value="Etherum">Etherum</option>
                                    <option value="BNB Smartchain">BNB Smartchain</option>
                                    <option value="USDT TRC20">USDT TRC20</option>
                                    <option value="BNB">BNB</option>
                                    <option value="USDT ERC20">USDT ERC20</option>
                                </select>
                                <label className="input w-full">
                                    <DollarSign size={16} />
                                    <input
                                        type="number"
                                        className="grow"
                                        placeholder="100.00"
                                        name='amount'
                                        min={100}
                                        value={formData.amount}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>

                                <p className='text-error text-xs -mt-2'>
                                    {formData.plan === 'Amateur' && formData.amount < 100 && "Must be 100"}
                                    {formData.plan === 'Standared' && formData.amount < 200 && "Must be 200"}
                                    {formData.plan === 'Premium Plan' && formData.amount < 200 && "Must be 200"}
                                    {formData.plan === 'Retirement Plan' && formData.amount < 200 && "Must be 200"}
                                </p>
                                <div>
                                    <button
                                        type="submit"
                                        className='btn btn-primary'
                                        onClick={handleDepositClick}
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            }
        </div>
    )
}