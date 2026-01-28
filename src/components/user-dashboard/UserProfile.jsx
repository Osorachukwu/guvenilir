import React from 'react'
import { Plane, User2, Users } from 'lucide-react'
import profileIcon from "../../assets/images (1).jpg"

export default function UserProfile() {
  return (
    <div className='py-6 px-4'>
      <div className='mx-auto'>
        {/* Profile */}
        <div className='space-y-4 pl-8 py-6 bg-base-300 rounded-md shadow-md'>
          <div className='flex gap-4'>
            <div className="avatar">
              <div className="w-24 rounded-xl">
                <img src={profileIcon} />
              </div>
            </div>
            <p className='font-semibold text-xl leading-5 mt-3'>Full Name <br />
              <span className='text-sm font-normal'>Username</span>
            </p>
          </div>
        </div>

        <div>
          <div className='flex gap-8 bg-base-100 mt-8'>
            <div className='p-5 space-y-2 divide-y divide-base-100 w-1/2 bg-base-300 rounded-md shadow-md'>
              <div className='pb-2 px-2'>
                <p className='text-sm font-semibold text-base-content/50'>Full Name</p>
                <p className='font-semibold'></p>
              </div>
              <div className='pb-2 px-2'>
                <p className='text-sm font-semibold text-base-content/50'>Username</p>
                <p className='font-semibold'></p>
              </div>
              <div className='pb-2 px-2'>
                <p className='text-sm font-semibold text-base-content/50'>Email</p>
                <p className='font-semibold'></p>
              </div>
              <div className='pb-2 px-2'>
                <p className='text-sm font-semibold text-base-content/50'>Redistration Date</p>
                <p className='font-semibold'></p>
              </div>
            </div>
            <div className='p-5 space-y-2 divide-y divide-base-100 w-1/2 bg-base-300 rounded-md shadow-md'>
              <form action="">
                <div className='pb-2 px-2 justify-between flex'>
                  <label htmlFor="" className='text-sm font-semibold text-base-content/50'>Bitcoin</label>
                  <input type="text" placeholder="Bitcoin" className="input input-sm w-2/3" />
                </div>
                <div className='pb-2 px-2 justify-between flex'>
                  <label htmlFor="" className='text-sm font-semibold text-base-content/50'>Etherum</label>
                  <input type="text" placeholder="Etherum" className="input input-sm w-2/3" />
                </div>
                <div className='pb-2 px-2 justify-between flex'>
                  <label htmlFor="" className='text-sm font-semibold text-base-content/50'>BNB Smartchain</label>
                  <input type="text" placeholder="BNB Smartchain" className="input input-sm w-2/3" />
                </div>
                <div className='pb-2 px-2 justify-between flex'>
                  <label htmlFor="" className='text-sm font-semibold text-base-content/50'>USDT TRC20</label>
                  <input type="text" placeholder="USDT TRC20" className="input input-sm w-2/3" />
                </div>
                <div className='pb-2 px-2 justify-between flex'>
                  <label htmlFor="" className='text-sm font-semibold text-base-content/50'>BNB</label>
                  <input type="text" placeholder="BNB" className="input input-sm w-2/3" />
                </div>
                <div className='pb-2 px-2 justify-between flex'>
                  <label htmlFor="" className='text-sm font-semibold text-base-content/50'>USDT ERC20</label>
                  <input type="text" placeholder="USDT ERC20" className="input input-sm w-2/3" />
                </div>
              </form>
              {/* <p className='text-xs text-base-content/40'>{item.title}</p> */}
              {/* <p className='font-semibold'>{item.desc}</p> */}
            </div>
          </div>
          <button className='btn btn-lg text-base btn-primary mt-6 ml-2'>Save Changes</button>
        </div>
      </div>
    </div>
  )
}
// jcole cant get enough
