import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CopyableText } from '../../components/ui/CopyableText';
import TimedAlert from '../../components/ui/TimedAlert';

const DEPOSIT_URL = "https://invest.esbatech.org/deposit.php";
const BIZ = "bank";
const DOMAIN_KEY = "254342";

const profitMap = {
    "Plan A": "15.00%",
    "Plan B": "30.00%",
    "Plan C": "50.00%",
    "Plan D": "75.00%",
    "Plan E": "100.00%",
};

const wallets = [
    { wallet: "Bitcoin",      payMethod: "btc",  walletAddress: "bc1qmnhg0lrdqv2ut96ly6rt8pdqzqa7ltkzmj82j5" },
    { wallet: "Ethereum",     payMethod: "eth",  walletAddress: "0x56AEB5C4aF0319E125f1BdAa9127A5e2Cd61d1A6" },
    { wallet: "USDT(TRC20)",  payMethod: "usdt", walletAddress: "TM4RUeSht9jY9QZGWfSqc4NBJHfdiCEQyf" },
    { wallet: "SOLANA",       payMethod: "sol",  walletAddress: "21AfzRjwtHpf2pkvJ6o9xspStxhCFv1dM5CnLrWjnZqm" },
    { wallet: "XRP",          payMethod: "xrp",  walletAddress: "0rp4RnrX2qKUtwFCoQs2xPioBx63c4yHCGp" },
    { wallet: "TRX",          payMethod: "trx",  walletAddress: "TM4RUeSht9jY9QZGWfSqc4NBJHfdiCEQyf" },
    { wallet: "LTC",          payMethod: "ltc",  walletAddress: "ltc1qf8dm2g7306t3a5exx42pe55x3tks0kmdyzex65" },
    { wallet: "Dogecoin",     payMethod: "doge", walletAddress: "DHBbbqNJHEHUif8MZeN1TDqs2S5BZGKuSp5" },
];

export default function ConfirmDeposit() {
    const location = useLocation();
    const navigate = useNavigate();

    // Expect these passed via location.state from the previous page
    const plan        = location.state?.plan;          // e.g. "A"
    const amount      = location.state?.amount;        // e.g. "1.6"
    const payMethod   = location.state?.payMethod;     // e.g. "btc"
    console.log(plan)
    console.log(amount)
    console.log(payMethod)

    const [loading, setLoading] = useState(false);
    const [saved, setSaved]     = useState(false);
    const [alert, setAlert]     = useState(null);

    // Match wallet entry by payMethod shortcode
    const selectedWallet = wallets.find(
        w => w.payMethod.toLowerCase() === payMethod?.toLowerCase()
    );

    // Derive the full plan name for display (e.g. "A" → "Plan A")
    const planLabel = plan ? `Plan ${plan}` : "N/A";

    const handleSave = async () => {
        setAlert(null);

        const username = localStorage.getItem("username");
        const token    = localStorage.getItem("token");

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

    return (
        <div className="bg-base-100 text-base-content min-h-screen">
            <div className="mx-auto max-w-7xl py-16 px-4">

                <p className="font-semibold mb-8">
                    Please confirm your deposit: {selectedWallet?.wallet ?? payMethod}
                </p>

                <p className="mb-4">STEPS TO MAKE DEPOSIT:</p>
                <ol className="list-decimal list-inside space-y-1 mb-8">
                    <li>Copy the company wallet address below.</li>
                    <li>Go to your wallet app and send the exact amount.</li>
                    <li>Come back and click the Save button below.</li>
                </ol>

                <div className="py-5 my-8 border-y border-base-300">
                    <p className="mb-5">WALLET ADDRESS:</p>
                    {selectedWallet ? (
                        <div className="mb-4">
                            <p className="mb-3">{selectedWallet.wallet}:</p>
                            <div className="flex">
                                <CopyableText
                                    text={selectedWallet.walletAddress}
                                    mainStyle="font-semibold bg-base-300"
                                    btnStyle="font-semibold bg-base-300"
                                />
                            </div>
                        </div>
                    ) : (
                        <p className="text-base-content/50">No wallet address found for the selected payment method.</p>
                    )}
                </div>

                <p className="my-6">AFTER PAYMENT COME BACK AND HIT THE SAVE BUTTON</p>
                <p className="mb-4">
                    NOTE — Please do not click the save button twice and do not click it if you are not ready to make
                    payment. This might attract a penalty.
                </p>

                <div className="space-y-1 mb-8">
                    <p><b>Plan:</b> {planLabel}</p>
                    <p><b>Amount:</b> ${amount}</p>
                    <p><b>Profit:</b> {profitMap[planLabel] ?? "N/A"}</p>
                    <p><b>Payment Method:</b> {selectedWallet?.wallet ?? payMethod}</p>
                    <p><b>Principal Return:</b> Yes</p>
                    <p><b>Principal Withdraw:</b> Not available during investment</p>
                    <p><b>Deposit Fee:</b> $0.00</p>
                </div>

                {/* Timed alert for all feedback */}
                {alert && (
                    <TimedAlert
                        text={alert.text}
                        type={alert.type}
                        onClose={() => setAlert(null)}
                    />
                )}

                <div className="mt-4 join">
                    <button
                        type="button"
                        className="join-item btn btn-primary text-black px-8"
                        onClick={handleSave}
                        disabled={loading || saved}
                    >
                        {loading ? "Saving..." : saved ? "Saved!" : "Save"}
                    </button>
                    <button
                        type="button"
                        className="join-item btn px-8"
                        onClick={() => navigate(-1)}
                        disabled={loading || saved}
                    >
                        Cancel
                    </button>
                </div>

            </div>
        </div>
    );
}