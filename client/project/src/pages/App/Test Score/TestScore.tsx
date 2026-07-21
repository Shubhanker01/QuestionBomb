import { useLocation } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import {
    Trophy
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useAIAnalysis } from "@/hooks/useAIAnalysis";
import { useMockContext } from "@/provider/mockProvider";
import type { Params } from "react-router-dom";
import TestScoreHeader from "@/components/Header/TestScoreHeader";
import VisualChart from "@/components/Visual Chart/VisualChart";
import AIAnalysis from "@/components/Analysis/AIAnalysis";
import Breakdown from "@/components/Breakdown/Breakdown";

// Mock Data Types
interface LeaderboardUser {
    rank: number;
    name: string;
    score: number;
    accuracy: number;
    isCurrentUser?: boolean;
}

const LEADERBOARD_DATA: LeaderboardUser[] = [
    { rank: 1, name: "Aarav Sharma", score: 92.5, accuracy: 96 },
    { rank: 2, name: "Priya Patel", score: 88.0, accuracy: 91 },
    { rank: 3, name: "Rohan Das", score: 85.2, accuracy: 89 },
    { rank: 4, name: "Ananya Iyer", score: 81.4, accuracy: 85 },
    { rank: 12, name: "You (Your Progress)", score: 68.3, accuracy: 76, isCurrentUser: true },
];

function TestScore() {
    const { userId, mockId }: Readonly<Params<string>> = useParams()
    const { mockInfo }: any = useMockContext()
    const location = useLocation()
    const result = location.state
    // Pie chart geometry values
    const accuracyPercentage = Math.round((result.noOfCorrectQuestion / (result.noOfCorrectQuestion + result.noOfIncorrectQuestion)) * 100);
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (accuracyPercentage / 100) * circumference;
    const { analysisText, loading } = useAIAnalysis({
        userId,
        mockId,
        subject: mockInfo.subject,
        totalScore: result.score,
        maxMarks: (result.noOfIncorrectQuestion + result.noOfIncorrectQuestion + result.noOfUnattemptedQuestion) * 0.83,
        accuracy: accuracyPercentage,
        section: mockInfo.section,
        subsection: mockInfo.subsection
    })
    return (
        <>
            <div className="min-h-screen w-full bg-background p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
                {/* Top Header Section */}
                <TestScoreHeader />

                {/* Main Container Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* ================= LEFT COLUMN: LEADERBOARD ================= */}
                    <Card className="lg:col-span-5 flex flex-col justify-between border-border/70 shadow-sm">
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-2.5">
                                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                                    <Trophy className="w-5 h-5" />
                                </div>
                                <div>
                                    <CardTitle className="text-base font-semibold">Top Leaderboard</CardTitle>
                                    <CardDescription className="text-xs">Rankings across live test takers</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2.5 flex-1 pt-1">
                            {LEADERBOARD_DATA.map((user) => (
                                <div
                                    key={user.rank}
                                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${user.isCurrentUser
                                        ? "bg-primary/5 border-primary/40 shadow-sm ring-1 ring-primary/10"
                                        : "bg-muted/30 border-border/60 hover:bg-accent/40"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className={`w-6 text-xs font-bold text-center ${user.rank === 1 ? "text-amber-500 text-sm" :
                                            user.rank === 2 ? "text-slate-400 text-sm" :
                                                user.rank === 3 ? "text-amber-700 text-sm" : "text-muted-foreground"
                                            }`}>
                                            #{user.rank}
                                        </span>
                                        <div>
                                            <p className={`text-sm font-medium ${user.isCurrentUser ? "text-primary font-semibold" : "text-foreground"}`}>
                                                {user.name}
                                            </p>
                                            <p className="text-[11px] text-muted-foreground mt-0.5">Accuracy: {user.accuracy}%</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-mono font-bold text-foreground">{user.score.toFixed(2)}</p>
                                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Marks</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* ================= RIGHT COLUMN: VISUAL CHART ================= */}
                    <VisualChart radius={radius} circumference={circumference} strokeDashOffset={strokeDashoffset} accuracyPercentage={accuracyPercentage} result={result} />
                </div>

                {/* ================= BOTTOM ROW: DETAILED ATTEMPT METRICS ================= */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Correct Breakdown Card */}
                    <Breakdown result={result}/>
                </div>
                <AIAnalysis loading={loading} analysisText={analysisText} />

            </div>
        </>

    )
}

export default TestScore