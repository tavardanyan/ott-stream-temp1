import { useState } from "react";
import { getInvoiceDuration } from "../helpers/status";
import { DatePickerComponent } from "./datepicker";

export function Transactions (params) {
    const { list, callback } = params
    const [transactions, setTransactions] = useState([])

    const cb = (invoices, locationId, packageId, key, value) => {
        const dataKey = `${invoices}_${key}}`
        let dataList = transactions.filter(z => !z.hasOwnProperty(dataKey))

        dataList.push({
            [dataKey]: {
                key,
                invoice: invoices,
                locationId,
                packageId,
                value
            }
        })
        setTransactions(dataList)
        callback({ invoices: dataList })
        
    }

    return <div className="G-transactions">
        <h1>Transactions</h1>
        {list.map((item, index) => 
        <div key={index} className="G-flex">
        <div className="G-transaction">
            <div className="transaction_col">
                <span>Number: </span>
                <span>{item.number}</span>
            </div>
            <div className="transaction_col">
                <span>Type: </span>
                <span>{item.source_type}</span>
            </div>
            <div className="transaction_col">
                <span>Fee: </span>
                <span>{item.fee}</span>
            </div>
            <div className="transaction_col">
                <span>Amount: </span>
                <span>{item.amount}</span>
            </div>
            <div className="transaction_col">
                <span>Invoice: </span>
                <span>{item.invoice?.number}</span>
            </div>
        </div>
        <div className="G-transaction-packages">
            {item.invoice?.payloadCalculated.locations.map(location => location.packages.map((pack, packageIndex) => <div key={packageIndex} className="G-transaction-package">
                <div className="transaction_col transaction_package_col">
                    <span>Package: </span>
                    <span>{pack.packageName[0].name}</span>
                </div>
                <div className="transaction_col transaction_package_col">
                    <span>ExpireNew: </span>
                    <span>
                        {pack.expireNew ? 
                        <DatePickerComponent date={pack.expireNew} 
                            cb={(date) => cb(item.invoice.id, location.locationId, pack.packageId, 'expireNew', {
                                from: pack.expireNew, to: date
                            })} /> : null}
                    </span>
                </div>
                <div className="transaction_col transaction_package_col">
                    <span>ExpireDate: </span>
                    <span>
                        {pack.expireDate ? 
                        <DatePickerComponent date={pack.expireDate} 
                            cb={(date) => cb(item.invoice.id, location.locationId, pack.packageId, 'expireDate', {
                                from: pack.expireDate, to: date
                            })} /> : null}
                    </span>
                </div>
                <div className="transaction_col transaction_package_col">
                    <span>StartDate: </span>
                    <span>
                        {pack.startDate ? 
                        <DatePickerComponent date={pack.startDate} 
                            cb={(date) => cb(item.invoice.id, location.locationId, pack.packageId, 'startDate', {
                                from: pack.startDate, to: date
                            })} /> : null}
                    </span>
                </div>
                <div className="transaction_col transaction_package_col">
                    <span>SubscribeToDate: </span>
                    <span>{location?.subscribeToDate}</span>
                </div>
                <div className="transaction_col transaction_package_col">
                    <span>GlobalAction: </span>
                    <span>{location?.globalAction}</span>
                </div>
                <div className="transaction_col transaction_package_col">
                    <span>Duration: </span>
                    <span>
                        {getInvoiceDuration(location)}
                    </span>
                </div>
                <div className="transaction_col transaction_package_col">
                    <span>Type: </span>
                    <span>{item.invoice?.payloadCalculated.refund ? 'refund' : 'pay'}</span>
                </div>
                <div className="transaction_col transaction_package_col">
                    <span>Location: </span>
                    <span>{`${location.locationName}/${location.locationLogin}`}</span>
                </div>
                <div className="transaction_col transaction_package_col">
                    <span>Generated: </span>
                    <span>{item.createdAt}</span>
                </div>
            </div>
            ))}
        </div>
    </div>)}
    </div>
}