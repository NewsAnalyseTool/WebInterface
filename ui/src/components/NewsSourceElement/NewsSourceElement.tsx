import { Source, TrendData } from '../../App';
import SentimentChart from '../SentimentChart/SentimentChart';
import SentimentTrendChart from '../SentimentTrendChart/SentimentTrendChart';
import TopicPieChart from '../TopicPieChart/TopicPieChart';
import './NewsSourceElement.css';

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


interface SingleDataBoxProps {
    dataName: string;
    dataValue: number;
    dataPostfix: string;
    girdArea: string;
}

function SingleDataBox({ dataName, dataValue, dataPostfix, girdArea }: SingleDataBoxProps) {
    return (
        <div className={`${'single-data-box'} ${girdArea}`}>
            <h3>{dataName}</h3>
            <p>{`${dataValue}${dataPostfix}`}</p>
        </div>
    )
}

interface DoubleDataBoxProps {
    dataName: string;
    data1Value: number;
    data1Postfix: string;
    data2Value: number;
    data2Postfix: string;
    girdArea: string;
}

function DoubleDataBox({ dataName, data1Value, data1Postfix, data2Value, data2Postfix, girdArea }: DoubleDataBoxProps) {
    return (
        <div className={`${'double-data-box'} ${girdArea}`}>
            <h3>{dataName}</h3>
            <div className='double-data-inline-values'>
                <p>{`${data1Value}${data1Postfix}`}</p>
                <p>{`(${data2Value}${data2Postfix})`}</p>
            </div>
            
        </div>
    )
}

interface NewsSourceElementProps {
    source: Source;
    trendData: TrendData;
}

export default function NewsSourceElement({ source, trendData }: NewsSourceElementProps) {

    return (
        <div className="container">
            <div className="source-name rounded-box">
                <TitleBox title={source.name} gridArea='source-name' />
            </div>

            <div className="categories  rounded-box">
                <h2>Categories</h2>
                <div className="category_list">
                    {source.categories.map((category, key) => (
                        <div className="category_list_item">
                            <div className="category_color" style={{ backgroundColor: category.color }}></div>
                            <p>{category.count}</p>
                            <p>{category.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="categories-chart-div  rounded-box">
                <h2>Distribution</h2>
                <div className='categories-chart'>
                    <TopicPieChart {...source} />
                </div>
            </div>

            <div className="sentiment-chart-div  rounded-box">
                <h2>Sentiment</h2>
                <div className='sentiment-chart'>
                    <SentimentChart positives={source.posArticles} neutrals={source.neuArticles} negatives={source.negArticles} />
                </div>
            </div>

            <div className="sentiment-pos rounded-box">
                <DoubleDataBox
                    dataName='Positive Articles'
                    data1Value={source.posArticles}
                    data1Postfix=''
                    data2Value={source.posArticlesPerc}
                    data2Postfix='%'
                    girdArea='double-data-box' />
            </div>

            <div className="sentiment-neu rounded-box">
                <DoubleDataBox
                    dataName='Neutral Articles'
                    data1Value={source.neuArticles}
                    data1Postfix=''
                    data2Value={source.neuArticlesPerc}
                    data2Postfix='%'
                    girdArea='double-data-box' />
            </div>

            <div className="sentiment-neg  rounded-box">
                <DoubleDataBox
                        dataName='Negative Articles'
                        data1Value={source.negArticles}
                        data1Postfix=''
                        data2Value={source.negArticlesPerc}
                        data2Postfix='%'
                        girdArea='double-data-box' />
            </div>

            <div className="num-articles  rounded-box">
                <SingleDataBox
                    dataName="Articles"
                    dataValue={source.articleCount}
                    dataPostfix=''
                    girdArea='single-data-box' />
            </div>

            <div className="article-ratio  rounded-box">
                <SingleDataBox
                    dataName="Percentage"
                    dataValue={source.articlePerc}
                    dataPostfix='%'
                    girdArea='single-data-box' />
            </div>

            <div className="num-topics  rounded-box">
                <SingleDataBox
                    dataName="Topics"
                    dataValue={source.categoryCount}
                    dataPostfix=''
                    girdArea='single-data-box' />
            </div>

            <div className="sentiment-trend-div  rounded-box">
                <h2>Sentiment Trend</h2>
                <div className='sentiment-trend-chart'>
                    <SentimentTrendChart {...trendData}/>
                </div>
            </div>

        </div>
    )
}