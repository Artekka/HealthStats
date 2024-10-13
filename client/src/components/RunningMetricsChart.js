import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { runningMetrics } from '../services/api';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RunningMetricsChart = ({ userId }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await runningMetrics.getAll(userId);
        const data = response.data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        setChartData({
          labels: data.map(entry => new Date(entry.timestamp).toLocaleDateString()),
          datasets: [
            {
              label: 'Distance (mi)',
              data: data.map(entry => entry.distance),
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              yAxisID: 'y',
            },
            {
              label: 'Average Heart Rate (bpm)',
              data: data.map(entry => entry.average_heart_rate),
              borderColor: 'rgb(54, 162, 235)',
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              yAxisID: 'y1',
            },
          ],
        });
      } catch (error) {
        console.error('Failed to fetch running metrics:', error);
      }
    };

    fetchData();
  }, [userId]);

  if (!chartData) return <div>Loading...</div>;

  return (
    <div>
      <h2>Running Metrics Over Time</h2>
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
              text: 'Running Performance Trend',
            },
          },
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              title: {
                display: true,
                text: 'Distance (mi)'
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
                text: 'Heart Rate (bpm)'
              }
            },
          },
        }}
      />
    </div>
  );
};

export default RunningMetricsChart;