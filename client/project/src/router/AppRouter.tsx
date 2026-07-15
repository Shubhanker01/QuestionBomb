import Home from "@/pages/Home/Home"
import Signup from "@/pages/Auth/Signup"
import MainAppHome from "@/pages/App/Home Page/Home"
import { Routes, Route } from "react-router-dom"
import MainApp from "@/pages/App/MainApp"
import ScienceSection from "@/pages/App/Science Section/ScienceSection"
import GeographySection from "@/pages/App/Geography Section/GeographySection"
import MockInterface from "@/pages/App/MockTest Interface/MockInterface"

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/main-app/:userId" element={<MainApp />}>
                <Route index element={<MainAppHome />} />
                <Route path="science" element={<ScienceSection />} />
                <Route path="geography" element={<GeographySection />} />
            </Route>
            <Route path="/mock/:subject/:mockId/user/:userId" element={<MockInterface />}></Route>
        </Routes>
    )
}

export default AppRouter