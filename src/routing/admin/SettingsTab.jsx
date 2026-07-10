import React, { useState } from 'react'
import { Lock, Save, Eye, EyeClosed } from 'lucide-react'
import axios from 'axios'
import { BASE_URL, BIZ } from '../../utils/constants'
import TimedAlert from '../../components/ui/TimedAlert'

export default function SettingsTab() {
    const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' })
    const [passwordVisible, setPasswordVisible] = useState({ old: false, new: false, confirm: false })
    const [saving, setSaving] = useState(false)
    const [alert, setAlert] = useState(null)

    const handlePasswordChange = (e) => {
        const { name, value } = e.target
        setPasswordData(prev => ({ ...prev, [name]: value }))
    }

    const togglePasswordVisibility = (field) => {
        setPasswordVisible(prev => ({ ...prev, [field]: !prev[field] }))
    }

    const handleUpdatePassword = async () => {
        const username = localStorage.getItem("username")
        if (!passwordData.oldPassword) { setAlert({ text: "Current password is required", type: "warning" }); return }
        if (!passwordData.newPassword) { setAlert({ text: "New password is required", type: "warning" }); return }
        if (passwordData.newPassword.length < 8) { setAlert({ text: "Password must be at least 8 characters", type: "warning" }); return }
        if (passwordData.newPassword !== passwordData.confirmPassword) { setAlert({ text: "Passwords do not match", type: "warning" }); return }

        try {
            setSaving(true)
            const response = await axios.post(`${BASE_URL}/updateadminpassword.php`, {
                username,
                oldPassword: passwordData.oldPassword,
                password: passwordData.newPassword,
                biz: BIZ
            })
            if (response.data.code === "200" || response.data.code === 200) {
                setAlert({ text: "Password updated successfully", type: "success" })
                setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' })
            } else {
                setAlert({ text: response.data.msg || "Failed to update password", type: "error" })
            }
        } catch (err) {
            setAlert({ text: "Failed to update password. Check your connection.", type: "error" })
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="max-w-2xl space-y-6">
            {alert && <TimedAlert text={alert.text} type={alert.type} onClose={() => setAlert(null)} />}

            <div className="card bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50 shadow-lg">
                <div className="card-body p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="bg-primary/10 p-2 rounded-xl"><Lock className="h-5 w-5 text-primary" /></div>
                        <div>
                            <h3 className="text-lg font-bold">Change Admin Password</h3>
                            <p className="text-xs text-base-content/50">Update your admin account password</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {['old', 'new', 'confirm'].map((field) => (
                            <div className="form-control" key={field}>
                                <label className="label">
                                    <span className="label-text font-medium">
                                        {field === 'old' ? 'Current Password' : field === 'new' ? 'New Password' : 'Confirm New Password'}
                                    </span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2 w-full">
                                    <button type="button" onClick={() => togglePasswordVisibility(field)} className="text-base-content/50">
                                        {passwordVisible[field] ? <Eye size={16} /> : <EyeClosed size={16} />}
                                    </button>
                                    <input
                                        type={passwordVisible[field] ? "text" : "password"}
                                        name={field === 'old' ? 'oldPassword' : field === 'new' ? 'newPassword' : 'confirmPassword'}
                                        value={passwordData[field === 'old' ? 'oldPassword' : field === 'new' ? 'newPassword' : 'confirmPassword']}
                                        onChange={handlePasswordChange}
                                        className="grow"
                                        placeholder={field === 'old' ? 'Enter current password' : field === 'new' ? 'Enter new password' : 'Confirm new password'}
                                    />
                                </label>
                            </div>
                        ))}

                        <button type="button" onClick={handleUpdatePassword} disabled={saving} className="btn btn-primary w-full mt-2">
                            {saving ? <span className="loading loading-spinner loading-sm"></span> : <Save className="h-4 w-4" />}
                            Update Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}