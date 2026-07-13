import axios from 'axios'

export const api = axios.create({
    baseURL: import.meta.env.VITE_LOCAL || import.meta.env.VITE_SERVER,
    withCredentials: true
})