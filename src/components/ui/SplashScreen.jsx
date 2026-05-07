import React, { useState, useEffect } from 'react'
import Logo from './Logo'

const TAGLINES = [
    "Invest in Your Future",
    "Grow Your Wealth Securely",
    "Smart Investments, Better Returns",
    "Your Financial Journey Starts Here",
]

export default function SplashScreen() {
    const [isExiting, setIsExiting] = useState(false)
    const [progress, setProgress] = useState(0)
    const [tagline] = useState(() => TAGLINES[Math.floor(Math.random() * TAGLINES.length)])

    useEffect(() => {
        // Animate progress bar
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval)
                    return 100
                }
                return prev + 0.45  // ← Slower: +0.45 every 40ms ≈ 8.9 seconds to reach 100%
            })
        }, 40)

        // Start exit animation and redirect
        const exitTimer = setTimeout(() => {
            setIsExiting(true)
        }, 9300)

        const redirectTimer = setTimeout(() => {
            // Use window.location instead of navigate
            window.location.href = '/'
        }, 9800)

        return () => {
            clearInterval(progressInterval)
            clearTimeout(exitTimer)
            clearTimeout(redirectTimer)
        }
    }, [])

    return (
        <div className={`
            fixed inset-0 z-[9999] flex flex-col items-center justify-center
            bg-gradient-to-br from-base-200 via-base-100 to-base-300
            transition-all duration-500 ease-in-out
            ${isExiting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}
        `}>
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-primary/10"
                        style={{
                            width: `${Math.random() * 40 + 10}px`,
                            height: `${Math.random() * 40 + 10}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>

            {/* Logo with glow */}
            <div className="relative mb-8">
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping scale-150"
                    style={{ animationDuration: '3s' }}
                />
                <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse scale-125"
                    style={{ animationDuration: '2s' }}
                />

                {/* Logo container */}
                <div className={`
                    relative bg-base-100/80 backdrop-blur-sm rounded-3xl p-8
                    border border-primary/20 shadow-2xl shadow-primary/10
                    transition-all duration-700
                    ${isExiting ? 'scale-90' : 'scale-100'}
                `}>
                    <Logo />
                </div>
            </div>

            {/* Tagline */}
            <div className={`
                text-center transition-all duration-500 delay-200
                ${isExiting ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
            `}>
                <p className="text-xl sm:text-2xl font-semibold text-base-content/80">
                    {tagline}
                </p>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-base-300/50">
                <div
                    className="h-full bg-primary transition-all duration-300 ease-linear rounded-r-full"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Bottom branding */}
            <div className={`
                absolute bottom-8 text-center transition-all duration-500 delay-300
                ${isExiting ? 'opacity-0' : 'opacity-50'}
            `}>
                <p className="text-xs text-base-content/40 tracking-widest uppercase">
                    Secure Investment Platform
                </p>
            </div>

            {/* CSS for floating animation */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
                    50% { transform: translateY(-20px) scale(1.1); opacity: 0.6; }
                }
            `}</style>
        </div>
    )
}