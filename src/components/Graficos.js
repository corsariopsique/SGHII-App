import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './Graficos.css';

const DynamicChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [{
                label: 'Sales',
                data: [12, 19, 3, 5, 2],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
                }]
            },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    return () => {
    myChart.destroy();
    };

    }, []);

  return <div id="grafico">
    <canvas ref={chartRef} />
    </div>;
};

export default DynamicChart;