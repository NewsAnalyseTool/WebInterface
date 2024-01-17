import { Pie } from "react-chartjs-2";
import {Chart, ChartOptions, ArcElement} from 'chart.js'
import { Source } from "../../App";
Chart.register(ArcElement);

export default function TopicPieChart(source: Source) {
    // Extract data for the chart
    const labels: string[] = source.categories.map(category => category.name);
    const colors: string[] = source.categories.map(category => category.color);
    const values: number[] = source.categories.map(category => category.count);

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
                backgroundColor: colors,
            },
        ],
    };

    return (
        <Pie data={chartData} options={options}/>
    );
}