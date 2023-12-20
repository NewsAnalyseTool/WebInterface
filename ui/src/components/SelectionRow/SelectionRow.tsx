import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { NewsData } from '../../App';
import './SelectionRow.css'
import config from '../../../config.json';

interface SelectionRowProps {
    onUpdate: Dispatch<SetStateAction<NewsData>>;
}

export default function SelectionRow({ onUpdate }: SelectionRowProps) {
    const [timestamp, setTimestamp] = useState<string>('this_week');
    const [clicked, setClicked] = useState<boolean>(false);

    useEffect(() => {
        console.log("Fetched")
        fetch(`http://${config.apiIP}:${config.apiPort}/api/data?startDate${"2023-01-01"}&endDate${"2023-12-31"}`)
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
                    <option value={'lastSevenDays'}>Last 7 Days</option>
                    <option value={'thisMonth'}>This Month</option>
                    <option value={'thisYear'}>This Year</option>
                </select>
            </div>
            <button onClick={() => clicked ? setClicked(false) : setClicked(true)}>↺</button>
        </div>
    );
}
