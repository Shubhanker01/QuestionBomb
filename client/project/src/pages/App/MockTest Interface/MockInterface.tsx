import { useState } from "react";
import Timer from "@/components/Timer/Timer";
import Header from "@/components/Header/Header";
import QuestionCard from "@/components/QuestionCard/QuestionCard";
import Footer from "@/components/Footer/Footer";
import QuestionPalette from "@/components/Question Palette/QuestionPalette";
import SubmitBtn from "@/components/SubmitBtn/SubmitBtn";
import LegendStats from "@/components/Legend Stats/LegendStats";
import { useParams } from "react-router-dom";
import SubmitProvider from "@/provider/submitProvider";
import { Loader2 } from "lucide-react";
import { useMockInterface } from "@/hooks/useMockInterface";

export default function MockInterface() {
    const { subject, mockId } = useParams()
    const [submitError, onSubmitError] = useState(false)
    const {
        mock,
        currentIdx,
        setCurrentIdx,
        timeLeft,
        setTimeLeft,
        selectedAnswers,
        setSelectedAnswers,
        markedForReview,
        setMarkedForReview,
        currentQuestion
    } = useMockInterface(subject as string, mockId as string)

    return (
        <SubmitProvider>
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
                        <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} onSubmitError={onSubmitError} selectedAnswers={selectedAnswers} />

                        {/* Legend Stats Summary */}
                        <LegendStats />

                        {/* Question Palette Grid */}
                        <QuestionPalette selectedAnswers={selectedAnswers} markedForReview={markedForReview} currentQuestion={currentQuestion} setCurrentIdx={setCurrentIdx} questions={mock} />
                        {/* <PauseButton paused={paused} setPaused={setPaused}/> */}

                    </div>

                    {/* Sidebar Footer Action */}
                    <SubmitBtn selectedAnswers={selectedAnswers} />
                </aside>

                {/* ================= AUTO-SUBMIT LOCKSCREEN OVERLAY ================= */}
                {timeLeft <= 0 && submitError == false && (
                    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md transition-all duration-500 animate-in fade-in">
                        <div className="max-w-md w-full mx-4 p-8 bg-card border border-border shadow-2xl rounded-2xl text-center space-y-6">
                            {/* Animated Loading Ring */}
                            <div className="relative flex items-center justify-center mx-auto w-16 h-16 rounded-full bg-primary/10 text-primary">
                                <Loader2 className="w-8 h-8 animate-spin" />
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-xl font-bold tracking-tight text-foreground">
                                    Time's Up!
                                </h2>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Your time limit has expired. Please wait while your answers are being automatically saved and submitted securely.
                                </p>
                            </div>

                            {/* Progress visual accent */}
                            <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                                <div className="bg-primary h-full rounded-full w-2/3 animate-pulse" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </SubmitProvider>
    );
}