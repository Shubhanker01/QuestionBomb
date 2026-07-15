import { api } from "./api";

export const fetchQuestions = async (section: string, mockId: string) => {
    try {
        const response = await api.get(`/questions/${section}/${mockId}`)
        return response
    } catch (error) {
        console.log(error)
    }
}