import React, { useEffect, useRef } from "react";

export default function TradingViewTicker() {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;

    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
        { proName: "FOREXCOM:NSXUSD", title: "US 100" },
        { proName: "FX_IDC:EURUSD", title: "EUR/USD" },
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
        { proName: "BITSTAMP:ETHUSD", title: "Ethereum" }
      ],
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: "adaptive",
      displayMode: "regular",
      colorTheme: "dark",
      locale: "en"
    });

    container.current.appendChild(script);
  }, []);

  return (
    <div className="w-full z-40 h-16 py-4 rounded-lg flex items-center bg-black/50">
      <div
        ref={container}
        className="tradingview-widget-container overflow-hidden"
      />
    </div>
  );
}







// import React, { useEffect, useRef } from "react";

// export default function TradingViewTicker() {
//   const container = useRef();

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src =
//       "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
//     script.async = true;

//     script.innerHTML = JSON.stringify({
//       symbols: [
//         { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
//         { proName: "FOREXCOM:NSXUSD", title: "US 100" },
//         { proName: "FX_IDC:EURUSD", title: "EUR/USD" },
//         { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
//         { proName: "BITSTAMP:ETHUSD", title: "Ethereum" }
//       ],
//       showSymbolLogo: true,
//       isTransparent: true,
//       displayMode: "regular", // 👈 THIS makes it scroll like a belt
//       colorTheme: "dark",
//       locale: "en"
//     });

//     container.current.appendChild(script);
//   }, []);

//   return (
//     <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50">
//       <div
//         ref={container}
//         className="tradingview-widget-container rounded-2xl overflow-hidden backdrop-blur-lg"
//       />
//     </div>
//   );
// }