import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogHeader, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import { useSubmitProvider } from '@/provider/submitProvider';
import { submitMock } from '@/services/mocks';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';
import type { JSONResultResponseType } from '@/types/mock';

function EndTestDialog({ open, onOpenChange, selectedAnswers }: any) {
    const navigate = useNavigate()
    const { userId, mockId } = useParams()
    const { setIsSubmitting, isSubmitting }: any = useSubmitProvider()
    const handleSubmit = async () => {
        onOpenChange(true)
        setIsSubmitting(true)
        try {
            const res = await submitMock(mockId as string, userId as string, JSON.stringify(selectedAnswers))
            const json: JSONResultResponseType = await res?.data
            console.log(json)
            if (json) {
                sessionStorage.removeItem('mock_progress')
                sessionStorage.removeItem('questions')
                navigate(`/test-score/mock/${mockId}/user/${userId}`, {
                    state: {
                        score: json.score,
                        noOfCorrectQuestion: json.noOfCorrectQuestion, noOfIncorrectQuestion: json.noOfIncorrectQuestion,
                        noOfUnattemptedQuestion: json.noOfUnattemptedQuestion,
                        rank: json.rank,
                        totalParticipants: json.totalParticipants,
                        percentile: json.percentile
                    }
                })
            }
            else {
                toast.error("Error occured while calculating score!!!")
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            onOpenChange(false)
            setIsSubmitting(false)
        }
    }


    return (
        <div>
            <AlertDialog open={open} onOpenChange={onOpenChange}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to submit the test?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Check your answers before submitting
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleSubmit}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                "Submit Test"
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    )
}

export default EndTestDialog