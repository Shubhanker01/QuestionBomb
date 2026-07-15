import { useEffect } from 'react'
import { Clock } from 'lucide-react';
import type { TimerProps } from '@/types/question';

function Timer({ timeLeft, setTimeLeft }: TimerProps) {
    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000
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