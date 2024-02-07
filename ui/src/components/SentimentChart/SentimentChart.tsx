import { PieChart } from "@mui/x-charts";

interface SentimentChartProps {
    positives: number;
    neutrals: number;
    negatives: number;
}

// The sentiment chart, shows the absolute value of positive, negative and
// neutral articles in a half-donut chart.
export default function SentimentChart({ positives, neutrals, negatives }: SentimentChartProps) {

    const colors = ["#14AE5C", "#FFCD29", "#F24B22"]

    return (
        //<Doughnut data={data} options={options} />

        <PieChart
            colors={colors}
            series={[
                {
                    data: [
                        { value: positives, label: "positive" },
                        { value: neutrals, label: "neutral" },
                        { value: negatives, label: "negative" },
                    ],
                    innerRadius: 65,
                    startAngle: -90,
                    endAngle: 90,
                },
                
            ]}
            // we have a bit of css-like properties here to make it fit well
            // the screen
            slotProps={{
                legend: {
                  direction: 'row',
                  position: { vertical: 'middle', horizontal: 'middle' },
                  padding: 0,
                },
              }}
            margin={{
                bottom: 100,
                top: 0,
                left: 0,
                right: 0
            }}
            width={400}
            height={350}
        />
    );
}