import { Doughnut } from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js';
Chart.register(ArcElement);

const SentimentChart = ({ topic }) => {
    const positiveCount = topic.positive;
    console.log("positive");
    console.log(positiveCount);
    const negativeCount = topic.negative;
    const topic_title = topic.topic;

    const data = {
        labels: ["Positive", "Negative"],
        datasets: [
            {
                data: [positiveCount, negativeCount],
                backgroundColor: ["#28a745", "#dc3545"],
            },
        ],
    };

    const options = {
        cutout: "60%", // Cutout percentage to create the half-donut effect
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
            <h2 className="dark-heading">{topic_title}</h2>
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default SentimentChart;
