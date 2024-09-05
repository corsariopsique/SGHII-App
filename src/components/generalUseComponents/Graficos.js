import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './Graficos.css';

const DynamicChart = (props) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const myChart = new Chart(ctx, {
      type: props.type,
      data:props.data,
        options: {
            indexAxis: props.indexAxis,
            responsive: true,
            maintainAspectRatio: false,
            plugins:{
              legend:{
                position:props.position                
              }
            }
        }
    });

    return () => {
    myChart.destroy();
    };

    }, [props]);

  return ( 
      <div id={props.id}>      
        <canvas ref={chartRef} />
      </div>    
    );
};

export default DynamicChart;