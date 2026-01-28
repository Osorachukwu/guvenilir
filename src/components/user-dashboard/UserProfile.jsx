import React, { useState } from 'react'
import { User2 } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import profileIcon from "../../assets/images (1).jpg"

export default function UserProfile() {
  const { user, updateProfile, isLoading, error } = useAuth()
  const [formData, setFormData] = useState({
    bitcoin: user?.bitcoinWallet || '',
    ethereum: user?.ethereumWallet || '',
    bnbSmartchain: user?.bnbSmartchain || '',
    usdtTrc20: user?.usdtTrc20 || '',
    bnb: user?.bnb || '',
    usdtErc20: user?.usdtErc20 || '',
  })
  const [successMessage, setSuccessMessage] = useState('')

  if (!user) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-lg'>Loading profile...</p>
      </div>
    )
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSaveChanges = async (e) => {
    e.preventDefault()
    setSuccessMessage('')
    
    try {
      await updateProfile({
        bitcoinWallet: formData.bitcoin,
        ethereumWallet: formData.ethereum,
        bnbSmartchain: formData.bnbSmartchain,
        usdtTrc20: formData.usdtTrc20,
        bnb: formData.bnb,
        usdtErc20: formData.usdtErc20,
      })
      setSuccessMessage('Profile updated successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err) {
      console.error('Profile update failed:', err)
    }
  }

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
                <p className='font-semibold'>{user.fullname}</p>
              </div>
              <div className='pb-2 px-2'>
                <p className='text-sm font-semibold text-base-content/50'>Username</p>
                <p className='font-semibold'>@{user.username}</p>
              </div>
              <div className='pb-2 px-2'>
                <p className='text-sm font-semibold text-base-content/50'>Email</p>
                <p className='font-semibold'>{user.email}</p>
              </div>
              <div className='pb-2 px-2'>
                <p className='text-sm font-semibold text-base-content/50'>Registration Date</p>
                <p className='font-semibold'>
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div className='pb-2 px-2'>
                <p className='text-sm font-semibold text-base-content/50'>Role</p>
                <div className='badge badge-primary mt-2'>{user.role}</div>
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
                    value={formData.bitcoin}
                    onChange={handleInputChange}
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
                    value={formData.ethereum}
                    onChange={handleInputChange}
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
                    value={formData.bnbSmartchain}
                    onChange={handleInputChange}
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
                    value={formData.usdtTrc20}
                    onChange={handleInputChange}
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
                    value={formData.bnb}
                    onChange={handleInputChange}
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
                    value={formData.usdtErc20}
                    onChange={handleInputChange}
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
