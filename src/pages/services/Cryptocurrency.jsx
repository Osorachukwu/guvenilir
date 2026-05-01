import { Menu } from 'lucide-react'
import React from 'react'
import image from "../../assets/3.jpg"
import FirstChoice from '../../components/FirstChoice'
import Banner from '../../components/ui/Banner'

export default function Cryptocurrency() {
  return (
    <div>
      <Banner title="Our Services" desc="Forex Trading" />
      <div className='pt-20'>
        {/* Title */}
        <div className='flex flex-col justify-center items-center mb-10'>
          <p className='text-3xl font-bold '>Forex Trading</p>
          <div className='bg-primary h-1 w-48 mt-1'>
          </div>
        </div>

        {/*  */}
        <div className='max-w-4xl mx-auto mb-10'>
          <img src={image} alt="" />

          <div>
            <div className='flex justify-center mt-10'>
              <div className='flex items-start gap-4 sm:gap-6'>
                <div className='h-8 sm:h-14 w-8 sm:w-14 shrink-0 bg-primary rounded-xl sm:rounded-3xl flex justify-center items-center text-black'>
                  <Menu />
                </div>
                <div>
                  <p className='text-lg sm:text-2xl font-semibold mb-3'>
                    The New World

                  </p>
                  <p>
                    CompanyName now offers all traders the opportunity to trade a wide range of the top ranked digital coins 24/7*. Today cryptocurrencies have become known to most people as a conventional and popular investment option. The main purpose of this new technology is to allow people to buy, trade, and invest without the need for banks or any other financial institution. Cryptocurrencies are highly volatile and can be profitable to any trader’s portfolio. Cryptocurrencies are not physical coins they are electronic, a digital asset that remains as data. The technology behind the cryptocurrency controls a large part of its value which holds new technology on the secure way to identify and transfer money. The first digital coin introduced was the Bitcoin and today it remains as the standard that all other coins compare themselves to. Following in its steps came Litecoin, so to date they stand as the top 2 highly valued coins on the market. There are several other coins also reaching a high-level market share such as Bitcoin and Bitcoin Cash, Dash, Ripple, Ethereum and Ethereum Classic.
                  </p>
                </div>
              </div>
            </div>
            <div className='flex justify-center mt-10'>
              <div className='flex items-start gap-4 sm:gap-6'>
                <div className='h-8 sm:h-14 w-8 sm:w-14 shrink-0 bg-primary rounded-xl sm:rounded-3xl flex justify-center items-center text-black'>
                  <Menu />
                </div>
                <div>
                  <p className='text-lg sm:text-2xl font-semibold mb-3'>
                    Why trade Cryptocurrencies with CompanyName
                  </p>
                  <p>
                    Cryptocurrencies could potentially be the currency of the future with more people gaining interest and price value going up. CompanyName offers competitive spreads, with no commissions charged on transactions making it more profitable. When trading with CompanyName you are trading on the price changes of the digital coin, and not physically purchasing it. Trading with CompanyName ensures that you will trade with a 100% reputable broker.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  */}
        <FirstChoice />
      </div>
    </div>
  )
}
