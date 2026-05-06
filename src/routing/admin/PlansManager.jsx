import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Plus, Save, X, TrendingUp, DollarSign, Percent, Clock, Users } from 'lucide-react'
import { BASE_URL, DOMAIN_KEY } from '../../utils/constants'
import TimedAlert from '../../components/ui/TimedAlert'

export default function PlansManager() {
    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [alert, setAlert] = useState(null)
    const [showForm, setShowForm] = useState(false)

    const [formData, setFormData] = useState({
        plan: '',
        planName: '',
        maxVal: '',
        minVal: '',
        dailyProfit: '',
        referralBonus: '',
        maturity: '',
    })

    useEffect(() => {
        fetchPlans()
    }, [])

    const fetchPlans = async () => {
        try {
            setLoading(true)
            const response = await axios.post(`${BASE_URL}/getplan.php`, {
                domainKey: DOMAIN_KEY
            })

            if (Array.isArray(response.data)) {
                setPlans(response.data)
            } else if (response.data && typeof response.data === 'object') {
                setPlans([response.data])
            } else {
                setPlans([])
            }
        } catch (err) {
            console.error("Error fetching plans:", err)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const resetForm = () => {
        setFormData({
            plan: '',
            planName: '',
            maxVal: '',
            minVal: '',
            dailyProfit: '',
            referralBonus: '',
            maturity: '',
        })
        setShowForm(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setAlert(null)

        // Validation
        if (!formData.plan.trim()) {
            setAlert({ text: "Plan letter is required (e.g., A, B, C)", type: "warning" })
            return
        }
        if (!formData.planName.trim()) {
            setAlert({ text: "Plan name is required", type: "warning" })
            return
        }
        if (!formData.minVal || parseFloat(formData.minVal) <= 0) {
            setAlert({ text: "Minimum value is required", type: "warning" })
            return
        }
        if (!formData.maxVal || parseFloat(formData.maxVal) <= 0) {
            setAlert({ text: "Maximum value is required", type: "warning" })
            return
        }
        if (parseFloat(formData.minVal) >= parseFloat(formData.maxVal)) {
            setAlert({ text: "Maximum value must be greater than minimum", type: "warning" })
            return
        }
        if (!formData.dailyProfit || parseFloat(formData.dailyProfit) <= 0) {
            setAlert({ text: "Daily profit is required", type: "warning" })
            return
        }
        if (!formData.referralBonus || parseFloat(formData.referralBonus) < 0) {
            setAlert({ text: "Referral bonus is required", type: "warning" })
            return
        }
        if (!formData.maturity || parseInt(formData.maturity) <= 0) {
            setAlert({ text: "Maturity period is required (in hours)", type: "warning" })
            return
        }

        try {
            setSaving(true)
            const response = await axios.post(`${BASE_URL}/createplan.php`, {
                plan: formData.plan.trim().toUpperCase(),
                planName: formData.planName.trim(),
                maxVal: parseInt(formData.maxVal),
                minVal: parseInt(formData.minVal),
                dailyProfit: parseInt(formData.dailyProfit),
                referralBonus: parseInt(formData.referralBonus),
                maturity: parseInt(formData.maturity),
                domainKey: DOMAIN_KEY
            })

            if (response.data.code === "200" || response.data.code === 200) {
                setAlert({ text: `Plan ${formData.plan.toUpperCase()} created successfully!`, type: "success" })
                resetForm()
                fetchPlans()
            } else {
                setAlert({ text: response.data.msg || "Failed to create plan", type: "error" })
            }
        } catch (err) {
            console.error("Error creating plan:", err)
            setAlert({ text: "Network error. Please try again.", type: "error" })
        } finally {
            setSaving(false)
        }
    }

    const formatDuration = (hours) => {
        const h = parseInt(hours)
        if (!h) return `${hours}h`
        if (h < 24) return `${h} Hours`
        const days = Math.floor(h / 24)
        const remainingHours = h % 24
        if (remainingHours === 0) return `${days} Day${days > 1 ? 's' : ''}`
        return `${days}D ${remainingHours}h`
    }

    if (loading) {
        return (
            <div className="space-y-4 animate-pulse">
                <div className="skeleton h-10 w-48 bg-base-300/50"></div>
                <div className="skeleton h-64 w-full bg-base-300/50 rounded-2xl"></div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Alert */}
            {alert && (
                <TimedAlert
                    text={alert.text}
                    type={alert.type}
                    onClose={() => setAlert(null)}
                />
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-xl">
                        <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Investment Plans</h2>
                        <p className="text-xs text-base-content/50">Create and manage investment plans</p>
                    </div>
                </div>

                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="btn btn-primary"
                        type="button"
                    >
                        <Plus className="h-4 w-4" />
                        Create New Plan
                    </button>
                )}
            </div>

            {/* Existing Plans */}
            {plans.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className="card bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50 shadow-md hover:shadow-lg hover:border-primary/30 transition-all duration-300"
                        >
                            <div className="card-body p-5">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-primary/10 p-2 rounded-lg">
                                            <span className="text-primary font-bold text-lg">{plan.plan}</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold">{plan.planName}</p>
                                        </div>
                                    </div>
                                    <span className="badge badge-primary badge-sm">Active</span>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-base-content/60">Range</span>
                                        <span className="font-medium">
                                            ${parseInt(plan.minVal).toLocaleString()} - ${parseInt(plan.maxVal).toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-base-content/60">Daily Profit</span>
                                        <span className="font-medium text-success">{plan.dailyProfit}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-base-content/60">Referral Bonus</span>
                                        <span className="font-medium text-info">{plan.referralBonus}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-base-content/60">Duration</span>
                                        <span className="font-medium">{formatDuration(plan.maturity)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* No plans state */}
            {plans.length === 0 && !showForm && (
                <div className="card bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50 shadow-md">
                    <div className="card-body flex items-center justify-center py-16">
                        <div className="text-center space-y-3">
                            <TrendingUp className="h-12 w-12 text-base-content/20 mx-auto" />
                            <p className="text-base-content/40 font-medium">No investment plans created yet</p>
                            <p className="text-xs text-base-content/30">Click "Create New Plan" to add your first plan</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Plan Form */}
            {showForm && (
                <div className="card bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50 shadow-lg">
                    <div className="card-body p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold">Create New Plan</h3>
                            <button
                                onClick={resetForm}
                                className="btn btn-ghost btn-sm btn-circle"
                                type="button"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Plan Letter */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium flex items-center gap-1">
                                            <TrendingUp className="h-3.5 w-3.5 text-primary" />
                                            Plan Letter
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        name="plan"
                                        value={formData.plan}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                        placeholder="e.g., A, B, C"
                                        maxLength="1"
                                    />
                                    <label className="label">
                                        <span className="label-text-alt text-base-content/40">Single letter identifier</span>
                                    </label>
                                </div>

                                {/* Plan Name */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Plan Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="planName"
                                        value={formData.planName}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                        placeholder="e.g., Classic, Premium, VIP"
                                    />
                                </div>

                                {/* Min Value */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium flex items-center gap-1">
                                            <DollarSign className="h-3.5 w-3.5 text-primary" />
                                            Minimum Deposit (USD)
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        name="minVal"
                                        value={formData.minVal}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                        placeholder="e.g., 30"
                                        min="0"
                                    />
                                </div>

                                {/* Max Value */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium flex items-center gap-1">
                                            <DollarSign className="h-3.5 w-3.5 text-primary" />
                                            Maximum Deposit (USD)
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        name="maxVal"
                                        value={formData.maxVal}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                        placeholder="e.g., 499"
                                        min="0"
                                    />
                                </div>

                                {/* Daily Profit */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium flex items-center gap-1">
                                            <Percent className="h-3.5 w-3.5 text-primary" />
                                            Daily Profit (%)
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        name="dailyProfit"
                                        value={formData.dailyProfit}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                        placeholder="e.g., 15"
                                        min="0"
                                    />
                                </div>

                                {/* Referral Bonus */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium flex items-center gap-1">
                                            <Users className="h-3.5 w-3.5 text-primary" />
                                            Referral Bonus (%)
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        name="referralBonus"
                                        value={formData.referralBonus}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                        placeholder="e.g., 10"
                                        min="0"
                                    />
                                </div>

                                {/* Maturity */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium flex items-center gap-1">
                                            <Clock className="h-3.5 w-3.5 text-primary" />
                                            Duration (Hours)
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        name="maturity"
                                        value={formData.maturity}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                        placeholder="e.g., 24"
                                        min="1"
                                    />
                                    <label className="label">
                                        <span className="label-text-alt text-base-content/40">24 = 1 day, 48 = 2 days, etc.</span>
                                    </label>
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="btn btn-primary flex-1"
                                >
                                    {saving ? (
                                        <span className="loading loading-spinner loading-sm"></span>
                                    ) : (
                                        <Save className="h-4 w-4" />
                                    )}
                                    Create Plan
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="btn btn-ghost"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}