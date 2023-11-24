import { Doughnut } from "react-chartjs-2";
import {Chart, ChartOptions, ArcElement} from 'chart.js';
Chart.register(ArcElement);

interface SentimentChartProps {
    positives: number;
    negatives: number;
}

export default function SentimentChart({ positives, negatives }: SentimentChartProps) {
    
    const data = {
        labels: ["Positive", "Negative"],
        datasets: [
            {
                data: [positives, negatives],
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
        <Doughnut data={data} options={options} />
    );
}