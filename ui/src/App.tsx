import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SelectionRow from "./components/SelectionRow/SelectionRow";
import NewsSourceElement from "./components/NewsSourceElement/NewsSourceElement";
import GlobalStatsRow from "./components/GlobalStatsRow/GlobalStatsRow";
import config from '../config.json';

export interface Category {
    name: string;           // the name of the category (see examples above)
    count: number;          // how many articles or posts belong to this category in the time period specified by the request
    pos: number;            // number of the articles with positive sentiment
    posPerc: number;        // percentage of positive articles out of all articles from this source in this category
    neu: number;            // number of the articles with neutral sentiment
    neuPerc: number;        // percentage of neutral articles out of all articles from this source in this category
    neg: number;            // number of articles with negative sentiment
    negPerc: number;        // percentage of negative articles out of all articles from this source in this category
}
export interface Source {
    name: string;               // name of the source (e.g. "New York Times")
    articleCount: number;       // number of articles from this source
    articlePerc: number;        // percentage of articles from this source out of all sources
    categoryCount: number;      // number of categories from this source
    posArticles: number;        // number of positive articles from this source
    posArticlesPerc: number;    // percentage of positive articles from this source
    neuArticles: number;        // number of neutral articles from this source
    neuArticlesPerc: number;    // percentage of neutral articles from this source
    negArticles: number;        // number of negative articles from this source
    negArticlesPerc: number;    // percentage of negative articles from this source
    categories: Category[]      // list of labels for articles or groups to which articles belong (e.g. "Politics", "Economy"); perhaps more detailed or specific to the source (e.g. "World War II" (detailed), "r/news" (specific to Reddit))
}

export interface NewsData {
    totalArticles: number;          // number of articles from all sources
    totalCategories: number;        // number of categories from all sources
    sources: Source[];              // list of news sources
}

export interface TrendData {
    timeline: {
        date: string;
        pos: number;
        neu: number;
        neg: number;
    }[];
}

export default function App() {
    let startDate: string = '2023-01-01';
    let endDate: string = '2023-12-31';
    const [newsData, setNewsData] = useState<NewsData>({ totalArticles: 0, totalCategories: 0, sources: [] });
    const [trendData, setTrendData] = useState<TrendData>({ timeline: [] });

    
    function onTimeSpanUpdate(newStartDate: string, newEndDate: string) {
        console.log("App: Got new time span")
        startDate = newStartDate;
        endDate = newEndDate;

	requestGeneralData();
    }

    function requestGeneralData() {
        console.log("App: Requesting the backend for general data with the url:")
        const url: string = `http://${config.apiIP}:${config.apiPort}/api/data?startDate=${startDate}&endDate=${endDate}`;
        console.log(url)
        fetch(url)
            .then((response) => response.json())
            .then((data) => setNewsData(data))
            .catch((error) => console.error(error));

        console.log("App: Fetched general data:")
        console.log(newsData)
    }


    useEffect(() => {
        requestGeneralData(); 
        console.log("App: UseEffect triggered. Requesting the backend for trend data with the url:")
        const url: string = `http://${config.apiIP}:${config.apiPort}/api/trend?startDate=${startDate}&endDate=${endDate}&source=${"reddit"}`;
        console.log(url)
        fetch(url)
            .then((response) => response.json())
            .then((data) => setTrendData(data))
            .catch((error) => console.error(error));

        console.log("App: Fetched trend data:")
        console.log(trendData);
    }, []);

    return (
        <div className="App">
            <Header />
            <div>
                <div>
                    <SelectionRow onUpdate={onTimeSpanUpdate}/>
                </div>
            
                <div>
                    <GlobalStatsRow numArticles={newsData.totalArticles} numTopics={newsData.totalCategories}/>
                </div>

                <div className="news-sources">
                    {newsData.sources.map((source, key) => (
                        <NewsSourceElement key={key} source={source} trendData={trendData} /> ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}
