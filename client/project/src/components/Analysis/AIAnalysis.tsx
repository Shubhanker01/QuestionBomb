import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { Sparkles, Loader2 } from 'lucide-react'

function AIAnalysis({ loading, analysisText }: any) {
    return (
        <div>
            <Card className="border-primary/30 bg-primary/[0.02] shadow-sm">
                <CardHeader>
                    <div className="flex items-center gap-2 text-primary">
                        <Sparkles className="w-5 h-5" />
                        <CardTitle className="text-base font-semibold">AI Mentor Post-Mock Analysis</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex items-center gap-3 py-6 text-muted-foreground text-sm">
                            <Loader2 className="w-5 h-5 animate-spin text-primary" />
                            Analyzing your response patterns and preparing personalized tips...
                        </div>
                    ) : (
                        <div className="prose prose-sm dark:prose-invert max-w-none text-foreground whitespace-pre-line leading-relaxed">
                            {analysisText}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default AIAnalysis