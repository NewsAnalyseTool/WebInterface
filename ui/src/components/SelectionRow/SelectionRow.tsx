import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { NewsData } from '../../App';
import './SelectionRow.css'
import config from '../../../config.json';

interface SelectionRowProps {
    onUpdate: Dispatch<SetStateAction<NewsData>>;
}

export default function SelectionRow({ onUpdate }: SelectionRowProps) {
    const [timestamp, setTimestamp] = useState<string>('this_week');
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    const [clicked, setClicked] = useState<boolean>(false);

    useEffect(() => {
        console.log("Fetched")
        fetch(`http://${config.apiIP}:${config.apiPort}/api/v2/general?startDate${startDate}&endDate${endDate}`)
            .then((response) => response.json())
            .then((data) => onUpdate(data))
            .catch((error) => console.error(error));
    }, [timestamp, clicked, onUpdate]);

    function handleSelectedTimeChanged(value: string) {
        switch(value) {
            case 'today':
                let currentDate: String = new Date().toISOString().split('T')[0];
                setStartDate(currentDate);
                setEndDate(currentDate);
                break;
            case 'lastSevenDays':
                let currentDate: String = new Date().toISOString().split('T')[0];
                let sevenDaysAgoDate: String = (new Date().getDate() - 7).toISOString().split('T')[0];
                break;
            case 'thisMonth':
                let [year, month]: [string, string] = new Date.toISOString().split('-').splice(0, 2);
                setStartDate(`${year}-${month}-01`);
                setEndDate(`${year}-${month}-30`);
                break;
            case 'thisYear':
                let year: String = new Date().toISOString().split('-')[0];
                setStartDate(`${year}-01-01`);
                setEndDate(`${year}-12-31`);
                break;
            default:
                setTimestamp(value);
                break;
        }
    }

    return (
        <div className='selection-row-box'>
            <div className='selection-row-text-box'>
                <h2>Visualizing Data from</h2>

                <select value={timestamp} onChange={e => handleSelectedTimeChanged(e.target.value)}>
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
