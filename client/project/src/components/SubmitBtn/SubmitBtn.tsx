import { CheckCircle2 } from 'lucide-react'
import { Button } from '../ui/button'

function SubmitBtn() {
    return (
        <div className="p-4 border-t border-border bg-card">
            <Button
                variant="destructive"
                className="w-full gap-2 text-xs font-semibold"
                onClick={() => alert("Submit confirm modal triggered")}
            >
                <CheckCircle2 className="w-4 h-4" />
                End & Submit Test
            </Button>
        </div>
    )
}

export default SubmitBtn