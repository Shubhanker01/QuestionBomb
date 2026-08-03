import { submitMock } from "@/services/mocks"
import type { JSONResultResponseType } from "@/types/mock"
import { toast } from "react-toastify"

export const handleSubmit = async (userId: any, mockId: any, selectedAnswers: any) => {
    try {
        const res = await submitMock(mockId as string, userId as string, JSON.stringify(selectedAnswers))
        const json: JSONResultResponseType = await res?.data
        if (json) {
            sessionStorage.removeItem('mock_progress')
            sessionStorage.removeItem('questions')
            return json
        }
        else {
            toast.error("Error occured while calculating score!!!")
            return null
        }
    } catch (error) {
        console.log(error)
        return null
    }
}