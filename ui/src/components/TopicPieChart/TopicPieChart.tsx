import { Source } from "../../App";
import { PieChart } from "@mui/x-charts";

export default function TopicPieChart(source: Source) {
    // Extract data for the chart
    const colors: string[] = source.categories.map(category => category.color);

    const categories: {
        id: number,
        value: number,
        label: string,
    }[] = source.categories.map((category, index) => { return {label: category.name, value: category.count, id: index}})

    return (
        //<Pie data={chartData} options={options}/>
        <PieChart
            colors={colors}
            series={[
                {
                    data: categories,
                },
            ]}
            slotProps={{
                legend: { hidden: true },
            }}
            margin={{
                bottom: 0,
                top: 0,
                left: 0,
                right: 0
            }}
            width={500}
            height={200}
        />
    );
}