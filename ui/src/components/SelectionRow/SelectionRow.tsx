import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { NewsData } from '../../App';
import Modal from 'react-modal';
import './SelectionRow.css'

interface TimestampSelectorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function TimestampSelectorModal({ isOpen, onClose }: TimestampSelectorModalProps) {
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Custom Range Selector"
        >
            <label>Start Time:</label>
            <input type="datetime-local" value={startTime?.toISOString()} onChange={(e) => setStartTime(new Date(e.target.value))} />

            <label>End Time:</label>
            <input type="datetime-local" value={endTime?.toISOString()} onChange={(e) => setEndTime(new Date(e.target.value))} />

            <button onClick={onClose}>Close</button>
        </Modal>
        
    )
}


interface SelectionRowProps {
    onUpdate: Dispatch<SetStateAction<NewsData>>;
}

export default function SelectionRow({ onUpdate }: SelectionRowProps) {
    const [timestamp, setTimestamp] = useState<string>('this_week');
    const [clicked, setClicked] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        console.log("Fetched")
        fetch("http://127.0.0.1:5001/api")
            .then((response) => response.json())
            .then((data) => onUpdate(data))
            .catch((error) => console.error(error));
    }, [timestamp, clicked, onUpdate]);

    function handleSelectedTimeChanged(value: string) {
        switch(value) {
            case 'custom':
                setIsModalOpen(true);
                break;
            default:
                setTimestamp(value);
                break;
        }
    }

    function closeModal() {
        setIsModalOpen(false);
    }


    return (
        <div className='selection-row-box'>
            <div className='selection-row-text-box'>
                <h2>Visualizing Data from</h2>

                <select value={timestamp} onChange={e => handleSelectedTimeChanged(e.target.value)}>
                    <option value={'today'}>Today</option>
                    <option value={'this_week'}>This Week</option>
                    <option value={'this_month'}>This Month</option>
                    <option value={'this_year'}>This Year</option>
                    <option value={'custom'}>Custom Range</option>
                </select>

                <TimestampSelectorModal isOpen={isModalOpen} onClose={closeModal} />
            </div>
            <button onClick={() => clicked ? setClicked(false) : setClicked(true)}>↺</button>
        </div>
    );
}