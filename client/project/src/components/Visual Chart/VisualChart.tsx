import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Zap } from 'lucide-react';
import { Separator } from '../ui/separator';

function VisualChart({ radius, circumference, strokeDashoffset, accuracyPercentage, result }: any) {
    return (
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
                            You scored higher than <span className="text-primary font-medium">{result.percentile}</span> of candidates who took this sectional test this week.
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
    )
}

export default VisualChart