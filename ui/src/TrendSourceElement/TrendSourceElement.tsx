import { TrendData } from "../App";
import SentimentTrendChart from "../components/SentimentTrendChart/SentimentTrendChart";
import './TrendSourceElement.css';

interface TrendSourceProps {
    trendData: TrendData
}

interface TitleBoxProps {
    title: string;
    gridArea: string;
}

function TitleBox({ title, gridArea }: TitleBoxProps) {
    return (
        <div className={`${'title-box'} ${gridArea}`}>
            <h1>{title}</h1>
        </div>
    )
}

export default function TrendDataElement({ trendData }: TrendSourceProps) {
    return (
        <div className="trend-data-elem-container">

            <div className="trend-source-name trend-rounded-box">
                <TitleBox title={trendData.source} gridArea='source-name' />
            </div>

            <div className="sentiment-trend-div  trend-rounded-box">
                <h2>Sentiment Trend</h2>
                <div>
                    <SentimentTrendChart {...trendData} />
                </div>
            </div>
        </div>

    )
}