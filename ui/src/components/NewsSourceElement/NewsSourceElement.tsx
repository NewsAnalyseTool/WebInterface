import { List, ListItem } from '@mui/material';
import { Source } from '../../App';
import SentimentChart from '../SentimentChart/SentimentChart';
import TopicPieChart from '../TopicPieChart/TopicPieChart';
import './NewsSourceElement.css';


// Helper classes
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
            <h4>{dataName}</h4>
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
            <h4>{dataName}</h4>
            <div className='double-data-inline-values'>
                <p>{`${data1Value}${data1Postfix}`}</p>
                <p>{`(${data2Value}${data2Postfix})`}</p>
            </div>

        </div>
    )
}

interface NewsSourceElementProps {
    source: Source;
}


// The news source element displays the general data for a source in one row
export default function NewsSourceElement({ source }: NewsSourceElementProps) {

    return (
        <div className="news-source-elem-container">
            <div className="source-name rounded-box">
                <TitleBox title={source.name} gridArea='source-name' />
            </div>

            <div className="categories  rounded-box">
                <h2>Categories</h2>
                <div className="category_list">
                    <List
                        sx={{
                            maxWidth: 400,
                            bgcolor: '',
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: 110,
                        }}
                    >
                        {source.categories.map((category, key) => (
                            <ListItem key={key}>
                                <div className="category_list_item" key={key}>
                                    <div className="category_color" style={{ backgroundColor: category.color }}></div>
                                    <p>{category.count}</p>
                                    {category.name.length <= 15 ?
                                        <p>{category.name}</p> :
                                        <p>{category.name.substring(0, 15) + "..."}</p>
                                    }

                                </div>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </div>

            <div className="categories-chart-div  rounded-box">
                <h2>Distribution</h2>
                <div className="categories-chart">
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
                    data2Value={parseFloat(source.posArticlesPerc.toFixed(2))}
                    data2Postfix='%'
                    girdArea='double-data-box' />
            </div>

            <div className="sentiment-neu rounded-box">
                <DoubleDataBox
                    dataName='Neutral Articles'
                    data1Value={source.neuArticles == undefined ? NaN : source.neuArticles}
                    data1Postfix=''
                    data2Value={source.neuArticlesPerc == undefined ? NaN : source.neuArticlesPerc}
                    data2Postfix='%'
                    girdArea='double-data-box' />
            </div>

            <div className="sentiment-neg  rounded-box">
                <DoubleDataBox
                    dataName='Negative Articles'
                    data1Value={source.negArticles}
                    data1Postfix=''
                    data2Value={parseFloat(source.negArticlesPerc.toFixed(2))}
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
                    dataValue={parseFloat(source.articlePerc.toFixed(2))}
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
        </div>
    )
}