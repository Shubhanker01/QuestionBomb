import { Badge, RotateCcw } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

function TestScoreHeader() {
    const { userId } = useParams()
    return (
        <div>
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card p-6 rounded-2xl border border-border shadow-sm">
                <div>
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/15 mb-2 font-medium">
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
        </div>
    )
}

export default TestScoreHeader