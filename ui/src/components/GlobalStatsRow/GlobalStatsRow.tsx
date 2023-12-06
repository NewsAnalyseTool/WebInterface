import { SingleDataBox } from "../NewsSourceElement/NewsSourceElement";
import './GlobalStatsRow.css';

interface GlobalStatsRowProps {
    numTopics: number;
    numArticles: number;
}

export default function GlobalStatsRow({ numTopics, numArticles }: GlobalStatsRowProps) {
    return (
        <div className="container">
            <div className="numm-articles">
                <SingleDataBox
                    dataName="Articles"
                    dataValue={numArticles}
                    dataPostfix=""
                    girdArea="center"
                />
            </div>
            <div className="numm-topics">
                <SingleDataBox
                    dataName="Topics"
                    dataValue={numTopics}
                    dataPostfix=""
                    girdArea="center"
                />
            </div>
            <div className="lastt-updated">
                <SingleDataBox
                    dataName="Last Updated"
                    dataValue={12}
                    dataPostfix=""
                    girdArea="center"
                />
            </div>
        </div>
    )
}