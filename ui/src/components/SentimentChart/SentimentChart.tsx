import { Doughnut } from "react-chartjs-2";
import {Chart, ChartOptions, ArcElement} from 'chart.js';
Chart.register(ArcElement);

interface SentimentChartProps {
    positives: number;
    neutrals: number;
    negatives: number;
}

export default function SentimentChart({ positives, neutrals ,negatives }: SentimentChartProps) {
    
    const data = {
        labels: ["Positive", "Neutral", "Negative"],
        datasets: [
            {
                data: [positives, neutrals, negatives],
                backgroundColor: ["#14AE5C", "#FFCD29", "#F24B22"],
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