import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { NewsData } from '../../App';
import './SelectionRow.css'

interface SelectionRowProps {
    onUpdate: Dispatch<SetStateAction<NewsData>>;
}

export default function SelectionRow({ onUpdate }: SelectionRowProps) {
    const [timestamp, setTimestamp] = useState<string>('this_week');
    const [clicked, setClicked] = useState<boolean>(false);

    useEffect(() => {
        console.log("Fetched")
        fetch("http://127.0.0.1:5001/api/" + timestamp)
            .then((response) => response.json())
            .then((data) => onUpdate(data))
            .catch((error) => console.error(error));
    }, [timestamp, clicked, onUpdate]);

    return (
        <div className='selection-row-box'>
            <div className='selection-row-text-box'>
                <h2>Visualizing Data from</h2>

                <select value={timestamp} onChange={e => setTimestamp(e.target.value)}>
                    <option value={'today'}>Today</option>
                    <option value={'this_week'}>This Week</option>
                    <option value={'this_month'}>This Month</option>
                    <option value={'this_year'}>This Year</option>
                    <option value={'custom'}>Custom Range</option>
                </select>
            </div>
            <button onClick={() => clicked ? setClicked(false) : setClicked(true)}>↺</button>
        </div>
    );
}