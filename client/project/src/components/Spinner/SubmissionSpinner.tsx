import { useEffect } from "react";
import { Spinner } from "../ui/spinner"
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogHeader, AlertDialogDescription, AlertDialogFooter } from '@/components/ui/alert-dialog';


function SubmissionSpinner({ submissionSpinner, setSubmissionSpinner }: any) {
    useEffect(() => {
        if (submissionSpinner == true) {
            setTimeout(() => {
                setSubmissionSpinner(false)
            }, 3000)
        }
    }, [submissionSpinner])
    return (
        <div>
            {
                submissionSpinner == true ? (
                    <div>
                        <AlertDialog>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Submitting your test</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Please wait!!!!
                                        <Spinner className="size-6" />
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>

                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>) : (<div></div>)
            }
        </div>


    )
}

export default SubmissionSpinner