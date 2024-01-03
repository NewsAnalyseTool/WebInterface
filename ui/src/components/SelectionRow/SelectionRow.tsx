import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { NewsData } from '../../App';
import './SelectionRow.css'
import config from '../../../config.json';

interface SelectionRowProps {
    onUpdate: Dispatch<SetStateAction<NewsData>>;
}

export default function SelectionRow({ onUpdate }: SelectionRowProps) {
    const [startDate, setStartDate] = useState<string>('2023-01-01');
    const [endDate, setEndDate] = useState<string>('2023-12-31');
    const [clicked, setClicked] = useState<boolean>(false);

    useEffect(() => {
        console.log("Fetched")
        fetch(`http://${config.apiIP}:${config.apiPort}/api/data?startDate=${startDate}&endDate=${endDate}`)
            .then((response) => response.json())
            .then((data) => onUpdate(data))
            .catch((error) => console.error(error));
    }, [startDate, endDate, clicked, onUpdate]);


    return (
        <div className='a'>
            <h2>Visualizing data from</h2>
            <form>
                <input type='date'></input>
            </form>
            <h2>-</h2>
            <form>
                <input type='date'></input>
            </form>

            <button onClick={() => clicked ? setClicked(false) : setClicked(true)}>↺</button>
        </div>
    );
}
