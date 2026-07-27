import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { reviewMock } from "@/services/mocks";
import { stats } from "@/utils/stats";
import type { QuestionReview, FilterType } from "@/types/mock";

export function useMockReview() {
    const { section, mockId } = useParams<{ section: string, mockId: string }>()
    const [questionReview, setQuestionReview] = useState<QuestionReview[]>([])
    const [selectedQIndex, setSelectedQIndex] = useState(0);
    const [filter, setFilter] = useState<FilterType>('all');

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    useEffect(() => {

        async function fetchQuestionWithAnswers() {
            if (!section || !mockId) return
            try {
                setIsLoading(true)
                setError(null)
                const res = await reviewMock(section as string, mockId as string)
                const json = await res?.data
                if (json?.questionWithUserAnswers) {
                    setQuestionReview(json.questionWithUserAnswers)
                }

            } catch (error) {
                console.log(error)
                setError("Failed to load question review!!!")
            }
            finally {
                setIsLoading(false)
            }

        }
        fetchQuestionWithAnswers()
    }, [])
    const getStatus = (q: QuestionReview) => {
        if (q.userAnswer === null) return 'unattempted';
        return q.correctAnswer === q.userAnswer ? 'correct' : 'incorrect';
    };
    const filteredQuestions = questionReview.filter((q: any) => {
        if (filter === 'all') return true;
        return getStatus(q) === filter;
    });
    const activeQuestion: QuestionReview = filteredQuestions[selectedQIndex] || filteredQuestions[0] || null;

    const stat = stats(questionReview)

    return {
        isLoading,
        error,
        filteredQuestions,
        activeQuestion,
        selectedQIndex,
        setSelectedQIndex,
        getStatus,
        stat,
        filter,
        setFilter
    }

}