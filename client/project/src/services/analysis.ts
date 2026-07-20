import { api } from './api'

export const getAIAnalysis = async (
    {
        subject,
        totalScore,
        maxMarks,
        accuracy,
        section,
        subsection
    }: any, mockId: any
) => {
    try {
        const res = await api.post(`/ai-analysis/${mockId}`, {
            subject: subject,
            totalScore: totalScore,
            maxMarks: maxMarks,
            accuracy: accuracy,
            section: section,
            subsection: subsection
        })
        return res
    } catch (error) {
        console.log(error)
    }
}