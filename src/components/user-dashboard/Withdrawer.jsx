import React from 'react'
import { Coffee, DollarSign } from 'lucide-react'

export default function Withdrawer() {
    return (
        <div className='flex gap-4'>

            <div className="card w-1/3 bg-base-300">
                <div className="card-body">
                    <div className='flex gap-2 justify-center items-center'>
                        <Coffee />
                        <span className='text-xl font-semibold'>No Funds to withdraw</span>

                    </div>

                </div>
            </div>
            {/*  */}

            <div className="card w-2/3 bg-base-300">
                <div className="card-body">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
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
                                {/* row 1 */}
                                {[1, 2, 3, 4, 5].map((item, i) => (
                                    <tr key={i}>
                                        <th>Bitcoin</th>
                                        <td>$0.00</td>
                                        <td>$0.00</td>
                                        <td>No withdrawal account</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
