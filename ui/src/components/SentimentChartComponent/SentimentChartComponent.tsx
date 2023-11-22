import { Doughnut } from "react-chartjs-2";
import {Chart, ChartOptions, ArcElement} from 'chart.js';
Chart.register(ArcElement);

interface SentimentChartComponentProps {
    topic: string;
    numPositives: number;
    numNegatives: number;
}

export default function SentimentChart({ topic, numPositives, numNegatives }: SentimentChartComponentProps) {
    
    const data = {
        labels: ["Positive", "Negative"],
        datasets: [
            {
                data: [numPositives, numNegatives],
                backgroundColor: ["#28a745", "#dc3545"],
            },
        ],
    };

    const options: ChartOptions<'doughnut'> = {
        cutout: "60%",
        rotation: -90,
        circumference: 180,
        plugins: {
            legend: {
                display: true,
                position: "bottom",
            },
        },
    };

    return (
        <div className="donut-chart">
            <h2 className="dark-heading">{topic}</h2>
            <Doughnut data={data} options={options} />
        </div>
    );
}