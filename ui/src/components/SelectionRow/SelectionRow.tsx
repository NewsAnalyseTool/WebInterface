import { useEffect, useState } from 'react';
import './SelectionRow.css'

interface SelectionRowProps {
    onTimeChanged: (startDate: string, endDate: string) => void
}

export default function SelectionRow({ onTimeChanged }: SelectionRowProps){
    console.log("SelectionRow: Start of function")
    
    const [startDate, setStartDate] = useState<string>("2023-01-01");
    const [endDate, setEndDate] = useState<string>("2023-12-31");

    // Their must be a initial request with the default date values.
    useEffect(() => {
        onTimeChanged(startDate, endDate)
    }, []);

    return (
        <div className='a'>
            <h2>Visualizing data from</h2>
            <form>
                <input type='date' value={startDate} onChange={e => {
                    setStartDate(e.target.value);
                    console.log("SelectionRow: New start date");
                    console.log(startDate);
                }}></input>
            </form>
            <h2>-</h2>
            <form>
                <input type='date' value={endDate} onChange={e => {
                    setEndDate(e.target.value)
                    console.log("SelectionRow: New end date");
                    console.log(endDate);
                }}></input>
            </form>

            <button onClick={() => {
                console.log("SelectionRow: Update button clicked")
                // When the update button was clicked, the new dates are send back to the app component,
                // where the requests are send to the backend
                onTimeChanged(startDate, endDate);
            }}>↺</button>
        </div>
    );
}
