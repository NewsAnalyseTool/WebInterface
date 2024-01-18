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

    let labels: string[] = []
    let positiveValues: number[] = []
    let neutralValues: number[] = []
    let negativeValues: number[] = []

    if (trendData.datapoints != undefined) {
        labels = trendData.datapoints.map(day => day.date);
        positiveValues = trendData.datapoints.map(day => day.pos);
        neutralValues = trendData.datapoints.map(day => day.neut);
        negativeValues = trendData.datapoints.map(day => day.neg);
    }
    

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
            {
                label: 'Neutral',
                data: neutralValues,
                borderColor: '#FFCD29',
                pointRadius: 0,
                borderWidth: 2,
            },
            {
                label: 'Negative',
                data: negativeValues,
                borderColor: '#F24B22',
                pointRadius: 0,
                borderWidth: 2,
            },
        ],
    };

    return (
        <Line options={options} data={data}/>
    );
}