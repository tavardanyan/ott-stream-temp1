import { useState } from "react";
import { Checkbox } from "./checkbox";
import { DatePickerComponent } from "./datepicker";

export function Subscriptions(params) {
    const { list, fetch, location, callback } = params;
    const [subscription, setSubscriptionData] = useState([])

    const getPackageStatus = (packageId) => {
        let index = fetch.active.findIndex(x => x.package.id === packageId)
        if (index > -1) return 'active'
        else {
            index = fetch.inactive.findIndex(x => x.package.id === packageId)
            if (index > -1) return 'canceled'
        }
        return 'inactive'
    }

    const getSubscriptionByPackage = (packageId) => {
        let index = fetch.active.findIndex(x => x.package.id === packageId)
        if (index > -1) return fetch.active[index].subscription
        else {
            index = fetch.inactive.findIndex(x => x.package.id === packageId)
            if (index > -1) return fetch.inactive[index].subscription
        }
        return null
    }
    
    const cb = (id, key, value) => {
        
        const type = ['subscriptionCancelDate',
            'subscriptionExpireDate',
            'subscriptionPendingDate',
            'subscriptionActivationDate'].includes(key) ? 'location' : 'subscription'

        let dataList = subscription.filter(z => !(z[type] === id && z.key === key))

        dataList.push({
                [type]: id,
                key,
                value
            })
        setSubscriptionData(dataList)
        callback({ subscription: dataList })
        
    }

    // console.log(list, 'listtttttt');

    return <div className="G-subscriptions">
            <div className="G-subscription G-subscription-col">
                <div className="G-checkbox"></div>
                <div className="subscription_name col">Name</div>
                <div className="subscription_expire_date col">Status</div>
                <div className="col">StartDate</div>
                <div className="col">ExpireDate</div>
                <div className="col">Subs.Cancel</div>
                <div className="col">Subs.Expire</div>
                <div className="col">Subs.Pending</div>
                <div className="col">Subs.Activation</div>
            </div>
        {fetch && list.map((item, index) => <div key={index} className="G-subscription">
            <Checkbox 
                id={item.packageId}
                isBlock={true}
                checked={getPackageStatus(item.packageId) === 'active'}
                disabled={getPackageStatus(item.packageId) === 'canceled'} />
            <div className="subscription_name col">{ item.packageName[0].name }</div>
            <div className="subscription_expire_date col">
                {item.expireDate ? 
                <Checkbox 
                    id={getSubscriptionByPackage(item.packageId)}
                    checked={!(item.canceled || item.expired || item.disabled)}
                    cb={(id, state) => cb(id,'isActive', {
                        oldState: !(item.canceled || item.expired || item.disabled),
                        currnetState: state
                    })} /> : null}
            </div>
            <div className="subscription_expire_date col">
                {item.startDate ? 
                <DatePickerComponent 
                    date={item.startDate} 
                    cb={(date) => cb(getSubscriptionByPackage(item.packageId), 'startDate', {
                        from: item.startDate, to: date
                    })} /> : null}
            </div>
            <div className="col">
                {item.expireDate ? 
                <DatePickerComponent 
                    date={item.expireDate} 
                    cb={(date) => cb(getSubscriptionByPackage(item.packageId), 'expireDate', {
                        from: item.expireDate, to: date
                    })} /> : null}
            </div>
            <div className="col">
                {item.expireDate && location.subscriptionCancelDate  ? 
                <DatePickerComponent 
                    date={location.subscriptionCancelDate} 
                    cb={(date) => cb(location.id, 'subscriptionCancelDate', {
                        from: location.subscriptionCancelDate, to: date
                    })} /> : null}
            </div>
            <div className="col">
                {item.expireDate && location.subscriptionExpireDate ? 
                <DatePickerComponent 
                    date={location.subscriptionExpireDate} 
                    cb={(date) => cb(location.id, 'subscriptionExpireDate', {
                        from: location.subscriptionExpireDate, to: date
                    })} /> : null}
            </div>
            <div className="col">
                {item.expireDate && location.subscriptionPendingDate ? 
                <DatePickerComponent 
                    date={location.subscriptionPendingDate} 
                    cb={(date) => cb(location.id, 'subscriptionPendingDate', {
                        from: location.subscriptionPendingDate, to: date
                    })} /> : null}
            </div>
                <div className="col">
                {item.expireDate && location.subscriptionActivationDate ? 
                <DatePickerComponent 
                    date={location.subscriptionActivationDate} 
                    cb={(date) => cb(location.id, 'subscriptionActivationDate', {
                        from: location.subscriptionActivationDate, to: date
                    })} /> : null}
            </div>
        </div>)}
    </div>
}