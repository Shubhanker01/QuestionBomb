import UnlockContentDialog from '../ui/Dialog box/UnlockContentDialog'
import { useProvider } from '@/provider/userProvider'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import StartTestDialog from '../ui/Dialog box/StartTestDialog'

function CardFooterButton({ mock }: any) {
    const { userId } = useParams()
    const { user }: any = useProvider()
    if (mock.isPaid) {
        if (mock.isPaid !== user.isPaid) {
            return <UnlockContentDialog />
        }
        else {
            if (mock.isAttempted) {
                return (
                    <Link className="w-full flex-row  bg-gray-900 text-slate-200 rounded-xl" to={`/review/${mock.section}/${mock._id}/user/${userId}`}>
                        <div className="flex justify-between m-2">
                            <div>
                                <span>
                                    View Score and Solutions
                                </span>
                            </div>
                            <div>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                            </div>
                        </div>
                    </Link>
                )
            }
            return <StartTestDialog mock={mock} />
        }
    }
    else {
        if (mock.isAttempted) {
            return (
                <Link className="w-full flex-row  bg-gray-900 text-slate-200 rounded-xl" to={`/review/${mock.section}/${mock._id}/user/${userId}`}>
                    <div className="flex justify-between m-2">
                        <div>
                            <span>
                                View Score and Solutions
                            </span>
                        </div>
                        <div>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </div>
                    </div>
                </Link>
            )
        }
        return <StartTestDialog mock={mock} />
    }
}

export default CardFooterButton