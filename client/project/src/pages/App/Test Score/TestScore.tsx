import { useLocation } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Trophy,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Zap,
    RotateCcw
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

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
    const { userId } = useParams()
    const location = useLocation()
    const result = location.state
    // Pie chart geometry values
    const accuracyPercentage = Math.round((result.noOfCorrectQuestion / (result.noOfCorrectQuestion + result.noOfIncorrectQuestion)) * 100);
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (accuracyPercentage / 100) * circumference;
    return (
        <>
            <div className="min-h-screen w-full bg-background p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
                {/* Top Header Section */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card p-6 rounded-2xl border border-border shadow-sm">
                    <div>
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/15 mb-2 font-medium" variant="secondary">
                            Exam Submission Successful
                        </Badge>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">Science Sectional Mock - 01 Results</h1>
                        <p className="text-sm text-muted-foreground mt-0.5">Performance Analytics Overview</p>
                    </div>
                    <Link to={`/main-app/${userId}`}
                        className="flex items-center gap-2 text-sm font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2.5 rounded-xl border border-border/80 transition-all shadow-sm"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Back to Dashboard
                    </Link>
                </header>

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
                    <Card className="lg:col-span-7 flex flex-col justify-between border-border/70 shadow-sm">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2.5">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <Zap className="w-5 h-5" />
                                </div>
                                <div>
                                    <CardTitle className="text-base font-semibold">Accuracy Assessment</CardTitle>
                                    <CardDescription className="text-xs">Ratio of correct answers against total questions attempted</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-col sm:flex-row items-center justify-center gap-8 py-6 flex-1">
                            {/* SVG Circular Donut Progress Ring */}
                            <div className="relative w-36 h-36 shrink-0">
                                <svg className="w-full h-full transform -rotate-90 shadow-sm rounded-full" viewBox="0 0 120 120">
                                    <circle
                                        cx="60"
                                        cy="60"
                                        r={radius}
                                        className="stroke-muted"
                                        strokeWidth="10"
                                        fill="transparent"
                                    />
                                    <circle
                                        cx="60"
                                        cy="60"
                                        r={radius}
                                        className="stroke-primary transition-all duration-1000 ease-out"
                                        strokeWidth="10"
                                        fill="transparent"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={strokeDashoffset}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                    <span className="text-3xl font-mono font-extrabold text-foreground tracking-tight">{accuracyPercentage}%</span>
                                    <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground mt-0.5">Accuracy</span>
                                </div>
                            </div>

                            {/* Quick Insights Text panel */}
                            <div className="space-y-4 max-w-xs text-center sm:text-left">
                                <div>
                                    <h3 className="text-sm font-semibold text-foreground">Performance Summary</h3>
                                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                        You scored higher than <span className="text-primary font-medium">74%</span> of modern candidates who took this sectional test this week.
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 justify-center sm:justify-start">
                                    <div>
                                        <p className="text-lg font-mono font-bold text-foreground">{result.score.toFixed(2)}</p>
                                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Final Score</p>
                                    </div>
                                    <Separator orientation="vertical" className="h-8" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* ================= BOTTOM ROW: DETAILED ATTEMPT METRICS ================= */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Correct Breakdown Card */}
                    <Card className="border-emerald-500/20 bg-emerald-500/[0.02] shadow-sm">
                        <CardContent className="pt-6 flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Correct Answers</p>
                                <p className="text-3xl font-mono font-bold text-emerald-700 dark:text-emerald-500">{result.noOfCorrectQuestion}</p>
                                <p className="text-[11px] text-muted-foreground font-medium">+{(result.noOfCorrectQuestion * 0.83).toFixed(2)} Marks Awarded</p>
                            </div>
                            <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Incorrect Breakdown Card */}
                    <Card className="border-destructive/20 bg-destructive/[0.01] shadow-sm">
                        <CardContent className="pt-6 flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-xs font-semibold text-destructive uppercase tracking-wider">Incorrect Answers</p>
                                <p className="text-3xl font-mono font-bold text-destructive">{result.noOfIncorrectQuestion}</p>
                                <p className="text-[11px] text-muted-foreground font-medium">-{(result.noOfIncorrectQuestion * 0.27).toFixed(2)} Negative Marking</p>
                            </div>
                            <div className="p-3.5 rounded-2xl bg-destructive/10 text-destructive">
                                <XCircle className="w-6 h-6" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Not Attempted Breakdown Card */}
                    <Card className="border-muted bg-muted/10 shadow-sm">
                        <CardContent className="pt-6 flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Not Attempted</p>
                                <p className="text-3xl font-mono font-bold text-foreground">{result.noOfUnattemptedQuestion}</p>
                                <p className="text-[11px] text-muted-foreground font-medium">No impact on grading status</p>
                            </div>
                            <div className="p-3.5 rounded-2xl bg-muted text-muted-foreground">
                                <AlertCircle className="w-6 h-6" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>

    )
}

export default TestScore