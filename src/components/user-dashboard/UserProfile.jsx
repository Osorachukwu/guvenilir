import React from 'react'
import { User2 } from 'lucide-react'
import profileIcon from "../../assets/images (1).jpg"

export default function UserProfile() {

  return (
    <div className='py-6 px-4'>
      <div className='mx-auto'>
        {/* Profile Header */}
        <div className='space-y-4 pl-8 py-6 bg-base-300 rounded-md shadow-md'>
          <div className='flex gap-4'>
            <div className="avatar">
              <div className="w-24 rounded-xl">
                <img src={profileIcon} alt="Profile" />
              </div>
            </div>
            <div className='mt-3'>
              <p className='font-semibold text-xl'>{user.fullname}</p>
              <p className='text-sm font-normal text-base-content/70'>@{user.username}</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="alert alert-success mt-4">
            <span>{successMessage}</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="alert alert-error mt-4">
            <span>{error}</span>
          </div>
        )}

        <div>
          <div className='flex gap-8 bg-base-100 mt-8'>
            {/* User Information Section */}
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
                <p className='text-sm font-semibold text-base-content/50'>Registration Date</p>
                <p className='font-semibold'>  </p>
              </div>
              <div className='pb-2 px-2'>
                <p className='text-sm font-semibold text-base-content/50'>Role</p>
                <div className='badge badge-primary mt-2'></div>
              </div>
            </div>

            {/* Wallet Address Section */}
            <div className='p-5 space-y-2 divide-y divide-base-100 w-1/2 bg-base-300 rounded-md shadow-md'>
              <form onSubmit={handleSaveChanges}>
                <div className='pb-2 px-2 justify-between flex'>
                  <label htmlFor="bitcoin" className='text-sm font-semibold text-base-content/50'>Bitcoin</label>
                  <input 
                    type="text" 
                    id="bitcoin"
                    name="bitcoin"
                    placeholder="Bitcoin address" 
                    className="input input-sm w-2/3" 
                  />
                </div>
                <div className='pb-2 px-2 justify-between flex'>
                  <label htmlFor="ethereum" className='text-sm font-semibold text-base-content/50'>Ethereum</label>
                  <input 
                    type="text" 
                    id="ethereum"
                    name="ethereum"
                    placeholder="Ethereum address" 
                    className="input input-sm w-2/3" 
                  />
                </div>
                <div className='pb-2 px-2 justify-between flex'>
                  <label htmlFor="bnbSmartchain" className='text-sm font-semibold text-base-content/50'>BNB SC</label>
                  <input 
                    type="text" 
                    id="bnbSmartchain"
                    name="bnbSmartchain"
                    placeholder="BNB Smartchain" 
                    className="input input-sm w-2/3" 
                  />
                </div>
                <div className='pb-2 px-2 justify-between flex'>
                  <label htmlFor="usdtTrc20" className='text-sm font-semibold text-base-content/50'>USDT TRC20</label>
                  <input 
                    type="text" 
                    id="usdtTrc20"
                    name="usdtTrc20"
                    placeholder="USDT TRC20" 
                    className="input input-sm w-2/3" 
                  />
                </div>
                <div className='pb-2 px-2 justify-between flex'>
                  <label htmlFor="bnb" className='text-sm font-semibold text-base-content/50'>BNB</label>
                  <input 
                    type="text" 
                    id="bnb"
                    name="bnb"
                    placeholder="BNB" 
                    className="input input-sm w-2/3" 
                  />
                </div>
                <div className='pb-2 px-2 justify-between flex'>
                  <label htmlFor="usdtErc20" className='text-sm font-semibold text-base-content/50'>USDT ERC20</label>
                  <input 
                    type="text" 
                    id="usdtErc20"
                    name="usdtErc20"
                    placeholder="USDT ERC20" 
                    className="input input-sm w-2/3" 
                  />
                </div>
                
                <button 
                  className='btn btn-lg text-base btn-primary mt-6 ml-2' 
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
