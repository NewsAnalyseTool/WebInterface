import { Pie } from "react-chartjs-2";
import {Chart, ChartOptions, ArcElement} from 'chart.js'
import { NewsData } from "../../App";
Chart.register(ArcElement);

export default function TopicPieChart(news: NewsData) {
    // Extract data for the chart
    const labels = news.topics.map(topic => topic.name);
    const values = news.topics.map(topic => topic.count);

    const options: ChartOptions<'pie'> = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.label}: ${context.parsed.toFixed(2)}%`;
                    },
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
            <h2>{news.source}</h2>
            <Pie data={chartData} options={options}/>
        </div>
    );
}