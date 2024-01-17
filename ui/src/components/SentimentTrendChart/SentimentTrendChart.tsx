import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TrendData } from "../../App";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
);

export default function SentimentTrendChart(trendData: TrendData) {
    // Extract data for the chart
    const labels = trendData.timeline.map(day => day.date);
    console.log(labels)
    const positiveValues = trendData.timeline.map(day => day.pos);
    console.log(positiveValues)
    const neutralValues = trendData.timeline.map(day => day.neu);
    console.log(neutralValues)
    const negativeValues = trendData.timeline.map(day => day.neg);
    console.log(negativeValues)

    const options = {
        responsive: true,
      };

    // Data for the pie chart

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Posiitve',
                data: positiveValues,
                borderColor: '#14AE5C',
                pointRadius: 0,
                borderWidth: 2,
            },
        ],
    };

    return (
        <Line options={options} data={data}/>
    );
}