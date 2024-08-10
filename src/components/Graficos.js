import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './Graficos.css';

const DynamicChart = (props) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const myChart = new Chart(ctx, {
      type: props.type,
      data: {
            labels:props.labels.map(row => row.labels),
            datasets: [{
                label: props.label,
                data: props.data.map(row => row.data),
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

  return <div id={props.id}>
    <canvas ref={chartRef} />
    </div>;
};

export default DynamicChart;