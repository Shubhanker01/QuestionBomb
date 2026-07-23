import { lazy, Suspense } from "react"
import Home from "@/pages/Home/Home"
import Signup from "@/pages/Auth/Signup"
import MainAppHome from "@/pages/App/Home Page/Home"
import { Routes, Route } from "react-router-dom"
const MainApp = lazy(() => import('@/pages/App/MainApp'))
const TestScore = lazy(() => import('@/pages/App/Test Score/TestScore'))
const MockInterface = lazy(() => import('@/pages/App/MockTest Interface/MockInterface'))
const ScienceSection = lazy(() => import('@/pages/App/Science Section/ScienceSection'))
const GeographySection = lazy(() => import('@/pages/App/Geography Section/GeographySection'))
const Payment = lazy(() => import("@/pages/App/Payment/Payment"))
const TestReview = lazy(() => import("@/pages/App/Test Review/TestReview"))

import { Loader2 } from "lucide-react"

function AppRouter() {
    return (
        <>
            <Suspense
                fallback={
                    <div className="h-screen w-screen flex items-center justify-center bg-background">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                }
            ></Suspense>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/main-app/:userId" element={<MainApp />}>
                    {/* <Route index element={<MainAppHome />} /> */}
                    <Route index path="science" element={<ScienceSection />} />
                    <Route path="geography" element={<GeographySection />} />
                </Route>

                <Route path="/mock/:subject/:mockId/user/:userId" element={<MockInterface />}></Route>
                <Route path="/test-score/mock/:mockId/user/:userId" element={<TestScore />}></Route>
                <Route path="/payment" element={<Payment />}></Route>
                <Route path="/review/:subject/:mockId/user/:userId" element={<TestReview />}></Route>
            </Routes>
        </>

    )
}

export default AppRouter