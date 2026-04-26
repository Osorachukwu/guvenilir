import React from 'react'
import Banner from '../components/ui/Banner'

export default function OilAndGas() {
  return (
    <div>
      <Banner />

      <div className='mx-auto max-w-7xl'>
        <div className='pt-20 grid grid-cols-3 mb-10'>
          {[1, 2, 3].map(() => (
            <div className="card bg-base-100 w-96 rounded-none">
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes" />
              </figure>
              <div className="card-body px-0">
                <h2 className="card-title">Oil trading with CFD</h2>
                <p>
                  Surprising as it might be, anyone can invest in the oil market to make a profit. Indeed, the development of online trading platforms has allowed individuals to use their savings to speculate on rising or falling oil prices. To this end, simply choose your method of trading between the CFDs offered by Forex brokers, which are specifically designed for beginners. Invest-oil.co.uk makes a point to explain how these two trading tools work and how best to use them for profit.
                </p>
                <h2 className="card-title mt-8">CFDs for investing in oil:</h2>
                <p>
                  At the present time CFDs are undoubtedly the most appropriate tools for investing your money in the oil price. They are in fact ‘Contracts for the Difference’ that are available online through broker trading platforms and enable individuals to speculate on the price per barrel of WTI or Brent crude oil from a secure area online. More precisely, CFDs enable you to take position in just a few clicks, on buying and selling positions on the crude oil stock markets. You can thereby speculate on the rise or fall of the oil price and close your positions when the price per barrel has attained the price objective that you fixed. Your profit will correspond here to the price difference between the opening time and closing times of your position in proportion to the amount invested and if the price has moved in the direction you forecast. In the case to the contrary your loss will also represent this price difference. CFDs offer numerous advantages including the fact that they are very easy to use, even for individuals that are not used to investing alone on the financial markets. Another thing, they offer a leverage effect that enables an increase in the amount of your profits even with a small difference in rate. Of course, you also have a wide range of tools available such as orders that enable you to effectively manage your positions and reduce your risks. You will of course find lots of information about oil trading using CFDs on our website which also offers advice on how to best use these trading instruments. In this way you can start to use them when investing your capital in oil without having to go through an intermediary.
                </p>
              </div>
            </div>
          ))}
        </div>
        {/*  */}
        <div>
          <p className='mb-8 leading-8'>
            As an individual, the best method available for trading in oil is through the use of an online trading platform that specialises in CFDs. You will find this service widely available among brokers that enable you, through the use of CFDs, to speculate on oil and other assets such as shares and stock market indices or other commodities such as gold. The operation of CFDs could not be simpler and more convenient for the use of anyone that wishes to invest in the oil market without having any previous experience in trading. It simply requires that you take a position on the rise or the fall of the oil price at a given moment and close your position when the foreseen profits are reached or when you wish to cut your losses.
          </p>
          <p className='text-xl font-bold mb-4'>Let us take a simple example:</p>
          <p className='mb-8 leading-8'>
            The actual price of a barrel of WTI is 106 dollars and you foresee a rise in this price due to a decrease in the American oil stocks. You therefore subscribe to a CFD on the rise. If the price per barrel does rise you can place an order or manually close your position and you will make a profit equivalent to the difference between your subscription price and the closing price. If, to the contrary, the price falls you will lose the difference between the subscription price and the closing price, unless you have speculated on the price falling.
          </p>
          <p className='text-xl font-bold mb-4'>How to choose your trading platform:
          </p>
          <p className='mb-8 leading-8'>
            As you will surely notice, the online trading platforms that offer the opportunity to speculate on the oil price are numerous. It is therefore necessary that you take the time to carefully compare them in order to choose the one that offers you the most advantages. You therefore need to verify certain important points such as: The spreads practised. The possible leverage effects. The tools and indicators available. The quality and simplicity of the platform
          </p>
          <p className='text-xl font-bold mb-4'>Oil: An asset with a future </p>
          <p className='mb-8 leading-8'>
            The first thing we should confirm regarding oil is that this asset will always be popular for trading and always in demand. In fact, oil is still the most used fossil fuel throughout the world and plays a primary role as a commodity in the fabrication of numerous industrial products. Due to the development of numerous countries that have consumed little oil up to now, the demand has therefore risen enormously, but also because of the exhaustible nature of this energy, it seems logical that the supply will lessen in the future whereas the demand will continue to grow. Although this statement is slightly mitigated due to the development of renewable forms of energy, the latter are still far from being able to take the stage alongside oil as a major energy source and therefore oil still looks to have many good years ahead as an investment. Investing in oil over the long term is therefore considered as a secure placement.
          </p>
          <p className='text-xl font-bold mb-4'>Profit from the fall in the price to invest in oil over the long term:</p>
          <p className='mb-8 leading-8'>
            You have no doubt noticed that, since 2014, the oil prices have fallen greatly. After approaching $100 per barrel they finally lost nearly 50% of their value. But, as with all financial markets, the oil market is governed by cycles alternating between rising and falling trends. Therefore, the analysts predict a new rising trend shortly that may enable investors to achieve substantial profits. It is therefore judicious to closely monitor the emergence of this new trend to take position over the long term, or take position now using a short term cover.
          </p>
          <p className='text-xl font-bold mb-4'>How to cover a long term investment in oil?</p>
          <p className='mb-8 leading-8'>
            As we have just seen, the oil sector analysts expect a new rise in the price per barrel of oil in the coming months or years. It may therefore be beneficial to invest in oil over the long term. But, while waiting for this trend to begin, the price per barrel may still experience a further fall. To cover any eventual losses during this period, you may opt for a strategy that aims to take short parallel positions to sell with a strong leverage effect of which the profits enable you to keep your long position open until the rising objective is reached.
          </p>
          <p className='text-xl font-bold mb-4'>The indicators to take into account for oil trading:</p>
          <p className='mb-8 leading-8'>
            To trade in oil online using CFDs it is strongly recommended to use data from both technical and fundamental analysis. Your technical analysis can be completed using comprehensive customised charts that are available through your broker on the trading platform upon which you can display different indicators. Concerning fundamental analysis, this consists of monitoring and analysing the factors and exterior events that may influence the oil price. These of course include data on the supply and demand of oil throughout the world as well as other indicators. For example, the American oil stocks are carefully monitored by traders. You will find them each week in the economic calendar as they are published every Wednesday. These stocks give you concrete information on the demand and consumer levels of oil. Large stocks have a tendency to lower the price of oil and vice versa. Finally, the U.S. Dollar rate can also influence the oil price as an advantageous exchange rate can encourage buyers to invest in the commodity which is quoted in this currency.
          </p>

        </div>
      </div>
    </div>
  )
}
