import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { bodyComposition } from '../services/api';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const BodyCompositionChart = ({ userId }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await bodyComposition.getAll(userId);
        const data = response.data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        setChartData({
          labels: data.map(entry => new Date(entry.timestamp).toLocaleDateString()),
          datasets: [
            {
              label: 'Weight (kg)',
              data: data.map(entry => entry.weight),
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              yAxisID: 'y',
            },
            {
              label: 'BMI',
              data: data.map(entry => entry.bmi),
              borderColor: 'rgb(54, 162, 235)',
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              yAxisID: 'y1',
            },
            {
              label: 'Body Fat Percentage',
              data: data.map(entry => entry.body_fat_percentage),
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
              yAxisID: 'y1',
            },
          ],
        });
      } catch (error) {
        console.error('Failed to fetch body composition data:', error);
      }
    };

    fetchData();
  }, [userId]);

  if (!chartData) return <div>Loading...</div>;

  return (
    <div>
      <h2>Body Composition Over Time</h2>
      <Line
        data={chartData}
        options={{
          responsive: true,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          stacked: false,
          plugins: {
            title: {
              display: true,
              text: 'Body Composition Trend',
            },
          },
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              title: {
                display: true,
                text: 'Weight (kg)'
              }
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              grid: {
                drawOnChartArea: false,
              },
              title: {
                display: true,
                text: 'BMI / Body Fat %'
              }
            },
          },
        }}
      />
    </div>
  );
};

export default BodyCompositionChart;