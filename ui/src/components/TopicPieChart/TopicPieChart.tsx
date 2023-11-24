import { Pie } from "react-chartjs-2";
import {Chart, ChartOptions, ArcElement} from 'chart.js'
import { Source } from "../../App";
Chart.register(ArcElement);

export default function TopicPieChart(source: Source) {
    // Extract data for the chart
    const labels = source.categories.map(category => category.name);
    const values = source.categories.map(category => category.count);

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
        <Pie data={chartData} options={options}/>
    );
}