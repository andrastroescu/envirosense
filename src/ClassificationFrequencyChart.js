import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';

const ClassificationFrequencyChart = ({ userId }) => {
    const [classificationData, setClassificationData] = useState([]);
    const chartRef = useRef(null); // Reference to the chart instance

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:7000/crud/classification-frequency/${userId}`);
                const data = await response.json();
                setClassificationData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [userId]);

    useEffect(() => {
        if (classificationData.length > 0) {
            if (chartRef.current) {
                chartRef.current.destroy(); // Destroy existing chart instance
            }

            // Process classificationData and create the line chart
            const labels = [];
            const counts = [];

            classificationData.forEach(entry => {
                if (entry.year && entry.month) {
                    labels.push(`${entry.year}-${entry.month}`);
                    counts.push(entry.classificationCount);
                }
            });

            const ctx = document.getElementById('classificationFrequencyChart');
            chartRef.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Classification Frequency',
                        data: counts,
                        fill: true,
                        borderColor: 'green',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: false,
                                text: 'Classification Frequency'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Time Period'
                            }
                        }
                    }
                }
            });
        }
    }, [classificationData]);

    return (
        <div>
            <h4 style={{textAlign: 'center', margin: '20px'}}> Your recycling history </h4>
            <canvas id="classificationFrequencyChart" width="400" height="200"></canvas>
        </div>
    );
};

export default ClassificationFrequencyChart;
