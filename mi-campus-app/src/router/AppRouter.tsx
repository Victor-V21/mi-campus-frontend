import { Route, Routes } from "react-router"
import { Navbar } from "../presentation/components/layout/Navbar"
import { HomePage } from "../presentation/pages/home/HomePage"
import { LoginPage } from "../presentation/pages/security/auth/LoginPage"

export const AppRouter = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Routes>
                <Route element={<Navbar />}>
                    <Route path="/" element={<HomePage />} />
                </Route>
                    <Route path="/auth">
                    <Route path="login" element={ <LoginPage />} />
                </Route>
            </Routes>
        </div>
    )
}