import React, { useState } from 'react'
import { CopyableText } from '../../ui/CopyableText'
import { AlertCircle } from 'lucide-react'
import TimedAlert from '../../ui/TimedAlert';

export default function RedirectToMakePayment({ plan, method, amount }) {

    const [transactionId, setTransactionId] = useState("");
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const handleSaveDeposit = async (e) => {
        e.preventDefault();

        if (!transactionId.trim()) {
            setAlert({ type: 'error', text: 'Please enter a transaction ID' });
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/deposits/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    plan,
                    method,
                    amount,
                    transactionId
                })
            });

            let data;
            try {
                data = await response.json();
            } catch (e) {
                console.error('Invalid JSON response:', e);
                setAlert({ type: 'error', text: 'Server error - invalid response' });
                setLoading(false);
                return;
            }

            if (!response.ok) {
                setAlert({ type: 'error', text: data.message || 'Failed to save deposit' });
                setLoading(false);
                return;
            }

            // Success response
            setAlert({
                type: 'success',
                text: `Deposit saved successfully! Transaction ID: ${data.data.transactionId}`
            });

            // Clear form
            setTransactionId("");

            // Log the returned data
            console.log('Deposit saved successfully:', data.data);

        } catch (error) {
            console.error('Error saving deposit:', error);
            setAlert({ type: 'error', text: error.message || 'An error occurred. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setTransactionId("");
        setAlert(null);
    };


    return (
        <div className='space-y-8 px- py-8'>
            {/* Alert messages */}
            {alert && <TimedAlert type={alert.type} text={alert.text} />}
            <div className='max-w-md'>
                <p className='text-sm font-semibold mb-2'>Please send your payments to the following Ethereum wallet address:</p>
                <div className=''>
                    <CopyableText
                        text="0x60D6b9C543b29F767d4De23Cc882b08ed5855DD4"
                        mainStyle="bg-base-300 pl-3 py-1 shadow border border-base-200"
                        btnStyle="btn-sm"
                    />
                </div>
            </div>

            <p className='text-center text-2xl font-semibold'>Stay on this page to complete your order.</p>

            <form onSubmit={handleSaveDeposit} className='max-w-md'>
                {/* <div className='flex flex-col gap-2'>
                    <label htmlFor="" className='text-sm mr-4 font-semibold'>Transaction ID: </label>
                    <div className='flex items-center gap-3'>
                        <input type="text" placeholder="Type here" className="input w-full" required />
                        <div className='tooltip' data-tip="Required">
                            <AlertCircle className='text-base-content/50' />
                        </div>
                    </div>
                </div> */}
                <p className='text-sm font-semibold mb-2'>Transaction ID:</p>
                <label className="input w-full pr-1">
                    <input
                        className="grow validator"
                        type="text"
                        placeholder="Enter your Transaction ID here"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.currentTarget.value)} />
                    <span className="btn btn-sm btn-neutral btn-square">
                        <AlertCircle size={16} className='text-base-content/50' />
                    </span>
                </label>
                {/* buttons */}
                <div className='join space-x-2 mt-4'>
                    <button
                        type='submit'
                        className='join-item btn btn-primary'
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                        type='button'
                        onClick={handleCancel}
                        className='join-item btn btn-error btn-outline'
                    >
                        Cancel
                    </button>
                </div>
            </form>


            <div>
                <p className='border-b border-gray-600 pl-4 text-primary pb-1'>DEPOSIT CONFIRMATION</p>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        {/* <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Job</th>
                                <th>Favorite Color</th>
                            </tr>

                        </thead> */}
                        <tbody>
                            {[
                                { title: "Plan:", desc: plan },
                                { title: "Profit:", desc: "2.80% Daily for 5 days" },
                                { title: "Principal Return:", desc: "Yes" },
                                { title: "Principal Withdraw:", desc: "Not available" },
                                { title: "Credit Amount:", desc: `$${amount}.00` },
                                { title: "Deposit Fee:", desc: "0.00% + $0.00 (min. $0.00 max. $0.00)" },
                                { title: "Debit Amount:", desc: "$1000.00" },
                                { title: "Debit Amount:", desc: `$${amount}.00` }
                            ].map((item, i) => (
                                <tr key={i} className="hover:bg-base-300">
                                    <th className='w-2/3'>{item.title}</th>
                                    <td className='w-1/3'>{item.desc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/*  */}
            <div className='pl-4 text-sm flex justify-between bg-base-200 shadow-md'>
                <div className='w-2/3 py-4'>
                    <p>
                        Please send exact amount in Cryptocurrencies or more. <br />
                        Please do not use ETH Contract addresses as payment. Only regular ETH wallets.
                    </p>
                </div>
                <div className='w-1/3 pl-4 bg-base-300 py-4'>
                    <p>Deposit Amount (Total)<br />
                        <span className='text-2xl font-semibold'>${amount}.00</span>
                    </p>

                </div>
            </div>

        </div>
    )
}

// 0x4836924967397f268686612d4d9547d6d5427181f088390b14c35a646c2436f5
// 0x60D6b9C543b29F767d4De23Cc882b08ed5855DD4