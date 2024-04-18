import { getClientStatus } from "../helpers/status";
import { DatePickerComponent } from "./datepicker";

export function ClientInfo(params) {
    const { client, callback } = params

    const cb = (from, to) => {
        return callback({
            client: { 
                locationExpireDate: {
                    from, to, client: client.id, key: 'locationExpireDate'
                }
            }
        })
    }
    return <div className="G-client-infos">
        <div className="G-client-names">
            {`${client.personalInfo.firstname} ${client.personalInfo.lastname}`}
        </div>
        <span>Info:</span>
        <div className="G-client-info">
            <div className="G-client-active_packages">Client active packages: {client.info.activePackages}</div>
            <div className="G-client-locations_infos">
                {client.info.locations.map((item, index) => <div key={index} className="G-client-location">
                    <div>Location login: {item.login}</div>
                    <div>Location State: {getClientStatus(item.subscriptionState)}</div>
                    <div>Location ExpireDate: {item.subscriptionExpireDate ? <DatePickerComponent date={item.subscriptionExpireDate} cb={(date) => cb(item.subscriptionExpireDate, date)} /> : null}</div>
                </div>)}
            </div>
        </div>
    </div>
}