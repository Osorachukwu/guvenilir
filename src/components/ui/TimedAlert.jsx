import React, { useEffect, useState } from 'react'
import {
    CheckCircle,
    XCircle,
    AlertTriangle,
    Info,
    X,
    TrendingUp,
    ShieldCheck,
    Banknote
} from 'lucide-react'

export default function TimedAlert({ text, type = "info", duration = 5000, onClose }) {
    const [visible, setVisible] = useState(true)
    const [progress, setProgress] = useState(100)
    const [isExiting, setIsExiting] = useState(false)

    useEffect(() => {
        if (!text) return

        setVisible(true)
        setIsExiting(false)
        setProgress(100)

        const startTime = Date.now()
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime
            const remaining = Math.max(0, 100 - (elapsed / duration) * 100)
            setProgress(remaining)

            if (remaining <= 0) {
                clearInterval(interval)
                handleClose()
            }
        }, 50)

        return () => clearInterval(interval)
    }, [text, duration])

    const handleClose = () => {
        setIsExiting(true)
        setTimeout(() => {
            setVisible(false)
            onClose?.()
        }, 300)
    }

    if (!visible || !text) return null

    // Config for each alert type
    const config = {
        success: {
            bg: "from-success/5 to-success/10 border-success/30",
            text: "text-success",
            progressBg: "bg-success",
            icon: CheckCircle,
            accent: "before:bg-success/20",
        },
        error: {
            bg: "from-error/5 to-error/10 border-error/30",
            text: "text-error",
            progressBg: "bg-error",
            icon: XCircle,
            accent: "before:bg-error/20",
        },
        warning: {
            bg: "from-warning/5 to-warning/10 border-warning/30",
            text: "text-warning",
            progressBg: "bg-warning",
            icon: AlertTriangle,
            accent: "before:bg-warning/20",
        },
        info: {
            bg: "from-info/5 to-info/10 border-info/30",
            text: "text-info",
            progressBg: "bg-info",
            icon: Info,
            accent: "before:bg-info/20",
        },
    }

    const { bg, text: textColor, progressBg, icon: IconComponent, accent } = config[type] || config.info

    return (
        <div className={`fixed top-4 inset-x-4 sm:inset-x-auto sm:right-4 z-[100] sm:max-w-md w-auto sm:w-full transition-all duration-300 ${isExiting ? 'opacity-0 translate-x-4 scale-95' : 'opacity-100 translate-x-0 scale-100'
            }`}>
            <div className={`
            relative overflow-hidden
            bg-gradient-to-br ${bg}
            border rounded-2xl shadow-2xl backdrop-blur-sm
            p-4 pr-12
            transition-all duration-300
            hover:shadow-2xl hover:scale-[1.02]
        `}>
                {/* Decorative background pattern */}
                <div className="absolute top-0 right-0 w-24 h-24 opacity-[0.03] pointer-events-none hidden sm:block">
                    <TrendingUp className="w-full h-full" />
                </div>

                {/* Left accent bar */}
                <div className={`absolute left-0 top-3 bottom-3 w-1 rounded-full ${progressBg} opacity-50`}></div>

                {/* Content */}
                <div className="flex items-start gap-3 relative z-10">
                    {/* Icon with pulse */}
                    <div className={`relative flex-shrink-0 mt-0.5`}>
                        <div className={`absolute inset-0 rounded-full ${progressBg} opacity-20 animate-ping`}></div>
                        <IconComponent className={`h-5 w-5 ${textColor} relative`} />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold ${textColor} leading-tight`}>
                            {type === 'success' && 'Success! '}
                            {type === 'error' && 'Error! '}
                            {type === 'warning' && 'Warning! '}
                            {type === 'info' && 'Heads up! '}
                        </p>
                        <p className="text-sm text-base-content/80 mt-0.5 leading-relaxed">
                            {text}
                        </p>
                    </div>

                    {/* Close button - bigger on mobile */}
                    <button
                        onClick={handleClose}
                        className="absolute -right-1 -top-1 sm:right-1 sm:top-1 btn btn-ghost btn-sm sm:btn-xs btn-circle hover:bg-base-300/50 flex-shrink-0"
                        type="button"
                    >
                        <X className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                    </button>
                </div>

                {/* Progress bar */}
                <div className="mt-3 h-1 bg-base-300/50 rounded-full overflow-hidden">
                    <div
                        className={`h-full ${progressBg} rounded-full transition-all duration-300 ease-linear`}
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Bottom accent dots */}
                <div className="absolute bottom-2 right-3 gap-1 opacity-20 hidden sm:flex">
                    <div className={`w-1 h-1 rounded-full ${progressBg}`}></div>
                    <div className={`w-1.5 h-1.5 rounded-full ${progressBg}`}></div>
                    <div className={`w-1 h-1 rounded-full ${progressBg}`}></div>
                </div>
            </div>
        </div>
    )
}