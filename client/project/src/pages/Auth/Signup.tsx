import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShieldAlert } from "lucide-react"

function Signup() {
    useEffect(() => {
        

    }, [])

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

            <Card className="w-full max-w-md border-zinc-900 bg-zinc-900/40 backdrop-blur-md shadow-2xl relative z-10">
                <CardHeader className="space-y-2 text-center pb-6">
                    <CardTitle className="text-2xl font-black tracking-tight text-zinc-100">Create Your Account</CardTitle>
                    <CardDescription className="text-sm text-zinc-400">
                        Join thousands of serious aspirants practicing in a zero-distraction environment.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">

                    {/* 💥 THE OFFICIAL GOOGLE INJECTION CONTAINER */}
                    <div className="w-full flex justify-center min-h-11">
                        <div id="googleButtonDiv" className="w-full max-w-full overflow-hidden rounded-md transition-all duration-200" />
                    </div>

                    {/* Clean Decorative Separator line */}
                    <div className="relative flex items-center justify-center">
                        <div className="absolute w-full border-t border-zinc-800" />
                        <span className="relative bg-zinc-925 px-3 text-xs uppercase text-zinc-500 font-medium tracking-widest">
                            Or prepare manually
                        </span>
                    </div>

                    {/* Form Fields Interface */}
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="name" className="text-xs font-semibold text-zinc-400">Full Name</Label>
                            <Input
                                id="name"
                                placeholder="Vikram Singh"
                                type="text"
                                className="bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-red-500 focus-visible:border-red-500"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="email" className="text-xs font-semibold text-zinc-400">Email Address</Label>
                            <Input
                                id="email"
                                placeholder="aspirant@gmail.com"
                                type="email"
                                className="bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-red-500 focus-visible:border-red-500"
                            />
                        </div>
                    </div>



                </CardContent>

                <CardFooter className="flex flex-col space-y-4 pb-6">
                    <Button className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-bold transition-all duration-200">
                        Create Free Account
                    </Button>

                    <p className="text-xs text-center text-zinc-500">
                        Already have a checkpoint active?{" "}
                        <button className="text-red-400 hover:underline font-medium">
                            Log In
                        </button>
                    </p>
                </CardFooter>
            </Card>

            {/* Security notice footer segment */}
            <div className="mt-6 flex items-center space-x-2 text-xs text-zinc-600 z-10">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Secure cryptographic handshake managed directly by Google Identity Services.</span>
            </div>

        </div>
    )
}

export default Signup