import { api } from './api'

export const showScienceMocks = async () => {
    try {
        const response = await api.get(`/mocks/science`)
        return response
    } catch (error) {
        console.log(error)
    }
}