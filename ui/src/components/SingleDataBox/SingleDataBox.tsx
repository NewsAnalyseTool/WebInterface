import './SingleDataBox.css';

interface SingleDataBoxProps {
    dataName: string;
    dataValue: string;
    dataPostfix: string;
    girdArea: string;
}

export default function SingleDataBox({ dataName, dataValue, dataPostfix, girdArea }: SingleDataBoxProps) {
    return (
        <div className={`${'single-data-box'} ${girdArea}`}>
            <h3>{dataName}</h3>
            <p>{`${dataValue}${dataPostfix}`}</p>
        </div>
    )
}