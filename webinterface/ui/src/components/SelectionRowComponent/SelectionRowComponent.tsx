import { useState, useEffect, useCallback } from 'react';

interface SelectionRowComponentProps {
    onUpdate: (timestamp: string) => void;
}

export default function SelectionRowComponent({ onUpdate }: SelectionRowComponentProps) {
    const [timestamp, setTimestamp] = useState<string>('this_week');

    const fetchData = useCallback((timestamp: string) => {
        onUpdate(timestamp);
    }, [onUpdate]);

    useEffect(() => {
        fetchData(timestamp);
    }, [timestamp, fetchData]);

    return (
        <div className='selection-row-box'>
            <button onClick={() => fetchData(timestamp)}>Update</button>

            <select value={timestamp} onChange={e => setTimestamp(e.target.value)}>
                <option value={'today'}>Today</option>
                <option value={'this_week'}>This Week</option>
                <option value={'this_month'}>This Month</option>
                <option value={'this_year'}>This Year</option>
                <option value={'custom'}>Custom Range</option>
            </select>
        </div>
    );
}