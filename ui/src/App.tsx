import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SelectionRow from "./components/SelectionRow/SelectionRow";
import NewsSourceElement from "./components/NewsSourceElement/NewsSourceElement";
import config from '../config.json';


/*** ------- Type definitions ------- ***/

export interface Category {
    name: string;           // the name of the category (see examples above)
    count: number;          // how many articles or posts belong to this category in the time period specified by the request
    pos: number;            // number of the articles with positive sentiment
    posPerc: number;        // percentage of positive articles out of all articles from this source in this category
    neu: number;            // number of the articles with neutral sentiment
    neuPerc: number;        // percentage of neutral articles out of all articles from this source in this category
    neg: number;            // number of articles with negative sentiment
    negPerc: number;        // percentage of negative articles out of all articles from this source in this category
    color: string;          // the color later used in the charts to represent this category
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
    source: string;
    datapoints: {
        date: string;
        pos: number;
        neg: number;
        neut: number;
    }[];
}

/*** ------- Main Component ------- ***/

export default function App() {
    // ## Use States ##
    // The general news data and the trend data is saved in a useState
    const [newsData, setNewsData] = useState<NewsData>({ totalArticles: 0, totalCategories: 0, sources: [] });
    const [trendData, setTrendData] = useState<TrendData[]>([]);

    let responseNewsData: NewsData = { totalArticles: 0, totalCategories: 0, sources: [] };
    let responseTrendData: TrendData[] = [];

    // ## Request Functions ##
    async function requestGeneralData(startDate: string, endDate: string) {
        console.log("App: Requesting the backend for general data with the url:")
        const url: string = `http://${config.apiIP}:${config.apiPort}/api/data?startDate=${startDate}&endDate=${endDate}`;
        console.log(url)

        let receivedData: NewsData = { totalArticles: 0, totalCategories: 0, sources: [] };

        await fetch(url)
            .then((response) => response.json())
            .then((data) => receivedData = data)
            .catch((error) => console.error(error));

        console.log("App: Fetched general data:")
        console.log(newsData)

        receivedData.sources.map(source => {
            let sortedCategories: Category[] = source.categories.sort((a: Category, b: Category) => b.count - a.count);

            const numberDetailedCategories: number = 3
            if (sortedCategories.length > numberDetailedCategories) {
                let top5: Category[] = sortedCategories.slice(0, numberDetailedCategories);
                let rest: Category[] = sortedCategories.slice(numberDetailedCategories);

                let sumOfrest: number = rest.reduce((sum, category) => sum + category.count, 0);
                let pos: number = rest.reduce((sum, category) => sum + category.pos, 0);
                let posPerc: number = rest.reduce((sum, category) => sum + category.posPerc, 0);
                let neu: number = rest.reduce((sum, category) => sum + category.neu, 0);
                let neuPerc: number = rest.reduce((sum, category) => sum + category.neuPerc, 0);
                let neg: number = rest.reduce((sum, category) => sum + category.neg, 0);
                let negPerc: number = rest.reduce((sum, category) => sum + category.negPerc, 0);

                let combinedCategories: Category[] = [...top5, { 
                    name: "Others",
                    count: sumOfrest,
                    pos: pos,
                    posPerc: posPerc,
                    neu: neu,
                    neuPerc: neuPerc,
                    neg: neg,
                    negPerc: negPerc,
                    color: "red"
                } ]

                source.categories = combinedCategories;
            };

            const colors: string[] = ['#FF9086', '#86CCFF', '#78F1A0', '#D0A6FF']
            
            source.categories.map((category, index) => {
                category.color = colors[index];
            });

            responseNewsData = receivedData;
        });

        
    }

    async function requestTrendData(startDate: string, endDate: string) {
        console.log("App: UseEffect triggered. Requesting the backend for trend data with the url:")
        const url: string = `http://${config.apiIP}:${config.apiPort}/api/trend?startDate=${startDate}&endDate=${endDate}`;
        console.log(url)
        await fetch(url)
            .then((response) => response.json())
            .then((data) => responseTrendData = data)
            .catch((error) => console.error(error));

        console.log("App: Fetched trend data:")
        console.log(trendData);
    }

    return (
        <div className="App">
            <Header />
            <div>
                <div>
                    <SelectionRow onTimeChanged={
                        async (startDate: string, endDate: string) => {
                            await requestGeneralData(startDate, endDate);
                            console.log("I GOT SOMETHING REALLY IMPOTANT")
                            console.log(newsData)
                            await requestTrendData(startDate, endDate);

                            setTrendData(responseTrendData);
                            setNewsData(responseNewsData);
                            
                        }}/>
                </div>
            
                <div className="news-sources">
                    {newsData.sources.map((source, index) => (
                        <NewsSourceElement key={index} source={source} trendData={trendData[index]} />
                        ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}
