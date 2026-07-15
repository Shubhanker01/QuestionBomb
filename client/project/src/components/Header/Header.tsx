import { Badge } from '@/components/ui/badge'
import type { Pagination } from '@/types/question'
function Header({ currentIdx, length }: Pagination) {
    return (
        <div>
            <header className="px-6 py-4 border-b border-border flex items-center justify-between bg-card">
                <div>
                    <h1 className="text-xl font-bold tracking-tight">Science Sectional Mock - 01</h1>
                    <p className="text-xs text-muted-foreground mt-0.5">Physics & Chemistry</p>
                </div>
                <Badge variant="outline" className="text-xs font-semibold px-3 py-1">
                    Question {currentIdx} of {length}
                </Badge>
            </header>
        </div>
    )
}

export default Header