import { useEffect, useState } from 'react';
import './SelectionRow.css'
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

interface SelectionRowProps {
    onTimeChanged: (startDate: string, endDate: string) => void
    onDataSelectionChanged: (newComp: string) => void
    totalArticles: number
    totalCategories: number
}

export default function SelectionRow({ onTimeChanged, onDataSelectionChanged, totalArticles, totalCategories }: SelectionRowProps) {
    const [startDate, setStartDate] = useState<string>("2023-01-01");
    const [endDate, setEndDate] = useState<string>("2023-12-31");

    // Their must be a initial request with the default date values.
    useEffect(() => {
        onTimeChanged(startDate, endDate)
    }, []);

    const [alignment, setAlignment] = useState<string>('global');

    const handleChange = (
        _: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
        onDataSelectionChanged(newAlignment);
    };

    return (
        <div className='selection-container'>
            <div className='select-time-container'>
                <h2>Visualizing data from</h2>
                <form>
                    <input type='date' value={startDate} onChange={e => {
                        setStartDate(e.target.value);
                    }}></input>
                </form>
                <h2>-</h2>
                <form>
                    <input type='date' value={endDate} onChange={e => {
                        setEndDate(e.target.value)
                    }}></input>
                </form>
                <h3>Total Articles: {totalArticles}</h3>
                <h3>Total Categories: {totalCategories}</h3>

                <button onClick={() => {
                // When the update button was clicked, the new dates are send back to the app component,
                // where the requests are send to the backend
                onTimeChanged(startDate, endDate);
            }}>↺</button>
            </div>

            

            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
            >
                <ToggleButton value="global" style={{ textTransform: 'none' }} sx={{ width: 140, height: 75, textAlign: 'center' }}><Typography variant='h6'>Global Data</Typography></ToggleButton>
                <ToggleButton value="trend" style={{ textTransform: 'none' }} sx={{ width: 140, height: 75 }}><Typography variant='h6'>Trend Data</Typography></ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
}
