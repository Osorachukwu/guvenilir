import React, { useEffect, useRef, useState } from 'react';

const TradingViewTickerTape = ({
    symbols = [
        'FOREXCOM:SPXUSD',
        'FOREXCOM:NSXUSD',
        'FOREXCOM:DJI',
        'FX:EURUSD',
        'BITSTAMP:BTCUSD',
        'BITSTAMP:ETHUSD',
        'CMCMARKETS:GOLD'
    ],
    colorTheme = 'light',
    width = '100%',
    height = 60,
    locale = 'en',
    speed = 30, // Lower = faster (15-45 recommended range)
    displayMode = 'adaptive', // 'adaptive' or 'compact'
    showSymbolLogo = true,
    isTransparent = false,
    largeChartUrl = ''
}) => {
    const containerRef = useRef(null);
    const widgetRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Don't reinitialize if already loaded
        if (isLoaded) return;

        // Clean up function
        const cleanup = () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
            widgetRef.current = null;
            setIsLoaded(false);
        };

        const initWidget = () => {
            if (!containerRef.current) return;

            try {
                // Clear container
                containerRef.current.innerHTML = '';

                // Format symbols properly for ticker tape
                const formattedSymbols = symbols.map(symbol => {
                    const parts = symbol.split(':');
                    return {
                        proName: symbol,
                        title: parts.length > 1 ? parts[1] : symbol
                    };
                });

                // Create widget configuration with proper sliding settings
                const widgetConfig = {
                    symbols: formattedSymbols,
                    showSymbolLogo: showSymbolLogo,
                    colorTheme: colorTheme,
                    isTransparent: isTransparent,
                    displayMode: displayMode,
                    locale: locale,
                    speed: speed, // This controls the sliding speed
                    largeChartUrl: largeChartUrl,
                    width: '100%',
                    height: height
                };

                // Create and load the widget script
                const script = document.createElement('script');
                script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
                script.async = true;
                script.type = 'text/javascript';
                script.innerHTML = JSON.stringify(widgetConfig);

                script.onload = () => {
                    setIsLoaded(true);
                    setError(null);
                };

                script.onerror = () => {
                    setError('Failed to load TradingView widget');
                };

                containerRef.current.appendChild(script);
                widgetRef.current = script;
            } catch (err) {
                console.error('Error initializing TradingView widget:', err);
                setError('Failed to initialize widget');
            }
        };

        // Load the widget after a small delay to ensure DOM is ready
        const timer = setTimeout(initWidget, 100);

        return () => {
            clearTimeout(timer);
            cleanup();
        };
    }, [symbols, colorTheme, height, locale, speed, displayMode, showSymbolLogo, isTransparent, largeChartUrl]);

    if (error) {
        return (
            <div style={{
                width,
                height,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f8f9fa',
                color: '#dc3545',
                fontSize: '14px',
                border: '1px solid #dee2e6',
                borderRadius: '4px'
            }}>
                {error}
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="tradingview-widget-container"
            style={{
                width,
                height,
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <div
                className="tradingview-widget-container__widget"
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
};

// Alternative: Direct web component approach for better sliding
export const TradingViewTickerTapeWebComponent = ({
    symbols = [
        'FOREXCOM:SPXUSD',
        'FOREXCOM:NSXUSD',
        'FOREXCOM:DJI',
        'FX:EURUSD',
        'BITSTAMP:BTCUSD',
        'BITSTAMP:ETHUSD',
        'CMCMARKETS:GOLD'
    ],
    width = '100%',
    height = 60
}) => {
    const containerRef = useRef(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Load the web component script
        const loadWebComponent = async () => {
            try {
                // Check if script is already loaded
                if (!document.querySelector('script[src*="tv-ticker-tape.js"]')) {
                    const script = document.createElement('script');
                    script.src = 'https://widgets.tradingview-widget.com/w/en/tv-ticker-tape.js';
                    script.type = 'module';
                    script.async = true;

                    await new Promise((resolve, reject) => {
                        script.onload = resolve;
                        script.onerror = reject;
                        document.head.appendChild(script);
                    });
                }

                setError(false);
            } catch (err) {
                console.error('Failed to load web component:', err);
                setError(true);
            }
        };

        loadWebComponent();
    }, []);

    if (error) {
        return (
            <div style={{
                width,
                height,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f8f9fa',
                color: '#dc3545',
                fontSize: '14px',
                border: '1px solid #dee2e6',
                borderRadius: '4px'
            }}>
                Failed to load ticker
            </div>
        );
    }

    return (
        <div ref={containerRef} style={{ width, height }}>
            <tv-ticker-tape
                symbols={symbols.join(',')}
                show-hover
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
};

// Custom CSS animation fallback (if TradingView widget doesn't slide)
export const CustomSlidingTicker = ({
    symbols = [
        { symbol: 'SPX', price: '4,500.25', change: '+0.5%' },
        { symbol: 'NSX', price: '15,000.50', change: '+0.8%' },
        { symbol: 'DJI', price: '35,000.75', change: '-0.2%' },
        { symbol: 'EUR/USD', price: '1.0925', change: '+0.1%' },
        { symbol: 'BTC', price: '45,000', change: '+2.5%' },
        { symbol: 'ETH', price: '2,500', change: '+1.8%' },
        { symbol: 'GOLD', price: '2,050', change: '+0.3%' }
    ],
    width = '100%',
    height = 60
}) => {
    const [isPaused, setIsPaused] = useState(false);

    // Custom CSS for sliding animation
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
      @keyframes slide {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      
      .ticker-wrapper {
        overflow: hidden;
        white-space: nowrap;
        position: relative;
        background: linear-gradient(90deg, #f8f9fa 0%, #ffffff 100%);
        border: 1px solid #dee2e6;
        border-radius: 4px;
      }
      
      .ticker-content {
        display: inline-block;
        animation: slide ${symbols.length * 3}s linear infinite;
        padding: 10px 0;
      }
      
      .ticker-content.paused {
        animation-play-state: paused;
      }
      
      .ticker-item {
        display: inline-block;
        padding: 0 20px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
        border-right: 1px solid #dee2e6;
      }
      
      .ticker-symbol {
        font-weight: 600;
        color: #333;
        margin-right: 8px;
      }
      
      .ticker-price {
        color: #666;
        margin-right: 8px;
      }
      
      .ticker-change {
        font-weight: 500;
      }
      
      .ticker-change.positive {
        color: #28a745;
      }
      
      .ticker-change.negative {
        color: #dc3545;
      }
    `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <div
            className="ticker-wrapper"
            style={{ width, height }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className={`ticker-content ${isPaused ? 'paused' : ''}`}>
                {/* Double the items for seamless loop */}
                {[...symbols, ...symbols].map((item, index) => (
                    <div key={index} className="ticker-item">
                        <span className="ticker-symbol">{item.symbol}</span>
                        <span className="ticker-price">{item.price}</span>
                        <span className={`ticker-change ${item.change.startsWith('+') ? 'positive' : 'negative'}`}>
                            {item.change}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Main component with multiple options
export const TickerTapeSelector = () => {
    const [selectedType, setSelectedType] = useState('tradingview');

    const customSymbols = [
        'FOREXCOM:SPXUSD',
        'FOREXCOM:NSXUSD',
        'FOREXCOM:DJI',
        'FX:EURUSD',
        'BITSTAMP:BTCUSD',
        'BITSTAMP:ETHUSD',
        'CMCMARKETS:GOLD'
    ];

    const customData = [
        { symbol: 'S&P 500', price: '4,500.25', change: '+0.5%' },
        { symbol: 'NASDAQ', price: '15,000.50', change: '+0.8%' },
        { symbol: 'DOW JONES', price: '35,000.75', change: '-0.2%' },
        { symbol: 'EUR/USD', price: '1.0925', change: '+0.1%' },
        { symbol: 'BTC/USD', price: '45,000', change: '+2.5%' },
        { symbol: 'ETH/USD', price: '2,500', change: '+1.8%' },
        { symbol: 'GOLD', price: '2,050', change: '+0.3%' }
    ];

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '20px' }}>Market Ticker Tape</h2>

            <div style={{ marginBottom: '20px' }}>
                <button
                    onClick={() => setSelectedType('tradingview')}
                    style={{
                        padding: '10px 20px',
                        marginRight: '10px',
                        backgroundColor: selectedType === 'tradingview' ? '#007bff' : '#f8f9fa',
                        color: selectedType === 'tradingview' ? 'white' : '#333',
                        border: '1px solid #dee2e6',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    TradingView Widget
                </button>
                <button
                    onClick={() => setSelectedType('webcomponent')}
                    style={{
                        padding: '10px 20px',
                        marginRight: '10px',
                        backgroundColor: selectedType === 'webcomponent' ? '#007bff' : '#f8f9fa',
                        color: selectedType === 'webcomponent' ? 'white' : '#333',
                        border: '1px solid #dee2e6',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Web Component
                </button>
                <button
                    onClick={() => setSelectedType('custom')}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: selectedType === 'custom' ? '#007bff' : '#f8f9fa',
                        color: selectedType === 'custom' ? 'white' : '#333',
                        border: '1px solid #dee2e6',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Custom CSS Animation
                </button>
            </div>

            <div
                className='bg-red-300 rounded-md p-4'>
                {selectedType === 'tradingview' && (
                    <>
                        <h3 style={{ marginBottom: '15px', color: '#333' }}>TradingView Widget</h3>
                        <TradingViewTickerTape
                            symbols={customSymbols}
                            colorTheme="light"
                            height={70}
                            speed={25} // Lower = faster sliding
                            displayMode="adaptive"
                        />
                    </>
                )}

                {selectedType === 'webcomponent' && (
                    <>
                        <h3 style={{ marginBottom: '15px', color: '#333' }}>Web Component</h3>
                        <TradingViewTickerTapeWebComponent
                            symbols={customSymbols}
                            height={70}
                        />
                    </>
                )}

                {selectedType === 'custom' && (
                    <>
                        <h3 style={{ marginBottom: '15px', color: '#333' }}>Custom CSS Animation</h3>
                        <CustomSlidingTicker
                            symbols={customData}
                            height={70}
                        />
                    </>
                )}
            </div>

            <div style={{
                marginTop: '20px',
                backgroundColor: 'red',
                border: '1px solid #dee2e6',
                borderRadius: '8px',
                padding: '15px',
                fontSize: '14px',
                color: '#666'
            }}>
                <strong>Note:</strong>
                <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
                    <li>TradingView widget should slide automatically with the 'speed' parameter</li>
                    <li>If it doesn't slide, try the web component or custom CSS version</li>
                    <li>The custom CSS version provides a guaranteed sliding animation</li>
                </ul>
            </div>
        </div>
    );
};

export default TradingViewTickerTape;