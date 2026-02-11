import { Ban, CheckCircle2, ChevronDown, ChevronRight, CopyIcon, Hourglass, TriangleAlert, UserRound, X } from 'lucide-react'
import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { CopyableText } from '../components/ui/CopyableText';


export default function AdminLayout() {
    const { user, loading, isAuthenticated, logout, isUser } = useAuth();
    const handleItemClick = () => {
        document.activeElement.blur();
    };

    const [formData, setFormData] = useState({
        depositaction: '',
        withdrawalaction: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }



    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content">
                {/* Page content here */}
                {/* Nav */}
                <nav className='bg-base-300'>
                    <div className='flex justify-end items-center gap-2'>
                        <div className='bg-base-300 rounded-2xl px-3 py-1 mr-10 shadow-lg text-xs'>
                            {/* {currentDate} */}
                            Date
                        </div>
                        <div className="avatar">
                            <div className="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
                                <UserRound />
                            </div>
                        </div>

                        <div className="dropdown dropdown-end dropdown-hover">
                            <div tabIndex={0} role="button" className="m-1 flex gap-2 justify-center items-center text-sm cursor-pointer bg-base-100 p-2 rounded">
                                {/* {user?.fullname || user?.username} */} Admin
                                <ChevronDown size={14} />
                            </div>
                            <ul tabIndex="-1" className="dropdown-content menu bg-gray-600 rounded-box z-1 w-40 p-2 shadow-md mt-1">
                                <li onClick={handleItemClick}>
                                    <Link to="/user/settings">Edit Account</Link>
                                </li>
                                <li onClick={handleItemClick}>
                                    <button onClick={logout}>Logout</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {/* Nav */}

                {/* deposits & Withdrawals */}
                <div className='p-8'>
                    <div className="flex items-center gap-3 mb-10">
                        <div className="avatar">
                            <div className="mask mask-squircle h-10 w-10">
                                <img
                                    src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                    alt="Avatar Tailwind CSS Component" />
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">Hart Hagerty</div>
                            <div className="text-sm opacity-50 hidden md:block">harthagerty@gmail.com</div>
                        </div>
                    </div>
                    {/*  */}
                    <div>
                        <p className='text-xl font-semibold mb-4 bg-base-300 px-3 py-2'>Deposits</p>
                        <div className="overflow-x-auto mb-20">
                            <table className="table table-sm md:table-sm table-pin-rows table-pin-cols">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <td>Status</td>
                                        <td>Plan</td>
                                        <td>Amount</td>
                                        <td>Date</td>
                                        <td>Transaciton id</td>
                                        <td>Deposit Actions</td>
                                        {/* <td>Withdrawal Request</td> */}
                                        <td>Withdrawal Actions</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[1, 2, 3].map((item, i) => (
                                        <tr key={i} className="hover:bg-base-200">
                                            <th>{i + 1}</th>
                                            <td>
                                                <div className="badge items-center rounded-full badge-success px-1"><CheckCircle2 size={14} /> Progress</div>
                                                {/* <div className="badge badge-sm rounded-full badge-warning px-1"><TriangleAlert size={16} /> Completed</div> */}
                                                {/* <div className="badge badge-sm rounded-full badge-error px-1"><Ban size={16} />Withdrawn</div> */}
                                            </td>
                                            <td>Premium</td>
                                            <td>$500</td>
                                            <td>19/05/2024</td>
                                            <td>
                                                <CopyableText text="0x4836924967397f268686612d4d9547d6d5427181f088390b14c35a646c2436f5"
                                                    mainStyle="max-w-[150px]"
                                                    btnStyle="btn-xs ml-1" />
                                            </td>
                                            <td>
                                                <select
                                                    className="select select-sm"
                                                    name='depositaction'
                                                    value={formData.depositaction}
                                                    onChange={handleChange}
                                                >
                                                    <option class="text-warning" value="" disabled>Pending</option>
                                                    <option value="approved" class="text-success">Approved</option>
                                                    <option value="cancelled" class="text-error">Cancelled</option>
                                                </select>
                                            </td>
                                            <td>
                                                <div className="indicator w-full">
                                                    <span className="indicator-item badge badge-secondary text-xs px-1">16/2/25</span>
                                                    {/* <span className="indicator-item status status-warning"></span> */}
                                                    <select
                                                        className="select select-sm"
                                                        name='withdrawalaction'
                                                        value={formData.withdrawalaction}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="" class="text-warning">Pending</option>
                                                        <option value="approved" class="text-success">Approved</option>
                                                        <option value="cancelled" class="text-error">Cancelled</option>
                                                    </select>
                                                </div>

                                            </td>
                                            <th className='md:hidden'>{i + 1}</th>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    </div>
                    {/* Withdrawal */}
                    {/* <div>
                        <p className='text-xl font-semibold mb-4 bg-base-300 px-3 py-2'>Withdrawal</p>
                        <div className="overflow-x-auto mb-20">
                            <table className="table table-sm md:table-sm table-pin-rows">
                                <thead>
                                    <tr>
                                        <th>Plan</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Transaciton id</th>
                                        <th>Deposit Actions</th>
                                        <th>Withdrawal Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[1, 2, 3].map(() => (
                                        <tr className="hover:bg-base-200">
                                            <td>Premium</td>
                                            <td>500</td>
                                            <td>19/05/2024</td>
                                            <td>Completed</td>
                                            <td>
                                                <CopyableText text="0x4836924967397f268686612d4d9547d6d5427181f088390b14c35a646c2436f5"
                                                    mainStyle="max-w-[160px]"
                                                    btnStyle="btn-xs ml-1" />
                                            </td>
                                            <td>
                                                <select
                                                    className="select select-sm"
                                                    name='depositaction'
                                                    value={formData.depositaction}
                                                    onChange={handleChange}
                                                >
                                                    <option class="text-warning" value="" disabled>Pending</option>
                                                    <option value="approved" class="text-success">Approved</option>
                                                    <option value="cancelled" class="text-error">Cancelled</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select
                                                    className="select select-sm"
                                                    name='withdrawalaction'
                                                    value={formData.withdrawalaction}
                                                    onChange={handleChange}
                                                >
                                                    <option class="text-warning" value="">Pending</option>
                                                    <option value="approved" class="text-success">Approved</option>
                                                    <option value="cancelled" class="text-error">Cancelled</option>
                                                </select>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    </div> */}
                </div>

                <label htmlFor="my-drawer-3" className="btn drawer-button lg:hidden">
                    Open drawer
                </label>
            </div>

            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4 space-y-2">
                    {/* Sidebar content here */}
                    {[1, 2, 3, 4].map(() => (
                        <li>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle h-10 w-10">
                                        <img
                                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                            alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">Hart Hagerty</div>
                                    <div className="text-sm opacity-50 hidden md:block">harthagerty@gmail.com</div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
