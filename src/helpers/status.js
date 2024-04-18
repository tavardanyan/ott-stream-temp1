export const getClientStatus = (state) => {
    const statuses = {
        0: 'inactive',
        1: 'pending',
        2: 'canceled',
        3: 'active'
    }
    return statuses[state]
}

export const getStatusesColor = state => {
    const statuses = {
        0: 'C-blue',
        1: 'C-yellow',
        2: 'C-grey',
        3: 'C-green'
    }
    return statuses[state]
}

export const getInvoiceDuration = location => {
    const duration = location.month || location.day || ''
    const name = location.month ? 'month' : location.day ? 'day' : '-'
    return `${duration} ${name}`
}