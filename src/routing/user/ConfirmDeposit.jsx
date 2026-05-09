import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CopyableText } from '../../components/ui/CopyableText';
import TimedAlert from '../../components/ui/TimedAlert';
import { BASE_URL, BIZ, DOMAIN_KEY } from '../../utils/constants';
import { ArrowLeft, Wallet, CheckCircle, AlertTriangle } from 'lucide-react';

const DEPOSIT_URL = `${BASE_URL}/deposit.php`;

const wallets = [
    { wallet: "Bitcoin", payMethod: "btc", walletAddress: "bc1qmnhg0lrdqv2ut96ly6rt8pdqzqa7ltkzmj82j5" },
    { wallet: "Ethereum", payMethod: "eth", walletAddress: "0x56AEB5C4aF0319E125f1BdAa9127A5e2Cd61d1A6" },
    { wallet: "USDT(TRC20)", payMethod: "usdt", walletAddress: "TM4RUeSht9jY9QZGWfSqc4NBJHfdiCEQyf" },
    { wallet: "SOLANA", payMethod: "sol", walletAddress: "21AfzRjwtHpf2pkvJ6o9xspStxhCFv1dM5CnLrWjnZqm" },
    { wallet: "XRP", payMethod: "xrp", walletAddress: "0rp4RnrX2qKUtwFCoQs2xPioBx63c4yHCGp" },
    { wallet: "TRX", payMethod: "trx", walletAddress: "TM4RUeSht9jY9QZGWfSqc4NBJHfdiCEQyf" },
    { wallet: "LTC", payMethod: "ltc", walletAddress: "ltc1qf8dm2g7306t3a5exx42pe55x3tks0kmdyzex65" },
    { wallet: "Dogecoin", payMethod: "doge", walletAddress: "DHBbbqNJHEHUif8MZeN1TDqs2S5BZGKuSp5" },
];

