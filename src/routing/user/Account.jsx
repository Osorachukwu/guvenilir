import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { User, Lock, Mail, Calendar, Wallet, Save, Key, AlertCircle } from 'lucide-react'
import TimedAlert from '../../components/ui/TimedAlert'

export default function Account() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [alert, setAlert] = useState(null)
    
    const [profileData, setProfileData] = useState({
        fullname: '',
        username: '',
        email: '',
        registrationDate: '',
        btcAd: '',
        ethAd: '',
        bnbSmartAd: '',
        bnbAd: '',
        usdtTrcAd: '',
        usdtErcAd: ''
    })

    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const [editMode, setEditMode] = useState({
        fullname: false,
        wallets: false
    })

    useEffect(() => {
        loadProfileFromStorage()
    }, [])

    const loadProfileFromStorage = () => {
        const username = localStorage.getItem("username")
        const fullname = localStorage.getItem("fullname")
        const email = localStorage.getItem("email")
        const date = localStorage.getItem("regDate")
        const btcAd = localStorage.getItem("btcAd")
        const ethAd = localStorage.getItem("ethAd")
        const bnbSmartAd = localStorage.getItem("bnbSmartAd")
        const bnbAd = localStorage.getItem("bnbAd")
        const usdtTrcAd = localStorage.getItem("usdtTrcAd")
        const usdtErcAd = localStorage.getItem("usdtErcAd")

        if (!username) {
            setAlert({ text: "Please login to view account details", type: "error" })
            setLoading(false)
            return
        }

        setProfileData({
            fullname: fullname || '',
            username: username || '',
            email: email || '',
            registrationDate: date || 'N/A',
            btcAd: btcAd || '',
            ethAd: ethAd || '',
            bnbSmartAd: bnbSmartAd || '',
            bnbAd: bnbAd || '',
            usdtTrcAd: usdtTrcAd || '',
            usdtErcAd: usdtErcAd || ''
        })

        setLoading(false)
    }

    const handleProfileChange = (e) => {
        const { name, value } = e.target
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handlePasswordChange = (e) => {
        const { name, value } = e.target
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const updateFullname = async () => {
        const username = localStorage.getItem("username")
        
        if (!profileData.fullname.trim()) {
            setAlert({ text: "Fullname cannot be empty", type: "warning" })
            return
        }

        try {
            setSaving(true)
            const response = await axios.post("https://invest.esbatech.org/updateaccount.php", {
                username: username,
                fullname: profileData.fullname,
                biz: "bank"
            })
            console.log(profileData.fullname)
            console.log("Update fullname response:", response.data)
            
            if (response.data.code === 200) {
                // Update localStorage with new fullname
                localStorage.setItem("fullname", profileData.fullname)
                setAlert({ text: "Fullname updated successfully", type: "success" })
                setEditMode(prev => ({ ...prev, fullname: false }))
            } else {
                setAlert({ text: response.data.msg || "Failed to update fullname", type: "error" })
            }
        } catch (err) {
            console.error("Error updating fullname:", err)
            setAlert({ text: "Failed to update fullname", type: "error" })
        } finally {
            setSaving(false)
        }
    }

    const updatePassword = async () => {
        const username = localStorage.getItem("username")
        
        // Validation
        if (!passwordData.oldPassword) {
            setAlert({ text: "Old password is required", type: "warning" })
            return
        }
        
        if (!passwordData.newPassword) {
            setAlert({ text: "New password is required", type: "warning" })
            return
        }
        
        if (passwordData.newPassword.length < 6) {
            setAlert({ text: "Password must be at least 6 characters", type: "warning" })
            return
        }
        
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setAlert({ text: "Passwords do not match", type: "warning" })
            return
        }
        
        if (passwordData.oldPassword === passwordData.newPassword) {
            setAlert({ text: "New password must be different from old password", type: "warning" })
            return
        }

        try {
            setSaving(true)
            const response = await axios.post("https://invest.esbatech.org/updateaccount.php", {
                username,
                oldPassword: passwordData.oldPassword,
                password: passwordData.newPassword,
                biz: "bank"
            })
            
            console.log("Update password response:", response.data)
            
            if (response.data.code === 200) {
                setAlert({ text: "Password updated successfully", type: "success" })
                setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' })
            } else {
                setAlert({ text: response.data.msg || "Failed to update password", type: "error" })
            }
        } catch (err) {
            console.error("Error updating password:", err)
            setAlert({ text: "Failed to update password", type: "error" })
        } finally {
            setSaving(false)
        }
    }

    const updateWallets = async () => {
        const username = localStorage.getItem("username")
        
        try {
            setSaving(true)
            const response = await axios.post("https://invest.esbatech.org/updatewallets.php", {
                username,
                btcAd: profileData.btcAd,
                ethAd: profileData.ethAd,
                bnbSmartAd: profileData.bnbSmartAd,
                bnbAd: profileData.bnbAd,
                usdtTrcAd: profileData.usdtTrcAd,
                usdtErcAd: profileData.usdtErcAd,
                biz: "bank"
            })

            console.log("Update wallets response:", response.data)
            
            if (response.data.code === 200) {
                // Update localStorage with new wallet addresses
                localStorage.setItem("btcAd", profileData.btcAd)
                localStorage.setItem("ethAd", profileData.ethAd)
                localStorage.setItem("bnbSmartAd", profileData.bnbSmartAd)
                localStorage.setItem("bnbAd", profileData.bnbAd)
                localStorage.setItem("usdtTrcAd", profileData.usdtTrcAd)
                localStorage.setItem("usdtErcAd", profileData.usdtErcAd)
                
                setAlert({ text: "Wallet addresses updated successfully", type: "success" })
                setEditMode(prev => ({ ...prev, wallets: false }))
            } else {
                setAlert({ text: response.data.msg || "Failed to update wallets", type: "error" })
            }
        } catch (err) {
            console.error("Error updating wallets:", err)
            setAlert({ text: "Failed to update wallets", type: "error" })
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="skeleton h-8 w-48 bg-base-300/50"></div>
                <div className="space-y-4">
                    <div className="skeleton h-64 w-full bg-base-300/50 rounded-2xl"></div>
                    <div className="skeleton h-64 w-full bg-base-300/50 rounded-2xl"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Alert */}
            {alert && (
                <TimedAlert 
                    text={alert.text} 
                    type={alert.type} 
                    onClose={() => setAlert(null)} 
                />
            )}

            {/* Header */}
            <div className="flex items-center gap-3">
                <User className="h-6 w-6 text-primary" />
                <h1 className="text-lg sm:text-xl font-semibold">Account Settings</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Profile Info */}
                <div className="space-y-6">
                    {/* Account Info Card */}
                    <div className="card bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50 shadow-lg">
                        <div className="card-body p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Calendar className="h-5 w-5 text-primary" />
                                <h2 className="text-lg font-semibold">Account Information</h2>
                            </div>
                            
                            <div className="space-y-4">
                                {/* Username (Read-only) */}
                                <div className="flex items-center justify-between py-2 border-b border-base-300/50">
                                    <span className="text-sm font-medium text-base-content/70">Username</span>
                                    <span className="font-mono font-semibold">{profileData.username}</span>
                                </div>
                                
                                {/* Registration Date (Read-only) */}
                                <div className="flex items-center justify-between py-2 border-b border-base-300/50">
                                    <span className="text-sm font-medium text-base-content/70">Member Since</span>
                                    <span className="font-semibold">{profileData.registrationDate}</span>
                                </div>
                                
                                {/* Email (Read-only) */}
                                <div className="flex items-center justify-between py-2 border-b border-base-300/50">
                                    <span className="text-sm font-medium text-base-content/70">Email Address</span>
                                    <div className="flex items-center gap-3">
                                        <span className="font-semibold">{profileData.email || 'Not set'}</span>
                                    </div>
                                </div>
                                
                                {/* Fullname (Editable) */}
                                <div className="py-2">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-base-content/70">Full Name</span>
                                        {!editMode.fullname && (
                                            <button 
                                                type="button"
                                                onClick={() => setEditMode(prev => ({ ...prev, fullname: true }))}
                                                className="btn btn-ghost btn-xs"
                                            >
                                                Edit
                                            </button>
                                        )}
                                    </div>
                                    
                                    {editMode.fullname ? (
                                        <div className="space-y-3">
                                            <input
                                                type="text"
                                                name="fullname"
                                                value={profileData.fullname}
                                                onChange={handleProfileChange}
                                                className="input input-bordered w-full"
                                                placeholder="Enter your full name"
                                            />
                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={updateFullname}
                                                    disabled={saving}
                                                    className="btn btn-primary btn-sm"
                                                >
                                                    {saving ? <span className="loading loading-spinner loading-xs"></span> : <Save className="h-4 w-4" />}
                                                    Save
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setEditMode(prev => ({ ...prev, fullname: false }))
                                                        loadProfileFromStorage() // Reset to original
                                                    }}
                                                    className="btn btn-ghost btn-sm"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-lg font-semibold">
                                            {profileData.fullname || 'Not set'}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Password Change Card */}
                    <div className="card bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50 shadow-lg">
                        <div className="card-body p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Lock className="h-5 w-5 text-primary" />
                                <h2 className="text-lg font-semibold">Change Password</h2>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Current Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="oldPassword"
                                        value={passwordData.oldPassword}
                                        onChange={handlePasswordChange}
                                        className="input input-bordered w-full"
                                        placeholder="Enter current password"
                                    />
                                </div>
                                
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">New Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                        className="input input-bordered w-full"
                                        placeholder="Enter new password"
                                    />
                                </div>
                                
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Confirm New Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordChange}
                                        className="input input-bordered w-full"
                                        placeholder="Confirm new password"
                                    />
                                </div>
                                
                                <button
                                    type="button"
                                    onClick={updatePassword}
                                    disabled={saving}
                                    className="btn btn-primary w-full"
                                >
                                    {saving ? <span className="loading loading-spinner loading-sm"></span> : <Key className="h-4 w-4" />}
                                    Update Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Wallets */}
                <div className="card bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50 shadow-lg h-fit">
                    <div className="card-body p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Wallet className="h-5 w-5 text-primary" />
                                <h2 className="text-lg font-semibold">Wallet Addresses</h2>
                            </div>
                            {!editMode.wallets && (
                                <button 
                                    type="button"
                                    onClick={() => setEditMode(prev => ({ ...prev, wallets: true }))}
                                    className="btn btn-ghost btn-sm"
                                >
                                    Edit All
                                </button>
                            )}
                        </div>
                        
                        <div className="space-y-4">
                            {/* Bitcoin */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Bitcoin (BTC)</span>
                                </label>
                                <input
                                    type="text"
                                    name="btcAd"
                                    value={profileData.btcAd}
                                    onChange={handleProfileChange}
                                    disabled={!editMode.wallets}
                                    className="input input-bordered w-full font-mono text-sm"
                                    placeholder="Enter BTC wallet address"
                                />
                            </div>
                            
                            {/* Ethereum */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Ethereum (ETH)</span>
                                </label>
                                <input
                                    type="text"
                                    name="ethAd"
                                    value={profileData.ethAd}
                                    onChange={handleProfileChange}
                                    disabled={!editMode.wallets}
                                    className="input input-bordered w-full font-mono text-sm"
                                    placeholder="Enter ETH wallet address"
                                />
                            </div>
                            
                            {/* BNB Smart Chain */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">BNB Smart Chain (BSC)</span>
                                </label>
                                <input
                                    type="text"
                                    name="bnbSmartAd"
                                    value={profileData.bnbSmartAd}
                                    onChange={handleProfileChange}
                                    disabled={!editMode.wallets}
                                    className="input input-bordered w-full font-mono text-sm"
                                    placeholder="Enter BSC wallet address"
                                />
                            </div>
                            
                            {/* BNB */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">BNB</span>
                                </label>
                                <input
                                    type="text"
                                    name="bnbAd"
                                    value={profileData.bnbAd}
                                    onChange={handleProfileChange}
                                    disabled={!editMode.wallets}
                                    className="input input-bordered w-full font-mono text-sm"
                                    placeholder="Enter BNB wallet address"
                                />
                            </div>
                            
                            {/* USDT TRC20 */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">USDT (TRC20)</span>
                                </label>
                                <input
                                    type="text"
                                    name="usdtTrcAd"
                                    value={profileData.usdtTrcAd}
                                    onChange={handleProfileChange}
                                    disabled={!editMode.wallets}
                                    className="input input-bordered w-full font-mono text-sm"
                                    placeholder="Enter USDT TRC20 wallet address"
                                />
                            </div>
                            
                            {/* USDT ERC20 */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">USDT (ERC20)</span>
                                </label>
                                <input
                                    type="text"
                                    name="usdtErcAd"
                                    value={profileData.usdtErcAd}
                                    onChange={handleProfileChange}
                                    disabled={!editMode.wallets}
                                    className="input input-bordered w-full font-mono text-sm"
                                    placeholder="Enter USDT ERC20 wallet address"
                                />
                            </div>
                            
                            {editMode.wallets && (
                                <div className="flex gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={updateWallets}
                                        disabled={saving}
                                        className="btn btn-primary flex-1"
                                    >
                                        {saving ? <span className="loading loading-spinner loading-sm"></span> : <Save className="h-4 w-4" />}
                                        Save Wallets
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditMode(prev => ({ ...prev, wallets: false }))
                                            loadProfileFromStorage() // Reset to original
                                        }}
                                        className="btn btn-ghost"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                        
                        {!editMode.wallets && (
                            <div className="mt-4 p-3 bg-base-300/30 rounded-lg">
                                <div className="flex items-start gap-2">
                                    <AlertCircle className="h-4 w-4 text-primary/70 mt-0.5 flex-shrink-0" />
                                    <p className="text-xs text-base-content/60">
                                        Wallet addresses are used for deposits and withdrawals. 
                                        Make sure they are correct before saving.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}