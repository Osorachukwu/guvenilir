import { Shield } from 'lucide-react'
import React from 'react'
import ColorDots from '../../components/ColorDots'
import { ProgressBar } from '../../components/ProgressBar'
import Deposit from './Deposit'
import Withdrawer from './Withdrawer'
import ActiveDeposits from './ActiveDeposits'

export default function Dashboard() {
  return (
    <div className='px-6 space-y-3'>
      {/* First col */}
      <div className='flex gap-4'>
        <div className='card bg-base-300 w-2/3'>
          <div className='card-body'>
            <p className='uppercase'>Account Balance</p>
            <div className='flex justify-between items-center'>
              <p className="text-2xl font-semibold text-base-content/50">$0.00</p>
              {/* Bubbles */}
              {/* <div className='flex gap-1'>
                <div className='bg-red-400 w-2 h-2 rounded-full'></div>
                <div className='bg-red-400 w-2 h-2 rounded-full'></div>
                <div className='bg-red-400 w-2 h-2 rounded-full'></div>

              </div> */}
              <ColorDots />
            </div>

            <hr className='my-4 text-base-300' />

            <div className='flex justify-between text-xs gap-12'>
              <div className='flex-1'>
                <p className='font-bold'>Username</p>
                <p>JoeMartin2</p>
                <div>
                  <ProgressBar />
                </div>
                {/* <progress className="progress progress-primary w-56" value="70" max="100"></progress> */}
              </div>
              <div className='flex-1'>
                <p className='font-bold'>Email</p>
                <p>exampole@email.com</p>
                  <ProgressBar />
                {/* <progress className="progress progress-primary w-56" value="70" max="100"></progress> */}
              </div>
            </div>
          </div>

        </div>
        {/*  */}
        <div className='card bg-base-300 w-1/3'>
          <div className='card-body'>
            <p className='uppercase'>Account Balance</p>
            <div className='flex justify-between items-center'>
              <p>$0.00</p>
              {/* Bubbles */}
              <ColorDots />
            </div>
            <div>
              <div className='flex justify-between items-center'>
                <div className='flex justify-between items-center gap-1'>
                  <div className='bg-red-400 w-2 h-2 rounded-full'></div>
                  <p>Last Deposit</p>
                </div>
                <div>
                  <p>$N/A</p>
                </div>
              </div>
              <div className='flex justify-between items-center'>
                <div className='flex justify-between items-center gap-1'>
                  <div className='bg-red-400 w-2 h-2 rounded-full'></div>
                  <p>Last Deposit</p>
                </div>
                <div>
                  <p>$N/A</p>
                </div>
              </div>
              <div className='flex justify-between items-center'>
                <div className='flex justify-between items-center gap-1'>
                  <div className='bg-red-400 w-2 h-2 rounded-full'></div>
                  <p>Last Deposit</p>
                </div>
                <div>
                  <p>$N/A</p>
                </div>
              </div>
            </div>

          </div>
        </div>
        {/*  */}
        <div className='card bg-base-300 w-1/3'>
          <div className='card-body'>
            <p className='uppercase'>Account Balance</p>
            <div className='flex justify-between items-center'>
              <p>$0.00</p>
              {/* Bubbles */}
              <ColorDots />
            </div>
            <div>
              <div className='flex justify-between items-center'>
                <div className='flex justify-between items-center gap-1'>
                  <div className='bg-red-400 w-2 h-2 rounded-full'></div>
                  <p>Last Deposit</p>
                </div>
                <div>
                  <p>$N/A</p>
                </div>
              </div>
              <div className='flex justify-between items-center'>
                <div className='flex justify-between items-center gap-1'>
                  <div className='bg-red-400 w-2 h-2 rounded-full'></div>
                  <p>Last Deposit</p>
                </div>
                <div>
                  <p>$N/A</p>
                </div>
              </div>
              <div className='flex justify-between items-center'>
                <div className='flex justify-between items-center gap-1'>
                  <div className='bg-red-400 w-2 h-2 rounded-full'></div>
                  <p>Last Deposit</p>
                </div>
                <div>
                  <p>$N/A</p>
                </div>
              </div>
            </div>

          </div>
        </div>


      </div>
      {/* Second col */}
      <div className='join space-x-6 w-full'>
        <ul className="join-item list bg-base-300 rounded-box shadow-md flex-1">

          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Most played songs this week</li>

          {[1, 2, 3, 4, 5, 6, 7].map(() => (
            <li className="list-row items-center py-2">
              <div className='bg-red-400 p-1 rounded'>
                <Shield size={16} />
              </div>
              <div>
                <div>Dio Lupa</div>
              </div>

              <p>
                Show more
              </p>
            </li>
          ))}
        </ul>
        <ul className="join-item list bg-base-300 rounded-box shadow-md flex-1">

          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Most played songs this week</li>

          {[1, 2, 3, 4, 5, 6, 7].map(() => (
            <li className="list-row items-center py-2">
              <div className='bg-red-400 p-1 rounded'>
                <Shield size={16} />
              </div>
              <div>
                <div>Dio Lupa</div>
              </div>

              <p>
                Show more
              </p>
            </li>
          ))}
        </ul>
        <ul className="join-item list bg-base-300 rounded-box shadow-md flex-1">

          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Most played songs this week</li>

          {[1, 2, 3, 4, 5, 6, 7].map(() => (
            <li className="list-row items-center py-2">
              <div className='bg-red-400 p-1 rounded'>
                <Shield size={16} />
              </div>
              <div>
                <div>Dio Lupa</div>
              </div>

              <p>
                Show more
              </p>
            </li>
          ))}
        </ul>

      </div>
      
    </div>
  )
}