export default function ConfirmDeposit() {
    const location = useLocation();
    const navigate = useNavigate();

    // Expect these passed via location.state from the previous page
    const plan = location.state?.plan;           // e.g. "A"
    const amount = location.state?.amount;       // e.g. "30.00"
    const payMethod = location.state?.payMethod; // e.g. "btc"

    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const [alert, setAlert] = useState(null);
    const [planData, setPlanData] = useState(null);
    const [fetchingPlan, setFetchingPlan] = useState(true);

    // Match wallet entry by payMethod shortcode
    const selectedWallet = wallets.find(
        w => w.payMethod.toLowerCase() === payMethod?.toLowerCase()
    );

    // Fetch plan details to get correct profit percentage
    useEffect(() => {
        if (!plan) {
            setFetchingPlan(false)
            return
        }

        const fetchPlanDetails = async () => {
            try {
                const response = await axios.post(`${BASE_URL}/getplan.php`, {
                    domainKey: DOMAIN_KEY
                })

                let plansArray = []
                if (Array.isArray(response.data)) {
                    plansArray = response.data
                } else if (response.data && typeof response.data === 'object') {
                    plansArray = [response.data]
                }

                const matchedPlan = plansArray.find(p => p.plan === plan)
                if (matchedPlan) {
                    setPlanData(matchedPlan)
                }
            } catch (err) {
                console.error("Error fetching plan details:", err)
            } finally {
                setFetchingPlan(false)
            }
        }

        fetchPlanDetails()
    }, [plan])

    const handleSave = async () => {
        setAlert(null);

        const username = localStorage.getItem("username");
        const token = localStorage.getItem("token");

        if (!username || !token) {
            setAlert({ text: "Session expired. Please log in again.", type: "error" });
            return;
        }

        if (!plan || !amount || !payMethod) {
            setAlert({ text: "Deposit details are incomplete. Please go back and try again.", type: "warning" });
            return;
        }

        setLoading(true);

        try {
            const payload = {
                plan,
                amount,
                payMethod,
                username,
                token,
                biz: BIZ,
                domainKey: DOMAIN_KEY,
                referrer: "",
            };

            const { data } = await axios.post(DEPOSIT_URL, payload);

            if (data.code === "200" || data.code === 200) {
                setSaved(true);
                setAlert({ text: data.msg || "Deposit submitted successfully! Redirecting...", type: "success" });
                setTimeout(() => navigate("/account/your-deposit"), 2000);
            } else {
                setAlert({ text: data.msg || "Something went wrong. Please try again.", type: "error" });
            }
        } catch (err) {
            setAlert({ text: "Network error. Please check your connection and try again.", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    const formatDuration = (hours) => {
        const h = parseInt(hours)
        if (!h) return `${hours}h`
        if (h < 24) return `${h} Hours`
        const days = Math.floor(h / 24)
        const remainingHours = h % 24
        if (remainingHours === 0) return `${days} Day${days > 1 ? 's' : ''}`
        return `${days}D ${remainingHours}h`
    }

    const formatCurrency = (val) => {
        const num = parseInt(val)
        if (isNaN(num)) return val
        return num.toLocaleString()
    }

    // Loading state while fetching plan
    if (fetchingPlan) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        )
    }

    // Missing deposit details
    if (!plan || !amount || !payMethod) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <AlertTriangle className="h-16 w-16 text-warning mx-auto opacity-50" />
                    <p className="text-lg font-medium text-base-content/70">Deposit details are missing</p>
                    <p className="text-sm text-base-content/50">Please go back and select a plan to continue.</p>
                    <button
                        onClick={() => navigate('/account/deposit')}
                        className="btn btn-primary"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Deposit
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="text-base-content min-h-screen">
            <div className="mx-aut max-w-3xl py-5 px-2 sm:py-10 ">

                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-primary/10 p-2 rounded-xl">
                        <Wallet className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold">Confirm Deposit</h1>
                        <p className="text-xs text-base-content/50">Review your deposit details before submitting</p>
                    </div>
                </div>

                {/* Alert */}
                {alert && (
                    <TimedAlert
                        text={alert.text}
                        type={alert.type}
                        onClose={() => setAlert(null)}
                    />
                )}

                {/* Deposit Summary Card */}
                <div className="card bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50 shadow-lg mb-6">
                    <div className="card-body p-5 sm:p-6">
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-success" />
                            Deposit Summary
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between py-2 border-b border-base-300/50">
                                <span className="text-sm text-base-content/60">Plan</span>
                                <span className="font-semibold">
                                    Plan {plan} - {planData?.planName || 'N/A'}
                                </span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-300/50">
                                <span className="text-sm text-base-content/60">Amount</span>
                                <span className="font-bold text-lg">${parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-300/50">
                                <span className="text-sm text-base-content/60">Daily Profit</span>
                                <span className="font-semibold text-success">{planData?.dailyProfit || 'N/A'}%</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-300/50">
                                <span className="text-sm text-base-content/60">Referral Bonus</span>
                                <span className="font-semibold text-info">{planData?.referralBonus || 'N/A'}%</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-300/50">
                                <span className="text-sm text-base-content/60">Duration</span>
                                <span className="font-semibold">{planData ? formatDuration(planData.maturity) : 'N/A'}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-300/50">
                                <span className="text-sm text-base-content/60">Payment Method</span>
                                <span className="font-semibold">{selectedWallet?.wallet || payMethod?.toUpperCase()}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-300/50">
                                <span className="text-sm text-base-content/60">Principal Return</span>
                                <span className="text-success font-medium">Yes</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-300/50">
                                <span className="text-sm text-base-content/60">Deposit Fee</span>
                                <span className="font-medium">$0.00</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Steps Card */}
                <div className="card bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50 shadow-lg mb-6">
                    <div className="card-body p-5 sm:p-6">
                        <h3 className="font-semibold text-lg mb-4">Steps to Make Deposit</h3>
                        <ol className="list-decimal list-inside space-y-3 text-sm">
                            <li className="text-base-content/80">
                                Copy the company wallet address below
                            </li>
                            <li className="text-base-content/80">
                                Go to your wallet app and send the exact amount
                            </li>
                            <li className="text-base-content/80">
                                Come back and click the <strong>Confirm Deposit</strong> button below
                            </li>
                        </ol>
                    </div>
                </div>

                {/* Wallet Address */}
                <div className="card bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50 shadow-lg mb-6">
                    <div className="card-body p-5 sm:p-6">
                        <h3 className="font-semibold text-lg mb-4">
                            {selectedWallet?.wallet || payMethod?.toUpperCase()} Wallet Address
                        </h3>
                        {selectedWallet ? (
                            <div className="space-y-3">
                                <CopyableText 
                                    text="1NKHxQSbuAnFSCP7UCYhVUrSLmAeLwU6Jr" 
                                    mainStyle="bg-base-100 font-mono text-sm" 
                                    btnStyle="btn-sm" 
                                />
                                <p className="text-xs text-base-content/50">
                                    Send exactly <strong>${parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong> to this address
                                </p>
                            </div>
                        ) : (
                            <div className="alert alert-warning text-sm">
                                <AlertTriangle className="h-4 w-4" />
                                <span>No wallet address found for {payMethod}.</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Warning */}
                <div className="alert alert-warning mb-6 text-sm">
                    <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                    <div>
                        <p className="font-medium">Important Note</p>
                        <p className="text-xs mt-1">
                            Please do not click the confirm button twice. Only click it after you have made the payment. 
                            Clicking without paying may attract a penalty.
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        type="button"
                        className="btn btn-primary flex-1 shadow-md hover:shadow-lg transition-all"
                        onClick={handleSave}
                        disabled={loading || saved}
                    >
                        {loading ? (
                            <>
                                <span className="loading loading-spinner loading-sm"></span>
                                Processing...
                            </>
                        ) : saved ? (
                            <>
                                <CheckCircle className="h-4 w-4" />
                                Confirmed!
                            </>
                        ) : (
                            <>
                                <CheckCircle className="h-4 w-4" />
                                Confirm Deposit
                            </>
                        )}
                    </button>
                    <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={() => navigate(-1)}
                        disabled={loading || saved}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}