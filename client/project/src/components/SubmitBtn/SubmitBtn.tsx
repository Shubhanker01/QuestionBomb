import { CheckCircle2 } from 'lucide-react'
import { Button } from '../ui/button'
import EndTestDialog from '../ui/Dialog box/EndTestDialog'
import { useState } from 'react'

function SubmitBtn({ selectedAnswers }: any) {
    const [open, onOpenChange] = useState(false)
    return (
        <div className="p-4 border-t border-border bg-card">
            <Button
                variant="destructive"
                className="w-full gap-2 text-xs font-semibold"
                onClick={() => onOpenChange(true)}
            >
                <CheckCircle2 className="w-4 h-4" />
                End & Submit Test
            </Button>
            <EndTestDialog open={open} onOpenChange={onOpenChange} selectedAnswers={selectedAnswers} />
        </div>
    )
}

export default SubmitBtn