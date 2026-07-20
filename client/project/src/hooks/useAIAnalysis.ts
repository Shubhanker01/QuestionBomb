import { useEffect, useState } from "react";
import { getAIAnalysis } from "@/services/analysis";

export const useAIAnalysis = ({
    subject,
    totalScore,
    maxMarks,
    accuracy,
    section,
    subsection
}: any, mockId: any) => {
    const [analysisText, setAnalysisText] = useState("")
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function fetchAIAnalysis() {
            try {
                const res = await getAIAnalysis({ subject, totalScore, maxMarks, accuracy, section, subsection }, mockId)
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