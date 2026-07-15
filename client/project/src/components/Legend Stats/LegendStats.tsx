
function LegendStats() {
    return (
        <div>
            <div className="p-4 border-b border-border text-xs grid grid-cols-2 gap-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" />
                    <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                    <span>Marked</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-purple-600 inline-block" />
                    <span>Ans & Marked</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-muted border border-border inline-block" />
                    <span>Unvisited</span>
                </div>
            </div>
        </div>
    )
}

export default LegendStats