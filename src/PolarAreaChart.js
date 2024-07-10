import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { FaInfoCircle } from 'react-icons/fa';
import { Flex } from 'antd';

const PolarAreaChart = ({ userData }) => {
  const [selectedMetric, setSelectedMetric] = useState('Weight'); // Default to 'Weight'
  const chartRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [materialsData, setMaterialsData] = useState([]);

  useEffect(() => {
    // Fetch materials data from API
    const fetchMaterialsData = async () => {
      try {
        const response = await axios.get(`https://orca-app-tue3f.ondigitalocean.app/crud/materials/${userData.id}`);
        setMaterialsData(response.data);
      } catch (error) {
        console.error('Error fetching materials data:', error);
      }
    };

    fetchMaterialsData();
  }, [userData.id]);

  useEffect(() => {
      if (userData && materialsData.length > 0) {
        const data = materialsData.map(material => ({
          label: material,
          value: userData[`Total${material}${selectedMetric}`] || 0
        }));
  
      const labels = data.map(material => material.label);
      const values = data.map(material => material.value);

      const ctx = document.getElementById('polarAreaChart');

      if (ctx) {
        // Destroy existing chart if it exists
        if (chartRef.current) {
          chartRef.current.destroy();
        }

        chartRef.current = new Chart(ctx, {
          type: 'polarArea',
          data: {
            labels: labels,
            datasets: [{
              label: `Recycled Materials (${selectedMetric})`,
              data: values,
              backgroundColor: [
                '#12372A',
                '#99BC85',
                '#D9EDBF',
                '#638889',
                '#FBFADA'
                // Add more colors as needed
              ],
              borderColor: [
                '#12372A',
                '#99BC85',
                '#D9EDBF',
                '#638889',
                '#FBFADA'
                // Add more colors as needed
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              r: {
                grid: {
                  color: 'rgba(0, 0, 0, 0.1)'
                },
                angleLines: {
                  color: 'rgba(0, 0, 0, 0.1)'
                }
              }
            },
            plugins: {
              legend: {
                display: true,
                position: 'top' // You can change the position here
              }
            }
          }
        });
      }
    }
  }, [userData, selectedMetric]);

  const handleMetricChange = (event) => {
    setSelectedMetric(event.target.value);
  };

  const handleInfoIconHover = () => {
    setShowTooltip(true);
  };

  const handleInfoIconLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div>
      <h4 style={{ textAlign: 'center', margin: '20px' }}> Recycled materials </h4>
      <p style={{ textAlign: 'center', margin: '20px' }}> You've recycled a total of <b>{userData.TotalDistinctMaterials}</b> distinct materials </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <select className="form-select" style={{ textAlign: 'center', maxWidth: '50%' }} value={selectedMetric} onChange={handleMetricChange}>
          <option value="Weight">Weight</option>
          <option value="Cost">Cost</option>
          <option value="Footprint">Footprint</option>
          <option value="Volume">Volume</option>
        </select>
        <div style={{ position: 'relative', marginLeft: '1rem' }}>
          <FaInfoCircle onMouseEnter={handleInfoIconHover} onMouseLeave={handleInfoIconLeave} style={{ color: '#12372A', cursor: 'pointer' }} />
          {showTooltip && (
            <div style={{ position: 'absolute', top: '50%', right: 'calc(100% + 0.5rem)', transform: 'translateY(-50%)', backgroundColor: '#f9f9f9', border: '1px solid #ccc', padding: '0.5rem', borderRadius: '5px', boxShadow: '0 0 5px rgba(0,0,0,0.2)', zIndex: 1 }}>
              Select a metric to display the recycled materials
            </div>
          )}
        </div>
      </div>
      <canvas width="400" height="200" id="polarAreaChart" style={{marginTop: '3rem'}}/>
    </div>
  );
};

export default PolarAreaChart;
