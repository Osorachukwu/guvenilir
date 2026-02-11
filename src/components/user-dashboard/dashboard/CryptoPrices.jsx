// import { Bitcoin } from 'lucide-react'
// import React from 'react'

// export default function CryptoPrices() {
//     return (
//         <div className='card bg-base-300 flex-1'>
//             <div className='card-body'>
//                 <p className="p-4 pb-2 text-xs opacity-60 tracking-wide">CRYPTO CURRENCEY MARKET PRICES</p>

//                 <div className="overflow-x-auto">
//                     <table className="table table-sm">
//                         <tbody>
//                             {[
//                                 { title: "Bitcoin", price: "$69,054.0", change: "+0.68%" },
//                                 { title: "Litecoin", price: "$54.27", change: "+0.18%" },
//                                 { title: "Etherum", price: "$2,050.76", change: "+3.60%" },
//                                 { title: "Dash", price: "$36,60", change: "-2.56%" },
//                                 { title: "Dogecoin", price: "$0,09666", change: "+0.29%" }
//                                 // { title: "Bitcoin Cash", price: "$526,05", change: "+0.68%" },
//                             ].map((item, i) => (
//                                 <tr className='hover:bg-base-100 group transition-all duration-500 ease-in-out'>
//                                     <td>
//                                         <div className="flex items-center gap-3">
//                                             <div className="avatar">
//                                                 <div className="rounded-lg shadow-lg overflow-hidden h-8 w-8 flex justify-center items-center bg-base-100 group-hover:bg-base-300 transition-all duration-700 ease-in-out">
//                                                     <Bitcoin size={16} />
//                                                 </div>
//                                             </div>
//                                             <div>
//                                                 <div className="font-bold">{item.title}</div>
//                                             </div>
//                                         </div>
//                                     </td>
//                                     <td>{item.price}</td>
//                                     <td>{item.change}</td>
//                                 </tr>

//                             ))}

//                         </tbody>
//                     </table>
//                 </div>

//             </div>
//         </div>
//     )
// }


import { Bitcoin } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function CryptoPrices() {
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const res = await fetch(
                    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,litecoin,dash,dogecoin&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h'
                )
                const data = await res.json()
                setCoins(data)
            } catch (err) {
                console.error('Failed to fetch crypto prices', err)
            } finally {
                setLoading(false)
            }
        }

        fetchPrices()
    }, [])

    return (
        <div className='card bg-base-300 flex-1'>
            <div className='card-body'>
                <p className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                    CRYPTO CURRENCY MARKET PRICES
                </p>

                <div className="overflow-x-auto">
                    <table className="table table-sm">
                        <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan={3} className="text-center opacity-60">
                                        Loading market data…
                                    </td>
                                </tr>
                            )}

                            {!loading && coins.map((coin) => {
                                const isPositive = coin.price_change_percentage_24h >= 0

                                return (
                                    <tr
                                        key={coin.id}
                                        className='hover:bg-base-100 group transition-all duration-500 ease-in-out'
                                    >
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="rounded-lg shadow-lg overflow-hidden h-8 w-8 flex justify-center items-center bg-base-100 group-hover:bg-base-300 transition-all duration-700 ease-in-out">
                                                        <img
                                                            src={coin.image}
                                                            alt={coin.name}
                                                            className="h-5 w-5"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{coin.name}</div>
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            ${coin.current_price.toLocaleString()}
                                        </td>

                                        <td
                                            className={
                                                isPositive ? 'text-success' : 'text-error'
                                            }
                                        >
                                            {isPositive ? '+' : ''}
                                            {coin.price_change_percentage_24h.toFixed(2)}%
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
