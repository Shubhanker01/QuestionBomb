import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldAlert } from "lucide-react"
import { GoogleLogin } from "@react-oauth/google"
import { useGoogleAuth } from "@/hooks/useGoogleAuth"
import { useEffect } from "react"
import { useLoadingBarHook } from "@/hooks/useloadingBar"

function Signup() {
    const { start, complete } = useLoadingBarHook()
    const { handleSuccess, handleError } = useGoogleAuth()
    useEffect(() => {
        start()
        return () => {
            complete()
        }
    }, [start, complete])


    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-4 relative font-sans selection:bg-red-500/30 selection:text-red-400">

            {/* Structural Ambient Background Light */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

            {/* Top Navigation Brand Logo */}
            <div className="mb-8 text-center z-10">
                <span className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-linear-to-r from-red-500 to-amber-500">
                    QUESTIONBOMB
                </span>
                <p className="text-xs text-zinc-500 tracking-wider mt-1 uppercase">UPSC CDS Adaptive Exam Engine</p>
            </div>

            <CardContent className="">
                <CardHeader className="space-y-2 text-center pb-6">
                    <CardTitle className="text-2xl font-black tracking-tight text-zinc-100">Create Your Account</CardTitle>
                    <CardDescription className="text-sm text-zinc-400">
                        Join thousands of serious aspirants practicing in a zero-distraction environment.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">

                    {/* 💥 THE OFFICIAL GOOGLE INJECTION CONTAINER */}
                    <div className="w-full flex justify-center min-h-11">

                        <div>
                            <GoogleLogin
                                onSuccess={handleSuccess}
                                onError={handleError}
                                theme="filled_black"
                                shape="rectangular"
                                size="large"
                                width="380px"
                                text="signup_with"
                                useOneTap={false}
                            />
                        </div>

                    </div>

                </CardContent>
            </CardContent>

            {/* Security notice footer segment */}
            <div className="mt-6 flex items-center space-x-2 text-xs text-zinc-600 z-10">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Secure cryptographic handshake managed directly by Google Identity Services.</span>
            </div>

        </div>
    )
}

export default Signup