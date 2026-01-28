import { TriangleAlert } from 'lucide-react'
import React from 'react'

export default function ActiveDeposits() {
    return (
        <div className='space-y-4'>
            <p>Active Deposit</p>
            <div className="card bg-base-300">
                <div className="card-body">
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Plan</th>
                                    <th>Deposit Amount</th>
                                    <th>Daily Profit (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr>
                                    <th>Amateur</th>
                                    <td>$100.00 - $100000.00</td>
                                    <td>2.80</td>
                                </tr>
                                {/* row 2 */}
                                <tr>
                                    <td className='flex items-center gap-2'><TriangleAlert size={16} /> No Active Deposits for this plan</td>
                                    <td></td>
                                    <td></td>
                                </tr>

                            </tbody>
                        </table>
                        {/* <p>sksk</p> */}
                    </div>
                </div>
            </div>
            <div className="card bg-base-300">
                <div className="card-body">
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Plan</th>
                                    <th>Deposit Amount</th>
                                    <th>Daily Profit (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr>
                                    <th>Amateur</th>
                                    <td>$100.00 - $100000.00</td>
                                    <td>2.80</td>
                                </tr>
                                {/* row 2 */}
                                <tr>
                                    <td className='flex items-center gap-2'><TriangleAlert size={16} /> No Active Deposits for this plan</td>
                                    <td></td>
                                    <td></td>
                                </tr>

                            </tbody>
                        </table>
                        {/* <p>sksk</p> */}
                    </div>
                </div>
            </div>
            <div className="card bg-base-300">
                <div className="card-body">
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Plan</th>
                                    <th>Deposit Amount</th>
                                    <th>Daily Profit (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr>
                                    <th>Amateur</th>
                                    <td>$100.00 - $100000.00</td>
                                    <td>2.80</td>
                                </tr>
                                {/* row 2 */}
                                <tr>
                                    <td className='flex items-center gap-2'><TriangleAlert size={16} /> No Active Deposits for this plan</td>
                                    <td></td>
                                    <td></td>
                                </tr>

                            </tbody>
                        </table>
                        {/* <p>sksk</p> */}
                    </div>
                </div>
            </div>
            <div className="card bg-base-300">
                <div className="card-body">
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Plan</th>
                                    <th>Deposit Amount</th>
                                    <th>Daily Profit (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr>
                                    <th>Amateur</th>
                                    <td>$100.00 - $100000.00</td>
                                    <td>2.80</td>
                                </tr>
                                {/* row 2 */}
                                <tr>
                                    <td className='flex items-center gap-2'><TriangleAlert size={16} /> No Active Deposits for this plan</td>
                                    <td></td>
                                    <td></td>
                                </tr>

                            </tbody>
                        </table>
                        {/* <p>sksk</p> */}
                    </div>
                </div>
            </div>

            <div className='flex justify-center'>
                <div className="join grid grid-cols-2 max-w-80">
                    <button className="join-item btn btn-outline">Previous page</button>
                    <button className="join-item btn btn-outline">Next</button>
                </div>
            </div>

        </div>
    )
}
