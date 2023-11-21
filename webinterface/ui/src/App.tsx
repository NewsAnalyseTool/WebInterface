import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
//import TimestampSelector from "./components/TimestampSelectorComponent/TimestampSelectorComponent";
import TopicPieChart from "./components/TopicPieChart/TopicPieChart"; // Assuming you have a PieChartComponent
import SentimentChart from "./components/SentimentChart/SentimentChart";
import Footer from "./components/Footer/Footer";
import SelectionRow from "./components/SelectionRow/SelectionRow";

export interface Topic {
    name: string;
    count: number;
    positives: number;
    negatives: number;
}

export interface NewsData {
    source: string;
    topics: Topic[];
}

export default function App() {
    const [newsData, setNewsData] = useState<NewsData[]>([]);

    async function fetchData(timestamp: string) {
        // Fetch Reddit data from the Flask backend
        fetch("http://127.0.0.1:5001/api/" + timestamp)
            .then((response) => response.json())
            .then((data) => setNewsData(data))
            .catch((error) => console.error(error));
    }

    return (
        <div className="App">
            <Header />
            <SelectionRow onUpdate={fetchData}/>
            <div className="charts-container">
                {newsData.map(source => (
                    <TopicPieChart {...source} />
                ))}
            </div>
            
            {newsData.map(source => (
                <div>
                    <h2 className="dark-heading" id="sentiment-heading">Reddit</h2>

                    <div className="sentiment-container">
                        {source.topics.map((topic, index) => (
                            <SentimentChart key={index} topic={topic.name} numPositives={topic.positives} numNegatives={topic.negatives} />
                        ))}
                    </div>
                </div>
            ))}
            <Footer />
        </div>
    );
}