import { useState } from 'react'
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
import { processPayment } from '@/services/processPayment';


function UnlockContentDialog() {
    const [loading, setLoading] = useState(false)
    const handlePayment = async () => {
        setLoading(true)
        await processPayment()
        setLoading(false)
    }
    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger className="w-full flex-row  bg-gray-900 text-slate-200 rounded-xl">
                    <div className="flex justify-between m-2">
                        <div className="mx-auto">
                            <span>Pay Now to unlock all contents</span>
                        </div>
                        <div>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </div>
                    </div>

                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to pay?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Once the payment starts please do not refresh the page
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handlePayment}
                            disabled={loading}
                            className="bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-all shadow-sm">Pay</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default UnlockContentDialog