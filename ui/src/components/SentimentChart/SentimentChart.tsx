import { Doughnut } from "react-chartjs-2";
import {Chart, ChartOptions, ArcElement} from 'chart.js';
import { Category } from '../../App';
Chart.register(ArcElement);

export default function SentimentChart(category: Category) {
    
    const data = {
        labels: ["Positive", "Negative"],
        datasets: [
            {
                data: [category.pos, category.neg],
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
            <h2 className="dark-heading">{category.name}</h2>
            <Doughnut data={data} options={options} />
        </div>
    );
}