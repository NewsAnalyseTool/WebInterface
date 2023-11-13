import { useState, useEffect } from "react";
import "./App.css";
import PieChartComponent from "./components/TopicPieChart/TopicPieChart"; // Assuming you have a PieChartComponent
import DonutChartComponent from "./components/SentimentChart/SentimentChart";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
    const [redditData, setRedditData] = useState(null);
    const [nytData, setNytData] = useState(null);
    const [tsData, setTsData] = useState(null);

    useEffect(() => {
        // Fetch Reddit data from the Flask backend
        fetch("http://127.0.0.1:5001/api/reddit")
            .then((response) => response.json())
            .then((data) => setRedditData(data))
            .catch((error) => console.error(error));

    // Fetch NYT data from the Flask backend
    fetch("http://127.0.0.1:5001/api/nyt")
        .then((response) => response.json())
        .then((data) => setNytData(data))
        .catch((error) => console.error(error));

    fetch("http://127.0.0.1:5001/api/ts")
        .then((response) => response.json())
        .then((data) => setTsData(data))
        .catch((error) => console.error(error));
    }, []); // Empty dependency array ensures the effect runs once after initial render

    return (
        <div className="App">
            <Header />

            <div className="charts-container">
                {redditData && <PieChartComponent data={redditData} title="Reddit" />}
                {nytData && <PieChartComponent data={nytData} title="New York Times" />}
                {tsData && <PieChartComponent data={tsData} title="Tagesschau" />}
            </div>

            <h2 className="dark-heading" id="sentiment-heading">Reddit</h2>

            <div className="sentiment-container">
            {redditData && redditData.map((topic, index) => (
                <DonutChartComponent key={index} topic={topic} />))}
            </div>

            <h2 className="dark-heading" id="sentiment-heading">New York Times</h2>

            <div className="sentiment-container">
                {nytData && nytData.map((topic, index) => (
                    <DonutChartComponent key={index} topic={topic} />))}
            </div>

            <h2 className="dark-heading" id="sentiment-heading">Tagesschau</h2>

            <div className="sentiment-container">
                {tsData && tsData.map((topic, index) => (
                    <DonutChartComponent key={index} topic={topic} />))}
            </div>

            <Footer />
        </div>
    );
}

export default App;