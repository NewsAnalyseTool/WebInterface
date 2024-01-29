import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SelectionRow from "./components/SelectionRow/SelectionRow";
import config from '../config.json';
import NewsSourceElement from "./components/NewsSourceElement/NewsSourceElement";
import TrendDataElement from "./TrendSourceElement/TrendSourceElement";


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
    const [compToDisplay, setCompToDisplay] = useState<string>('global');

    // The general news data and the trend data is saved in a useState
    const [newsData, setNewsData] = useState<NewsData>({ totalArticles: 0, totalCategories: 0, sources: [] });
    const [trendData, setTrendData] = useState<TrendData[]>([]);

    let responseNewsData: NewsData = { totalArticles: 0, totalCategories: 0, sources: [] };
    let responseTrendData: TrendData[] = [];

    // ## Request Functions ##
    async function requestGeneralData(startDate: string, endDate: string) {
        const url: string = `http://${config.apiIP}:${config.apiPort}/api/data?startDate=${startDate}&endDate=${endDate}`;

        let receivedData: NewsData = { totalArticles: 0, totalCategories: 0, sources: [] };

        await fetch(url)
            .then((response) => response.json())
            .then((data) => receivedData = data)
            .catch((error) => console.error(error));

        receivedData.sources.map(source => {
            let sortedCategories: Category[] = source.categories.sort((a: Category, b: Category) => b.count - a.count);

            const numberDetailedCategories: number = 9
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
                }]

                source.categories = combinedCategories;
            };

            const colors: string[] = ["#ff595e","#ff924c","#ffca3a","#c5ca30","#8ac926","#52a675","#1982c4","#4267ac","#6a4c93","#b5a6c9"]

            source.categories.map((category, index) => {
                category.color = colors[index];
                if (category.name === "") {
                    category.name = "unknown"
                }
            });

            responseNewsData = receivedData;
        });


    }

    async function requestTrendData(startDate: string, endDate: string) {
        const url: string = `http://${config.apiIP}:${config.apiPort}/api/trend?startDate=${startDate}&endDate=${endDate}`;
        await fetch(url)
            .then((response) => response.json())
            .then((data) => responseTrendData = data)
            .catch((error) => console.error(error));
    }

    return (
        <div className="App">
            <Header />
            <div className="main-content">
                <div className="selection-row-div">
                    <SelectionRow
                        onTimeChanged={
                            async (startDate: string, endDate: string) => {
                                await requestGeneralData(startDate, endDate);
                                await requestTrendData(startDate, endDate);

                                setTrendData(responseTrendData);
                                setNewsData(responseNewsData);
                            }}
                        onDataSelectionChanged={
                            (newComp: string) => {
                                setCompToDisplay(newComp)
                            }
                        }
                        totalArticles={newsData.totalArticles}
                        totalCategories={newsData.totalCategories}
                    />
                </div>

                <div className="main-divider"></div>

                <div>
                    {(compToDisplay === 'global') ? (
                        <div>
                            {newsData.sources.map((source, index) => (
                                <NewsSourceElement key={index} source={source} />
                            ))
                            }
                        </div>
                    ) : (
                        <div>
                            {trendData.map((source, index) => (
                                <TrendDataElement key={index} trendData={source} />
                            ))
                            }
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
