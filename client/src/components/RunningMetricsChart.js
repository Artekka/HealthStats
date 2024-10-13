// src/components/RunningMetricsChart.js

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import axios from 'axios';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend
);

const RunningMetricsChart = ({ userId, refreshTrigger }) => {
    const [chartData, setChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          setError(null);
          const response = await axios.get(`http://localhost:5000/api/running-metrics/${userId}`);
          const formattedData = formatChartData(response.data);
          setChartData(formattedData);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, [userId, refreshTrigger]);

  const formatChartData = (data) => {
    const labels = data.map(item => new Date(item.timestamp).toLocaleDateString());
    
    return {
      labels,
      datasets: [
        {
          label: 'Distance (miles)',
          data: data.map(item => kmToMiles(item.distance)),
          borderColor: 'rgb(75, 192, 192)',
          yAxisID: 'y-distance',
        },
        {
          label: 'Duration (minutes)',
          data: data.map(item => item.duration), // Duration is already in minutes
          borderColor: 'rgb(255, 99, 132)',
          yAxisID: 'y-duration',
        },
        {
          label: 'Average Heart Rate (bpm)',
          data: data.map(item => item.average_heart_rate),
          borderColor: 'rgb(54, 162, 235)',
          yAxisID: 'y-heart-rate',
        },
        {
          label: 'Average Pace (min/mile)',
          data: data.map(item => convertPaceToMinutesPerMile(item.average_pace)),
          borderColor: 'rgb(153, 102, 255)',
          yAxisID: 'y-pace',
        }
      ]
    };
  };

  const kmToMiles = (km) => km * 0.621371;

  const convertPaceToMinutesPerMile = (paceInSeconds) => {
    const paceInMinutesPerKm = paceInSeconds ;
    return paceInMinutesPerKm / 0.621371; // Convert km pace to mile pace
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!chartData) return <div>No data available</div>;

  const options = {
      responsive: true,
      maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Running Metrics Over Time',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              if (label.includes('Distance')) {
                label += context.parsed.y.toFixed(2) + ' miles';
              } else if (label.includes('Duration')) {
                const hours = Math.floor(context.parsed.y / 60);
                const minutes = context.parsed.y % 60;
                label += `${hours}h ${minutes}m`;
              } else if (label.includes('Heart Rate')) {
                label += context.parsed.y.toFixed(0) + ' bpm';
              } else if (label.includes('Pace')) {
                const minutes = Math.floor(context.parsed.y);
                const seconds = Math.round((context.parsed.y - minutes) * 60);
                label += `${minutes}:${seconds.toString().padStart(2, '0')} min/mile`;
              }
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Date'
        }
      },
      'y-distance': {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Distance (miles)'
        },
        ticks: {
          callback: function(value) {
            return value.toFixed(2) + ' mi';
          }
        }
      },
      'y-duration': {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Duration (minutes)'
        },
        ticks: {
          callback: function(value) {
            const hours = Math.floor(value / 60);
            const minutes = value % 60;
            return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
          }
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      'y-heart-rate': {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Heart Rate (bpm)'
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      'y-pace': {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Pace (min/mile)'
        },
        ticks: {
          callback: function(value) {
            const minutes = Math.floor(value);
            const seconds = Math.round((value - minutes) * 60);
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
          }
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="chart-wrapper">
      <h2>Running Metrics Over Time</h2>
      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default RunningMetricsChart;