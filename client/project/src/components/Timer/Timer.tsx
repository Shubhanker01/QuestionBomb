import { useEffect } from 'react'
import { Clock } from 'lucide-react';
import { submitMock } from '@/services/mocks';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function Timer({ timeLeft, setTimeLeft, onSubmitError, selectedAnswers }: any) {
    const { mockId, userId } = useParams()
    const navigate = useNavigate()
    // const [submissionSpinner, setSubmissionSpinner] = useState(false)
    const handleSubmit = async () => {
        try {
            const res = await submitMock(mockId as string, userId as string, JSON.stringify(selectedAnswers))
            const json = res?.data
            if (json) {
                sessionStorage.removeItem('mock_progress')
                sessionStorage.removeItem('questions')
                navigate(`/test-score/mock/${mockId}/user/${userId}`, { state: { score: json.score, noOfCorrectQuestion: json.noOfCorrectQuestion, noOfIncorrectQuestion: json.noOfIncorrectQuestion, noOfUnattemptedQuestion: json.noOfUnattemptedQuestion } })
            }
            else {
                toast.error("Some error occured while calculating score!!!")
            }

        } catch (error) {
            console.log(error)
            onSubmitError(true)
        }
    }
    useEffect(() => {
        if (timeLeft <= 0) {
            handleSubmit()
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
            {/* <SubmissionSpinner submissionSpinner={submissionSpinner} setSubmissionSpinner={setSubmissionSpinner} /> */}
        </div>
    )
}

export default Timer