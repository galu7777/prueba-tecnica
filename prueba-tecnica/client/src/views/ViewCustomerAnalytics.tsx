"use client"

import React from 'react';
import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js"
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
)

export function ViewCustomerAnalytics() {
  // Datos de ejemplo
    const data = {
        labels: ['2024-03-15', '2024-03-16', '2024-03-17', '2024-03-18', '2024-03-19'],
        datasets: [
        {
            label: 'Netherlands',
            data: [3, 5, 2, 7, 4],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
        },
        {
            label: 'Tokelau',
            data: [2, 4, 1, 6, 3],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
        },
        {
            label: 'Namibia',
            data: [1, 3, 6, 2, 5],
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
        },
        ],
    };

    return (
        <div>
        <h1>Customer Analytics</h1>
        <div>
            <h2>Customer Registrations Over Time</h2>
            <Line
                data={data}
            />
        </div>
        </div>
    );
}
