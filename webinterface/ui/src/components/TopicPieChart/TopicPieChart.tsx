import React from 'react'
import { Pie } from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js'
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(ArcElement);

interface TopicPieChartProps {
    
}

const TopicPieChart: React.FC<TopicPieChartProps> = ({ data, title }) => {
    // Extract data for the chart
    const labels = data.map(item => item.topic);
    const values = data.map(item => item.count);

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.label}: ${context.parsed.toFixed(2)}%`;
                    },
                },
            },
            datalabels: {
                anchor: "end",
                align: "start",
                offset: 30,
                color: "#fff", // Label text color
                font: {
                    size: 14, // Label font size
                },
                formatter: function(value, context) {
                    return context.chart.data.labels[context.dataIndex]; // Display labels from the data
                },
            },
        },
    };

    // Data for the pie chart
    const chartData = {
        labels: labels,
        datasets: [
            {
                data: values,
                backgroundColor: [
                    "#FF6384", // Red
                    "#36A2EB", // Blue
                    "#FFCE56", // Yellow
                    "#4BC0C0", // Green
                ],
            },
        ],
    };

    return (
        <div className="pie-chart">
            <h2>{title}</h2>
            <Pie data={chartData} options={options} plugins={[ChartDataLabels]}/>
        </div>
    );
};

export default TopicPieChart;