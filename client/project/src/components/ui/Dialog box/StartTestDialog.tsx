import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ArrowRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom"
import { useMockContext } from "@/provider/mockProvider";
import { mockSubject } from "@/utils/mockSubject";

export default function StartTestDialog({ mock }: any) {
    const { userId } = useParams()
    const { setmockInfo }: any = useMockContext()
    const navigate = useNavigate()
    const handleNavigate = () => {
        setmockInfo({
            mockTitle: mock.mockTitle,
            subject: mockSubject(mock.subjectId),
            section: mock.section,
            subsection: mock.subsection
        })
        navigate(`/mock/${mock.section}/${mock._id}/user/${userId}`)
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger className="w-full flex-row  bg-gray-900 text-slate-200 rounded-xl">
                <div className="flex justify-between m-2">
                    <div className="mx-auto">
                        <span>Start Test</span>
                    </div>
                    <div>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </div>
                </div>

            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to start the test?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Once the test starts you cannot go back to this page
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleNavigate}>Start Test</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}