interface DoubleDataBoxProps {
    dataName: string;
    data1Value: number;
    data1Postfix: string;
    data2Value: number;
    data2Postfix: string;
    girdArea: string;
}

function DoubleDataBox({ dataName, data1Value, data1Postfix, data2Value, data2Postfix, girdArea }: DoubleDataBoxProps) {
    return (
        <div className={`${'double-data-box'} ${girdArea}`}>
            <h3>{dataName}</h3>
            <div className='double-data-inline-values'>
                <p>{`${data1Value}${data1Postfix}`}</p>
                <p>{`(${data2Value}${data2Postfix})`}</p>
            </div>
            
        </div>
    )
}