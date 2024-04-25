/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getClientStatus, getStatusesColor } from "../helpers/status"
import { Subscriptions } from "../components/subscriptions"
import { Bills } from "../components/bill"
import { Transactions } from "../components/transactions"
import { ClientInfo } from "../components/client.info"
import { mainConfig } from "../config"
// import { BillGenerator } from "../components/generate.bill"
import { Request } from "../request"

export function Clients() {
    const { id } = useParams()
    const [locations, setLocations] = useState([])
    const [location, setSelectedLocation] = useState(null)
    const [packages, setPackages] = useState([])
    const [activePackages, setActivePackages] = useState(null)
    const [billList, setBillList] = useState([])
    const [transactions, setTransactions] = useState([])
    const [info, setInfo] = useState(null)
    const [data, setData] = useState([])

    useEffect(() => {
        Request.get(`${mainConfig.backUrl}/v1/clients/edit/${id}`).then(result => setInfo(result))
        Request.get(`${mainConfig.backUrl}/v1/clients/locations/${id}`).then(res => {
            setLocations(res); 
            setSelectedLocation(res[0]);
            return new Promise(resolve => resolve(getLocationDetails(res[0])))
        })
        Request.post(`${mainConfig.backUrl}/v1/invoices/invoiceFilter`, {
            limit: 15,
            page: 1,
            sortBy: "_id:desc",
            client: id
        }).then(res => setBillList(res.results))
        Request.get(`${mainConfig.backUrl}/v1/transactions/client/${id}?page=1&limit=20&sortBy=executionDate:desc`)
        .then(res => setTransactions(res.results))
     }, [id])


    const getLocationDetails = async (loc) => {
        const data = await Request.post(`${mainConfig.backUrl}/v1/subscriptions/location/`, {
            locations:[{
                locationId:  loc.id,
                packageInfos:[],
            }],
                equipments:[],
                selectedLocation:  loc.id,
                client: loc.clientId?.id
            })
        const index = data.locations.findIndex(i => i.locationId === loc.id)
        setPackages(data.locations[index].packages)
        getSubscriptionList(loc)
    }

    const getSubscriptionList = (loc) => {
        return Request.get(`${mainConfig.backUrl}/v1/subscriptions?location=${loc.id}`).then(data => setActivePackages(data))
    }

    const selectLocation = (loc) => {
        setSelectedLocation(loc)
        setActivePackages(null)
        return new Promise(resolve => resolve(getLocationDetails(loc))).then(data => data)
    }

    const cb = (model) => {
        const key = Object.keys(model)[0]
        const list = data.filter(x => !x.hasOwnProperty(key))
        list.push(model)
        console.log(list, 'restricted');
        console.log(JSON.stringify(list), 'restricted string');
        setData(list)
    }    

    const save = () => {
        if (data && data.length) {
            Request.post(`${mainConfig.backUrl}/v1/webhook/inject`, {data})
            .then(res => alert(res.message))
        } else alert('No changes')
    }

    const updateData = () => {
        Request.post(`${mainConfig.backUrl}/v1/webhook/replace`, {})
        .then(res => alert('success'))
    }

    return <><div className="G-locations">
        <div className="G-save">
            <button onClick={save}>Save</button>
            <button onClick={updateData}>Update</button>
            {/* <BillGenerator /> */}
        </div>
        {info ? <ClientInfo client={info} callback={cb} /> : null}
        {locations.length && location ? locations.map((item, index) => <div 
            key={index}
            onClick={() => selectLocation(item)} 
            className={`G-location ${location?.id === item.id ? 'G-location-selected' : ''}`}>
            <span>{`${item.locationName} /${item.login}`}</span>
            <span className={`G-status ${getStatusesColor(item.subscriptionState)}`}>{getClientStatus(item.subscriptionState)}</span>
        </div>) : null}
        {packages && packages.length && activePackages ? <Subscriptions 
            list={packages} 
            location={location}
            callback={cb} 
            fetch={activePackages} /> : null}
        {billList.length ? <Bills list={billList} /> : null}
        {transactions.length ? <Transactions list={transactions} callback={cb} /> : null}
    </div>
    </>
}