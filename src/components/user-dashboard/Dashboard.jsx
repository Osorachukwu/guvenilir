import { Bitcoin, CalendarDays, Globe2Icon, LucideAppWindow, Settings, Shield, Wifi } from 'lucide-react'
import React from 'react'
import { ProgressBar } from '../ui/ProgressBar'
import Deposit from './Deposit'
import Withdrawer from './Withdrawer'
import ActiveDeposits from './ActiveDeposits'
import { CopyableText } from '../ui/CopyableText'
import { useAuth } from '../../hooks/useAuth'
import ColorDots from '../ui/ColorDots'
import SettingsAndInfo from './dashboard/SettingsAndInfo'
import CryptoPrices from './dashboard/CryptoPrices'


export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div className='px-6 space-y-4'>
      {/* First col */}
      <div className='flex gap-4'>
        <div className='card bg-base-300 w-2/3'>
          <div className='card-body'>
            <div className='flex gap-6'>
              <div className='w-1/2 border border-base-100'>Computer Image</div>
              <div className='w-3/2'>
                <p className='uppercase'>Account Balance</p>
                <div className='flex justify-between items-center'>
                  <p className="text-2xl font-semibold text-base-content/50">$0.00</p>
                  <ColorDots />
                </div>

                <hr className='my-4 text-base-100' />

                <div className='flex justify-between text-sm gap-12'>
                  <div className='flex-1'>
                    <p className='font-bold'>Username</p>
                    <p>{user?.fullname || user?.username}</p>
                    {/* progressbar is just aestetics ai dont worry about it */}
                    <ProgressBar />
                  </div>
                  <div className='flex-1'>
                    <p className='font-bold'>Email</p>
                    <p>{user?.email}</p>
                    {/* progressbar is just aestetics ai dont worry about it */}
                    <ProgressBar />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        {/*  */}
        <div className='card bg-base-300 w-1/3'>
          <div className='card-body'>
            <p className='uppercase font-semibold'>ACTIVE DEPOSITS</p>
            <div className='flex justify-between items-center'>
              <p className='font-semibold text-xl'>$0.00</p>
              <ColorDots />
            </div>
            <div>
              {["Last Deposit", "Active Deposit", "Total Deposit"].map((item, i) => (
                <div key={i} className='flex justify-between items-center'>
                  <div className='flex justify-between items-center gap-2'>
                    <div className={`${i === 0 ? "bg-red-400" : i === 1 ? "bg-orange-400" : "bg-lime-300"} w-2 h-2 rounded-full shadow-lg`}></div>
                    <p className='text-sm opacity-60'>{item}</p>
                  </div>
                  <div className='opacity-60'>
                    <p>$N/A</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
        {/*  */}
        <div className='card bg-base-300 w-1/3'>
          <div className='card-body'>
            <p className='uppercase font-semibold'>TOTAL EARNINGS</p>
            <div className='flex justify-between items-center'>
              <p className='font-semibold text-xl'>$0.00</p>
              <ColorDots />
            </div>
            <div>
              {["Last Withdrawal", "Pending Withdrawal", "Total Withdrawal"].map((item, i) => (
                <div key={i} className='flex justify-between items-center'>
                  <div className='flex justify-between items-center gap-2'>
                    <div className={`${i === 0 ? "bg-red-400" : i === 1 ? "bg-orange-400" : "bg-lime-300"} w-2 h-2 rounded-full shadow-lg`} ></div>
                    <p className='text-sm opacity-60'>{item}</p>
                  </div>
                  <div className='opacity-60'>
                    <p>$N/A</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>


      </div>
      {/* Second col */}
      <div className='join space-x-4 w-full'>
        <SettingsAndInfo />
        <CryptoPrices />

        <div className="card flex-1 h-full bg-base-300">
          <div className="card-body h-full">

            <p className="text-xs opacity-60 tracking-wide">YOUR REFERRAL LINK</p>

            <CopyableText
              text="0x60D6b9C543b29F767d4De23Cc882b08ed5855DD4"
              mainStyle="bg-base-100 pl-3 py-1 shadow border border-base-200"
              btnStyle="btn-sm"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
