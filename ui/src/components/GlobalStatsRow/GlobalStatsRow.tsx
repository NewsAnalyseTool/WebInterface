import './GlobalStatsRow.css';

interface GlobalStatsRowProps {
    numTopics: number;
    numArticles: number;
}

export default function GlobalStatsRow({ numTopics, numArticles }: GlobalStatsRowProps) {
    return (
        <div className="container">
            <div className="numm-articles">
                <p>Articles</p>
                <p>{numArticles}</p>
            </div>
            <div className="numm-topics">
                <p>Topics</p>
                <p>{numTopics}</p>
            </div>
            <div className="lastt-updated">
                <p>Last Updated</p>
                <p>13.12.2023</p>
            </div>
        </div>
    )
}
