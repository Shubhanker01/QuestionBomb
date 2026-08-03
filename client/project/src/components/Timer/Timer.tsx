import { useEffect } from 'react'
import { Clock } from 'lucide-react';
// import { handleSubmit } from '@/handlers/handleMockSubmit';
import { useHandleSubmit } from '@/hooks/useHandleSubmit';
import { useParams } from 'react-router-dom';
function Timer({ timeLeft, setTimeLeft, onSubmitError, selectedAnswers }: any) {
    const { mockId, userId } = useParams()
    const { onSubmit }: any = useHandleSubmit(mockId as string, userId as string, selectedAnswers)
    const onTimeUp = async () => {
        try {
            await onSubmit()
        } catch (error) {
            console.log(error)
            onSubmitError("Error occured while submitting mock")
        }
    }
    useEffect(() => {
        if (timeLeft <= 0) {
            onTimeUp()
            return
        };
        const timer = setInterval(() => setTimeLeft((prev: any) => prev - 1), 1000
        );
        return () => clearInterval(timer);
    }, [timeLeft]);


    // Format time (MM:SS)
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="p-5 border-b border-border bg-muted/30">
            <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Time Remaining
                </span>
                <Clock className="w-4 h-4 text-primary animate-pulse" />
            </div>
            <div className="text-3xl font-mono font-bold tracking-tight text-foreground">
                {formatTime(timeLeft)}
            </div>
        </div>
    )
}

export default Timer