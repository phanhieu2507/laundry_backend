import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import ApexCharts from 'react-apexcharts';

function StoreStats() {
    const [earnings, setEarnings] = useState([]);

    useEffect(() => {
        axios.get('/dashboard/earning/weekly')
             .then(response => {
                 const formattedData = response.data.map(item => ({
                     x: new Date(item.date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }),
                     y: item.total
                 }));
                 setEarnings(formattedData);
             })
             .catch(error => {
                 console.error('There was an error fetching the earnings data!', error);
             });
    }, []);

    const chartOptions = {
        chart: {
            type: 'line',
            height: 350,
            toolbar: {
                show: false
            },
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
            }
        },
        colors: ['#77B6EA', '#545454'],
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'category',
            categories: earnings.map(data => data.x),
            tickPlacement: 'on'
        },
        yaxis: {
            labels: {
                formatter: (val) => `$${parseFloat(val).toFixed(2)}`
            }
        },
        tooltip: {
            y: {
                formatter: (val) => `$${parseFloat(val).toFixed(2)}`
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
        },
        markers: {
            size: 6,
            strokeWidth: 2,
            fillOpacity: 0,
            strokeOpacity: 0,
            hover: {
                size: 8
            }
        }
    };

    return (
        <div className="mt-5 shadow-lg border border-zinc-300 rounded-2xl p-4 pb-20">
            <h2 className="text-xl font-semibold text-center mb-3">Weekly Earnings</h2>
            <div className="">
                <ApexCharts options={chartOptions} series={[{ data: earnings }]} type="line" height={300} />
            </div>
        </div>
    );
}

export default StoreStats;
