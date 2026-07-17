import { Loader2 } from 'lucide-react'

function LoadingState() {
    return (
        <div>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
        </div>
    )
}

export default LoadingState