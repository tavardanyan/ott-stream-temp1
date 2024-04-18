export function Bills(props) {
    const { list } = props;
    return <><h1 className="title">Bill</h1><div className="G-bills">
        {list.map((item, index) => <div key={index} className="G-bill">
            <div className="bill_row">
                <span>Number: </span>
                <span>{item.number}</span>
            </div>
            <div className="bill_row">
                <span>Amount: </span>
                <span>{item.totalAmount}</span>
            </div>
            <div className="bill_row">
                <span>StartDate: </span>
                <span>{item.startDate}</span>
            </div>
            <div className="bill_row">
                <span>ExpireDate: </span>
                <span>{item.payloadCalculated?.locations[0]?.packages[0]?.expireNew}</span>
            </div>
            <div className="bill_row">
                <span>Duration: </span>
                <span>{item.payloadCalculated?.locations[0]?.month} {item.payloadCalculated?.locations[0]?.month ? 'month' : 'day'}</span>
            </div>
            <div className="bill_row">
                <span>Generated: </span>
                <span>{item.createdAt}</span>
            </div>
            <div className="bill_row">
                <span>Sent: </span>
                <span>{item.sent ? 'Sent' : 'Not sent'}</span>
            </div>
        </div>)}
    </div></>
    
}