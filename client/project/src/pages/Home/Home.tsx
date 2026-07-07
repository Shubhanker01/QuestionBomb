
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, Zap, BookOpen, User, Star, Layers, CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-red-500/30 selection:text-red-400">

            {/* 1. HEADER SECTION */}
            <header className="sticky top-0 z-50 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-linear-to-r from-red-500 to-amber-500">
                            QUESTIONBOMB
                        </span>
                    </div>
                    <nav>
                        <Link to="/signup" className="bg-red-600 hover:bg-red-700 text-white font-semibold transition-all duration-200 shadow-lg shadow-red-900/20 p-2">
                            Get Started
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="grow">

                {/* 2. HERO / PURPOSE SECTION */}
                <section className="relative max-w-5xl mx-auto px-4 pt-20 pb-16 text-center sm:px-6 lg:px-8">
                    {/* Subtle decorative glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

                    <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-zinc-100 max-w-4xl mx-auto leading-[1.15]">
                        Stop Scrolling Telegram Pools. <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 via-orange-500 to-amber-500">
                            Master the UPSC CDS Exam.
                        </span>
                    </h1>

                    <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                        QuestionBomb eliminates resource fragmentation and chat-room distractions. We unify
                        expert, hand-curated high-yield NCERT question banks onto a dedicated, zero-interruption
                        testing platform—powered by instantaneous Google Gemini cognitive analysis to map your
                        blind spots after every attempt.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button size="lg" className="w-full sm:w-auto bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-bold px-8">
                            Launch Free Mock Test
                        </Button>
                        <Button size="lg" variant="outline" className="w-full sm:w-auto border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-zinc-100 px-8">
                            Explore Syllabus Map
                        </Button>
                    </div>
                </section>
                <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 border-t border-zinc-900 bg-linear-to-b from-zinc-900/10 to-transparent">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                                Get Both <span className="text-red-500">Quality</span> <br />
                                and <span className="text-amber-500">Quantity</span>
                            </h2>
                            <p className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed">
                                Aspirants are usually forced to choose. They either find premium academy tests locked behind steep paywalls, or rely on endless quantities of unverified, chaotic public channels.
                            </p>
                            <p className="mt-3 text-base sm:text-lg text-zinc-400 leading-relaxed">
                                QuestionBomb bridges the divide. By combining precise curation with custom digital blueprints, we deploy an expansive array of highly structured drills that never drop in caliber.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-900">
                                <h3 className="font-bold text-zinc-100 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-red-500" /> High-Yield Curation
                                </h3>
                                <p className="mt-2 text-sm text-zinc-400">Every single problem traces back to core NCERT benchmarks and authentic UPSC trends.</p>
                            </div>
                            <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-900">
                                <h3 className="font-bold text-zinc-100 flex items-center gap-2">
                                    <Layers className="w-4 h-4 text-amber-500" /> Expansive Coverage
                                </h3>
                                <p className="mt-2 text-sm text-zinc-400">Thousands of isolated topic blocks mean you never run out of reliable practice parameters.</p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* 3. CORE FEATURES GRID */}
                <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 border-t border-zinc-900">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                            Engineered for Focused Conditioning
                        </h2>
                        <p className="mt-3 text-zinc-400">
                            Built deliberately to replace fragmented channels with high-performance test architecture.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Feature 1 */}
                        <Card className="border-zinc-900 bg-zinc-900/40 backdrop-blur-sm shadow-xl">
                            <CardHeader>
                                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 mb-2">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <CardTitle className="text-lg font-bold text-zinc-100">Frictionless One-Tap Portal</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-zinc-400 leading-relaxed">
                                Skip password management fatigue. Authenticate instantly via Google One-Tap and jump straight into your customized daily training dashboard without friction.
                            </CardContent>
                        </Card>

                        {/* Feature 2 */}
                        <Card className="border-zinc-900 bg-zinc-900/40 backdrop-blur-sm shadow-xl">
                            <CardHeader>
                                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 mb-2">
                                    <BookOpen className="w-5 h-5" />
                                </div>
                                <CardTitle className="text-lg font-bold text-zinc-100">Sectional & NCERT Micro-Drills</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-zinc-400 leading-relaxed">
                                Isolate your training by specific subjects and conceptual blocks. Access hyper-targeted questions built entirely out of core high-yield NCERT parameters.
                            </CardContent>
                        </Card>

                        {/* Feature 3 */}
                        <Card className="border-zinc-900 bg-zinc-900/40 backdrop-blur-sm shadow-xl">
                            <CardHeader>
                                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 mb-2">
                                    <Zap className="w-5 h-5" />
                                </div>
                                <CardTitle className="text-lg font-bold text-zinc-100">Gemini Cognitive Diagnosis</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-zinc-400 leading-relaxed">
                                Go beyond standard percentages. Gemini evaluates your pacing velocity, option-switching hesitation, and wrong selections to provide a clear, tailored revision roadmap.
                            </CardContent>
                        </Card>

                    </div>
                </section>

                {/* 4. TESTIMONIALS SECTION */}
                <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 border-t border-zinc-900">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                            Trusted by Serious Aspirants
                        </h2>
                        <p className="mt-3 text-zinc-400">
                            See how structured, distraction-free environment tracking alters core retention.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Testimonial 1 */}
                        <Card className="border-zinc-900 bg-zinc-950 text-zinc-100 flex flex-col justify-between">
                            <CardContent className="pt-6">
                                <div className="flex items-center space-x-1 text-amber-500 mb-4">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500" />)}
                                </div>
                                <p className="text-sm text-zinc-400 italic leading-relaxed">
                                    "I wasted months tracking down random quiz questions across ten different Telegram channels, constantly fighting group chat notifications. QuestionBomb gave me an isolated, pure testing dashboard. The NCERT source mappings are pinpoint accurate."
                                </p>
                                <div className="mt-6 flex items-center space-x-3 pt-4 border-t border-zinc-900">
                                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-zinc-200">Rahul Sharma</h4>
                                        <p className="text-xs text-zinc-500">CDS 2026 Aspirant</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Testimonial 2 */}
                        <Card className="border-zinc-900 bg-zinc-950 text-zinc-100 flex flex-col justify-between">
                            <CardContent className="pt-6">
                                <div className="flex items-center space-x-1 text-amber-500 mb-4">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500" />)}
                                </div>
                                <p className="text-sm text-zinc-400 italic leading-relaxed">
                                    "The Gemini diagnostic review feature is phenomenal. Instead of just showing me a negative marking deduction, it accurately caught that I was overthinking my science questions and explicitly pointed me back to the exact Class X chapter I needed to review."
                                </p>
                                <div className="mt-6 flex items-center space-x-3 pt-4 border-t border-zinc-900">
                                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-zinc-200">Ananya Verma</h4>
                                        <p className="text-xs text-zinc-500">OTA Merit List Candidate</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Testimonial 3 */}
                        <Card className="border-zinc-900 bg-zinc-950 text-zinc-100 flex flex-col justify-between">
                            <CardContent className="pt-6">
                                <div className="flex items-center space-x-1 text-amber-500 mb-4">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500" />)}
                                </div>
                                <p className="text-sm text-zinc-400 italic leading-relaxed">
                                    "Most coaching centers bundle quality sectional tests inside insanely expensive tiers. Having access to hand-curated, exam-standard blueprints directly linked to textbook metadata completely changes how I practice."
                                </p>
                                <div className="mt-6 flex items-center space-x-3 pt-4 border-t border-zinc-900">
                                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-zinc-200">Siddharth Singh</h4>
                                        <p className="text-xs text-zinc-500">IMA Aspirant</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                </section>

            </main>

            {/* 5. FOOTER SECTION */}
            <footer className="border-t border-zinc-900 bg-zinc-950 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                    <p className="text-xs text-zinc-500">
                        &copy; {new Date().getFullYear()} QuestionBomb. All rights reserved.
                    </p>
                    <p className="text-xs font-medium tracking-wide text-zinc-400 italic">
                        Created by someone who was a former aspirant for someone who is preparing.
                    </p>
                </div>
            </footer>

        </div>
    )
}