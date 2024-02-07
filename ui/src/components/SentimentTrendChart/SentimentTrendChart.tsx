import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
} from 'chart.js';
import { TrendData } from "../../App";
import { LineChart } from '@mui/x-charts';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
);

// The sentiment trend chart, is a graph, that shows the number of positive
// negative and neutral articles at the y-axis and the time at the x-axis.
export default function SentimentTrendChart(trendData: TrendData) {
    let labels: string[] = []
    let positiveValues: number[] = []
    let neutralValues: number[] = []
    let negativeValues: number[] = []

    // We 
    if (trendData.datapoints != undefined) {
        const aggregatedData: { [date: string]: {
            pos: number
            neu: number
            neg: number
        } } = {};

        // The backend sends back data with a much higher granularity of the time
        // then we want to display. The backend saves each datapoint with
        // millisecond accuracy. For us, it's enough to now how many articles
        // where posted on one day. So we sum up all datapoints, which are from
        // the same date.
        trendData.datapoints.forEach((datapoint) => {
            const { date } = datapoint;
            if (aggregatedData[date] != undefined) {
                aggregatedData[date].pos += datapoint.pos;
                aggregatedData[date].neu += datapoint.neut;
                aggregatedData[date].neg += datapoint.neg;
            } else {
                aggregatedData[date] = {
                    pos: datapoint.pos,
                    neu: datapoint.neut,
                    neg: datapoint.neg
                }
            }
        })

        const resultArray: { date: string; pos: number; neu: number, neg: number }[] = Object.keys(aggregatedData).map(
            (date) => ({
              date,
              pos: aggregatedData[date].pos,
              neu: aggregatedData[date].neu,
              neg: aggregatedData[date].neg,
            })
        );

        labels = resultArray.map((item) => item.date);
        positiveValues = resultArray.map((item) => item.pos);
        neutralValues = resultArray.map((item) => item.neu);
        negativeValues = resultArray.map((item) => item.neg);
    }

    return (
        //<Line options={options} data={data}/>

        (labels.length === 0) ? (
            <h3 style={{ marginTop: -50 }}>No Data</h3>
        ) : (
            <LineChart
            xAxis={[{ 
                scaleType: 'band',
                data: labels,
            }]}
            colors={["#14AE5C", "#FFCD29", "#F24B22"]}
            series={[
                {
                    curve: 'linear',
                    label: 'positive',
                    showMark: false,
                    data: positiveValues,
                },
                {
                    curve: 'linear',
                    label: 'neutral',
                    showMark: false,
                    data: neutralValues,
                },
                {
                    curve: 'linear',
                    label: 'negative',
                    showMark: false,
                    data: negativeValues,
                },
            ]}
            width={1400}
            height={250}
        />
        )        
    );
}0