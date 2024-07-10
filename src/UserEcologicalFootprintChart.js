import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const UserEcologicalFootprintChart = ({ userId }) => {
  const [footprintData, setFootprintData] = useState({});
  const [comparativeData, setComparativeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userDataResponse, comparativeDataResponse] = await Promise.all([
          fetch(`https://orca-app-tue3f.ondigitalocean.app/crud/footprint/${userId}`),
          fetch(`https://orca-app-tue3f.ondigitalocean.app/crud/footprint/comparative`),
        ]);

        const [userData, comparativeData] = await Promise.all([
          userDataResponse.json(),
          comparativeDataResponse.json(),
        ]);

        setFootprintData(userData);
        setComparativeData(comparativeData);
        console.log("andraaa " + JSON.stringify(userData));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    let chartInstance = null;

    if (footprintData && Object.keys(footprintData).length > 0 && comparativeData.length > 0) {
      const ctx = document.getElementById('footprintChart').getContext('2d');

      if (chartInstance) {
        chartInstance.destroy();
      }

      const userLabels = ['Total Recognition Frequency', 'Ecological Footprint Score', 'Environmental Impact'];

      const userValues = [
        footprintData.total_recognition_frequency,
        footprintData.ecological_footprint_score,
        footprintData.environmental_impact
      ];

      console.log('User Values:', userValues);

      const averageValues = userLabels.map((_, index) => {
        const total = comparativeData.reduce((acc, data) => acc + [data.TotalRecognitionFrequency, data.EcologicalFootprintScore, data.EnvironmentalImpact][index], 0);
        return total / comparativeData.length;
      });

      console.log('Average Values:', averageValues);

      const datasets = [
        {
          label: `You`,
          data: userValues,
          backgroundColor: 'rgb(20, 108, 67)',
          borderColor: 'rgb(20, 108, 67)',
          borderWidth: 1,
          borderDash: [5, 5]
        },
        {
          label: 'Average',
          data: averageValues,
          backgroundColor: '#D4E7C5',
          borderColor: '#D4E7C5',
          borderWidth: 1,
          borderDash: [5, 5]
        }
      ];

      chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: userLabels,
          datasets: datasets
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Value'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Category'
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.dataset.label || '';
                  const value = context.raw;
                  return `${label}: ${value}`;
                }
              }
            },
            legend: {
              position: 'top'
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [footprintData, comparativeData]);

  return (
    <div style={{padding: '20px', marginTop: '90px'}}>
      <h4 style={{ textAlign: 'center' }}>Compare your ecological footprint</h4>
      <p style={{ fontWeight: 'normal' }}>See how much you've recycled compared to your peers</p>
      <canvas id="footprintChart" width="375" height="250" ></canvas>
    </div>
  );
};

export default UserEcologicalFootprintChart;