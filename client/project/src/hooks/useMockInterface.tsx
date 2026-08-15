import { useState, useEffect } from 'react'
import type { Question } from '@/types/question';
import { useMockContext } from '@/provider/mockProvider';
import { fetchQuestions } from '@/services/questions';

export function useMockInterface(subject: string, mockId: string) {
    const [testActive, setTestActive] = useState(true)
    const { mockInfo }: any = useMockContext()
    const [mock, setMock] = useState<Question[] | []>([])
    const [currentIdx, setCurrentIdx] = useState(0);
    const [timeLeft, setTimeLeft] = useState(mockInfo.duration * 60)
    const progress = JSON.parse(sessionStorage.getItem('mock_progress') as string)
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
    const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
    const [currentQuestion, setCurrentQuestion] = useState<Question>({
        index: 0,
        _id: "",
        questionTitle: "",
        options: []
    })

    useEffect(() => {
        const savedQuestions: Question[] = JSON.parse(sessionStorage.getItem('questions') as string)
        if (!savedQuestions) {
            async function getQuestions() {
                const res = await fetchQuestions(subject as string, mockId as string)
                const json = await res?.data
                if (json.questions.length !== 0) {
                    let arr: any = []
                    json.questions.map((question: any, idx: number): any => {
                        let obj = {
                            index: idx + 1,
                            _id: question._id,
                            questionTitle: question.questionTitle,
                            options: question.options
                        }
                        arr.push(obj)
                    })
                    // save questions to session storage
                    sessionStorage.setItem('questions', JSON.stringify(arr))
                    setMock(arr)
                    setCurrentQuestion(arr[currentIdx])

                }
            }
            getQuestions()
        }
        else {
            setMock(savedQuestions)
            setCurrentQuestion(savedQuestions[currentIdx])
            setSelectedAnswers(progress.selectedAnswers)
            setTimeLeft(progress.timeLeft)
        }

    }, [])

    useEffect(() => {
        if (mock.length > 0) {
            setCurrentQuestion(mock[currentIdx])
        }
    }, [currentIdx])

    useEffect(() => {
        let progress = {
            selectedAnswers: selectedAnswers,
            timeLeft: timeLeft
        }
        sessionStorage.setItem('mock_progress', JSON.stringify(progress))
    }, [selectedAnswers, timeLeft])

    // Prevent accidental refresh / tab close / browser back button
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (!testActive) return;
            event.preventDefault();
            event.returnValue = 'Are you sure you want to leave the site while attempting the mock';
        }
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        }
    }, [testActive])


    return {
        mock,
        setMock,
        currentIdx,
        setCurrentIdx,
        timeLeft,
        setTimeLeft,
        selectedAnswers,
        setSelectedAnswers,
        markedForReview,
        setMarkedForReview,
        currentQuestion,
        setCurrentQuestion,
        setTestActive
    }

}

