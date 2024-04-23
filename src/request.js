import axios from "axios"

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${window.localStorage.getItem('token')}`
}

const logout = () => {
    window.localStorage.removeItem('token')
    window.location.hash = '/login'
}

export const Request = {
    get: async (url) => {
        try {
            const result = await axios.get(url, { headers }) 
            if (result.status === 401) return logout() 
            return result.data
        } catch (error) {
            console.log(error.message);
            return null
        }
    },

    post: async (url, body) => {
        try {
            const result = await axios.post(url, body, { headers }) 
            if (result.status === 401) return logout() 
            return result.data
        } catch (error) {
            console.log(error.message);
            return error.message
        }
    },

    put: async (url, body) => {
        try {
            const result = await axios.put(url, body, { headers }) 
            if (result.status === 401) return logout() 
            return result.data
        } catch (error) {
            console.log(error.message);
            return null
        }
    },

    delete: async (url, body) => {
        try {
            const result = await axios.delete(url, body, { headers }) 
            if (result.status === 401) return logout() 
            return result.data
        } catch (error) {
            console.log(error.message);
            return null
        }
    },
    
    patch: async (url, body) => {
        try {
            const result = await axios.patch(url, body, { headers }) 
            if (result.status === 401) return logout() 
            return result.data
        } catch (error) {
            console.log(error.message);
            return null
        }
    }
}