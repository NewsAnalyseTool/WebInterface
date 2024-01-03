import './SelectionRow.css'

interface SelectionRowProps {
    onUpdate: (startDate: string, endDate: string) => void;
}

export default function SelectionRow({ onUpdate }: SelectionRowProps) {
    console.log("SelectionRow: Start of function")
    let startDate: string = '2024-01-01';
    let endDate: string = '2024-01-01';

    return (
        <div className='a'>
            <h2>Visualizing data from</h2>
            <form>
                <input type='date' value={startDate} onChange={e => {
                    startDate = e.target.value;
                    console.log("SelectionRow: New start date");
                    console.log(startDate);
                }}></input>
            </form>
            <h2>-</h2>
            <form>
                <input type='date' value={endDate} onChange={e => {
                    endDate = e.target.value
                    console.log("SelectionRow: New end date");
                    console.log(endDate);
                }}></input>
            </form>

            <button onClick={() => {
                console.log("SelectionRow: Update button clicked")
                onUpdate(startDate, endDate)
            }}>↺</button>
        </div>
    );
}
