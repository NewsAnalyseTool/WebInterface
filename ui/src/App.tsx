import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SelectionRow from "./components/SelectionRow/SelectionRow";
import NewsSourceElement from "./components/NewsSourceElement/NewsSourceElement";
import GlobalStatsRow from "./components/GlobalStatsRow/GlobalStatsRow";

export interface Category {
    name: string;           // the name of the category (see examples above)
    count: number;          // how many articles or posts belong to this category in the time period specified by the request
    pos: number;            // number of the articles with positive sentiment
    posPerc: number;        // percentage of positive articles out of all articles from this source in this category
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
    negArticles: number;        // number of negative articles from this source
    negArticlesPerc: number;    // percentage of negative articles from this source
    categories: Category[]      // list of labels for articles or groups to which articles belong (e.g. "Politics", "Economy"); perhaps more detailed or specific to the source (e.g. "World War II" (detailed), "r/news" (specific to Reddit))
}

export interface NewsData {
    totalArticles: number;          // number of articles from all sources
    totalCategories: number;        // number of categories from all sources
    sources: Source[];              // list of news sources
}

export default function App() {
    const [newsData, setNewsData] = useState<NewsData>({ totalArticles: 0, totalCategories: 0, sources: [] });

    return (
        <div className="App">
            <Header />
            <div>
                <div>
                    <SelectionRow onUpdate={setNewsData}/>
                </div>
            
                <div>
                    <GlobalStatsRow numArticles={newsData.totalArticles} numTopics={newsData.totalCategories}/>
                </div>

                <div>
                    <div>
                        {newsData.sources.map(source => (
                            <NewsSourceElement {...source} /> ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
