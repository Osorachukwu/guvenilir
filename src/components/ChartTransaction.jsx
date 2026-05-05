import { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';

const ChartTransaction = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      Highcharts.chart(chartRef.current, {
        chart: {
          type: 'areaspline',
          backgroundColor: 'transparent',
          style: {
            fontFamily: 'Arial, sans-serif'
          }
        },
        title: {
          text: null
        },
        xAxis: {
          categories: ['1990', '2000', '2010', '2020', '2030', '2040', '2050'],
          labels: {
            style: {
              color: '#666',
              fontSize: '12px'
            }
          },
          lineColor: '#e5e5e5',
          tickColor: '#e5e5e5'
        },
        yAxis: {
          title: {
            text: null
          },
          labels: {
            format: '{value}k',
            style: {
              color: '#666',
              fontSize: '12px'
            }
          },
          gridLineColor: '#e5e5e5',
          min: 0,
          max: 60,
          tickInterval: 20
        },
        legend: {
          align: 'center',
          verticalAlign: 'bottom',
          layout: 'horizontal',
          itemStyle: {
            color: '#666',
            fontWeight: 'normal',
            fontSize: '14px'
          },
          symbolRadius: 0,
          symbolWidth: 12,
          symbolHeight: 12
        },
        tooltip: {
          shared: true,
          valueSuffix: 'k'
        },
        plotOptions: {
          areaspline: {
            fillOpacity: 0.3,
            lineWidth: 2,
            marker: {
              enabled: false
            }
          }
        },
        series: [
          {
            name: 'Deposit',
            data: [20, 25, 35, 45, 50, 48, 45],
            color: '#4CAF50',
            fillColor: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
              stops: [
                [0, 'rgba(76, 175, 80, 0.3)'],
                [1, 'rgba(76, 175, 80, 0)']
              ]
            }
          },
          {
            name: 'Withdraw',
            data: [15, 18, 25, 35, 42, 45, 48],
            color: '#f44336',
            fillColor: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
              stops: [
                [0, 'rgba(244, 67, 54, 0.3)'],
                [1, 'rgba(244, 67, 54, 0)']
              ]
            }
          }
        ],
        credits: {
          enabled: true,
          text: 'Highcharts.com',
          href: 'https://www.highcharts.com/',
          style: {
            color: '#999',
            fontSize: '10px'
          }
        }
      });
    }
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 h-full">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Current Rate</h2>
        </div>
        <div ref={chartRef} className="w-full h-full max-h-[240px]" />
      </div>
    </div>
  );
};

export default ChartTransaction;