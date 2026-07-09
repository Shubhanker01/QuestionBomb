import { api } from './api'

export const authenticateUser = async (token: string) => {
    try {
        const response = await api.post('/auth', { idToken: token })
        return response
    }
    catch (error) {
        console.log(error)
    }
}