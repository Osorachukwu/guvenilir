import { CalendarDays, Globe2Icon, LucideAppWindow, Shield, Wifi } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { detectBrowser, detectOS, formatDate } from '../../../utils/browserOS'

export default function SettingsAndInfo() {
    const { user } = useAuth()
    const [userIP, setUserIP] = useState('Loading...')
    const [browser, setBrowser] = useState('')
    const [os, setOS] = useState('')

    useEffect(() => {
        // Detect browser and OS
        setBrowser(detectBrowser())
        setOS(detectOS())

        // Fetch user IP
        const fetchIP = async () => {
            try {
                const response = await fetch('https://api.ipify.org?format=json')
                const data = await response.json()
                setUserIP(data.ip || 'N/A')
            } catch (error) {
                console.error('Error fetching IP:', error)
                setUserIP('N/A')
            }
        }

        fetchIP()
    }, [])

    const infoData = [
        { icon: <Shield size={16} />, title: "Sign Up Date", value: formatDate(user?.createdAt) },
        { icon: <CalendarDays size={16} />, title: "Last Login", value: formatDate(user?.updatedAt) },
        { icon: <Wifi size={16} />, title: "Your IP", value: userIP },
        { icon: <LucideAppWindow size={16} />, title: "Operating System", value: os },
        { icon: <Globe2Icon size={16} />, title: "Browser", value: browser }
    ]

    return (
        <div className='card bg-base-300 flex-1'>
            <div className='card-body'>
                <p className="p-4 pb-2 text-xs opacity-60 tracking-wide uppercase">Settings & Info</p>

                <div className="overflow-x-auto">
                    <table className="table table-sm">
                        <tbody>
                            {infoData.map((item, i) => (
                                <tr key={i} className='hover:bg-base-100 group transition-all duration-500 ease-in-out'>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="rounded-lg shadow-lg overflow-hidden h-8 w-8 flex justify-center items-center bg-base-100 group-hover:bg-base-300 transition-all duration-700 ease-in-out">
                                                    {item.icon}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{item.title}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-right">{item.value}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}
