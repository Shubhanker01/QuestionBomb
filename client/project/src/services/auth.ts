import { api } from './api'

export const authenticateUser = async (token: string) => {
    try {
        const response = await api.post('/auth', { idToken: token })
        return response
    }
    catch (error) {
        console.log(error)
        throw error
    }
}

export const logout = async () => {
    try {
        const response = await api.post('/auth/logout')
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}