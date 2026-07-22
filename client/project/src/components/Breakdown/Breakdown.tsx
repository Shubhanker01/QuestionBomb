import { Card, CardContent } from '../ui/card'
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react'

export default function Breakdown({ result }: any) {
    return (
        <>
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
        </>
    )
}