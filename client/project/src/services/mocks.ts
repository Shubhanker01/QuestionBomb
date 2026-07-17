import { api } from './api'

export const showScienceMocks = async () => {
    try {
        const response = await api.get(`/mocks/science`)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const submitMock = async (mockId: string, userId: string, userAnswers: string) => {
    try {
        const response = await api.post(`/mocks/submit/${mockId}/${userId}`, {
            userAnswers: userAnswers
        })
        return response
    } catch (error) {
        console.log(error)
    }
}