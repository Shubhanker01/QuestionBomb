import { useEffect, useState } from "react";
import { getAIAnalysis } from "@/services/analysis";
import type { AIAnalysisInput } from "@/types/aiAnalysis";

export const useAIAnalysis = ({
    userId,
    mockId,
    subject,
    totalScore,
    maxMarks,
    accuracy,
    section,
    subsection
}: AIAnalysisInput) => {
    const [analysisText, setAnalysisText] = useState("")
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function fetchAIAnalysis() {
            try {
                const res = await getAIAnalysis({ subject, totalScore, maxMarks, accuracy, section, subsection }, mockId, userId)
                const json = await res?.data
                if (json.success) {
                    setLoading(false)
                    setAnalysisText(json.analysis)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAIAnalysis()
    }, [])

    return { analysisText, setAnalysisText, loading }
}