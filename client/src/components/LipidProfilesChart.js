import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { lipidProfiles } from '../services/api';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LipidProfilesChart = ({ userId }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await lipidProfiles.getAll(userId);
        const data = response.data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        setChartData({
          labels: data.map(entry => new Date(entry.timestamp).toLocaleDateString()),
          datasets: [
            {
              label: 'Total Cholesterol',
              data: data.map(entry => entry.total_cholesterol),
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: 'LDL',
              data: data.map(entry => entry.ldl),
              borderColor: 'rgb(54, 162, 235)',
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
            },
            {
              label: 'HDL',
              data: data.map(entry => entry.hdl),
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
            {
              label: 'Triglycerides',
              data: data.map(entry => entry.triglycerides),
              borderColor: 'rgb(153, 102, 255)',
              backgroundColor: 'rgba(153, 102, 255, 0.5)',
            },
          ],
        });
      } catch (error) {
        console.error('Failed to fetch lipid profiles:', error);
      }
    };

    fetchData();
  }, [userId]);

  if (!chartData) return <div>Loading...</div>;

  return (
    <div>
      <h2>Lipid Profiles Over Time</h2>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Lipid Profiles Trend',
            },
          },
        }}
      />
    </div>
  );
};

export default LipidProfilesChart;