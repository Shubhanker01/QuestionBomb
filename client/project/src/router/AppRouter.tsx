import Home from "@/pages/Home/Home"
import Signup from "@/pages/Auth/Signup"

import { Routes, Route } from "react-router-dom"

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    )
}

export default AppRouter