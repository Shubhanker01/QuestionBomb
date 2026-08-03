import { handleSubmit } from "@/handlers/handleMockSubmit"
import { useNavigate } from 'react-router-dom'

export function useHandleSubmit(mockId: string, userId: string, selectedAnswers: any) {
    const navigate = useNavigate()
    async function onSubmit() {
        const json = await handleSubmit(userId, mockId, selectedAnswers)
        if (json) {
            navigate(`/test-score/mock/${mockId}/user/${userId}`, {
                state: {
                    score: json.score,
                    noOfCorrectQuestion: json.noOfCorrectQuestion, noOfIncorrectQuestion: json.noOfIncorrectQuestion,
                    noOfUnattemptedQuestion: json.noOfUnattemptedQuestion,
                    rank: json.rank,
                    totalParticipants: json.totalParticipants,
                    percentile: json.percentile
                }
            })
        }
    }

    return { onSubmit }
}

