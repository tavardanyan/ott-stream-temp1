import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { getClientStatus, getStatusesColor } from "../helpers/status";
import { mainConfig } from "../config";
import { Request } from "../request";

export function Dashboard() {
    const [client, setClient] = useState('')
    const [cliensList, setClientsList] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        client && client.length > 1 ? Request.get(`${mainConfig.backUrl}/v1/clients/globalSearch?search=${client}`).then(data => {
            console.log(data);
            setClientsList(data)
        }).catch(err => console.error(err)) : setClientsList([])
    },[client])

    return <div className="G-page P-dashboard">
        <div className="G-container">
            <div className="G-client-serach-wrap">
                <input 
                    type="text"
                    placeholder="Search..."
                    value={client}
                    onChange={(e) => setClient(e.target.value)} />
                    {cliensList.length ? <ul className="G-client-serach-result-wrap">
                    {cliensList.map((item, index) => <li key={index} onClick={() => navigate(`/client/${item.id}`)}>
                        <span>{`${item.personalInfo.firstname} ${item.personalInfo.lastname}`}</span>
                        <span className={`G-status ${getStatusesColor(item.subscriptionState)}`}>{getClientStatus(item.subscriptionState)}</span>
                    </li>)}           
                </ul> : ''}
            </div>
        </div>
    </div>
}