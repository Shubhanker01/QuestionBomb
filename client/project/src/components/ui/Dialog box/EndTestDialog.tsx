import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogHeader, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import { useSubmitProvider } from '@/provider/submitProvider';
import { Loader2 } from 'lucide-react';
// import { handleSubmit } from '@/handlers/handleMockSubmit';
import { useHandleSubmit } from '@/hooks/useHandleSubmit';
import { useParams } from 'react-router-dom';

function EndTestDialog({ open, onOpenChange, selectedAnswers }: any) {
    const { mockId, userId } = useParams()
    const { onSubmit }: any = useHandleSubmit(mockId as string, userId as string, selectedAnswers)
    const { setIsSubmitting, isSubmitting }: any = useSubmitProvider()
    const submit = async () => {
        try {
            await onSubmit()
        } catch (error) {
            console.log(error)
        }
        finally {
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
                        <AlertDialogAction onClick={submit}>
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