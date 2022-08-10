import axios from 'axios'


const interceptor = (config) => {
    if (!config.headers) return config

    const token = localStorage.getItem('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
}

export const api = axios.create({
    baseURL: 'http://localhost:3000',
    "Access-Control-Allow-Origin": "*",
})

api.interceptors.request.use(interceptor)