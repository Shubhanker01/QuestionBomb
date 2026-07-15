import { useEffect, useState } from "react";
import Timer from "@/components/Timer/Timer";
import Header from "@/components/Header/Header";
import QuestionCard from "@/components/QuestionCard/QuestionCard";
import Footer from "@/components/Footer/Footer";
import QuestionPalette from "@/components/Question Palette/QuestionPalette";
import SubmitBtn from "@/components/SubmitBtn/SubmitBtn";
import LegendStats from "@/components/Legend Stats/LegendStats";
import { fetchQuestions } from "@/services/questions";
import { useParams } from "react-router-dom";
import type { Question } from "@/types/question";
// Sample Questions

export default function MockInterface() {
    const { subject, mockId } = useParams()
    const [mock, setMock] = useState<Question[] | []>([])
    const [currentIdx, setCurrentIdx] = useState(0);
    const [timeLeft, setTimeLeft] = useState(1800)
    // const [paused, setPaused] = useState(false)
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
    console.log(selectedAnswers)
    return (

        <div className="flex flex-col lg:flex-row h-screen w-full bg-background">
            {/* ================= LEFT MAIN PANEL ================= */}
            <div className="flex-1 flex flex-col h-full border-r border-border">
                {/* Top Header */}
                <Header currentIdx={currentIdx + 1} length={mock.length} />

                {/* Question & Options Scrollable Content */}
                <QuestionCard setSelectedAnswers={setSelectedAnswers} setMarkedForReview={setMarkedForReview} currentIdx={currentIdx} markedForReview={markedForReview} selectedAnswers={selectedAnswers} currentQuestion={currentQuestion} />

                {/* Bottom Navigation Controls Bar */}
                <Footer currentIdx={currentIdx} setCurrentIdx={setCurrentIdx} length={mock.length} />
            </div>

            {/* ================= RIGHT SIDEBAR ================= */}
            <aside className="w-full lg:w-80 h-full bg-card border-l border-border flex flex-col justify-between shrink-0">
                <div>
                    {/* Top Timer Box */}
                    <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />

                    {/* Legend Stats Summary */}
                    <LegendStats />

                    {/* Question Palette Grid */}
                    <QuestionPalette selectedAnswers={selectedAnswers} markedForReview={markedForReview} currentQuestion={currentQuestion} setCurrentIdx={setCurrentIdx} questions={mock} />
                    {/* <PauseButton paused={paused} setPaused={setPaused}/> */}

                </div>

                {/* Sidebar Footer Action */}
                <SubmitBtn />
            </aside>
        </div>
    );
}