import { Route, Routes, Navigate } from "react-router" //Navigate lo colocamos para que redirija a la ruta principal si el usuario ya está autenticado
import { Navbar } from "../presentation/components/layout/Navbar"
import { HomePage } from "../presentation/pages/home/HomePage"
import { PrivateRoute } from "../presentation/components/shared/PrivateRoute"
import { useAuthStore } from "../presentation/stores/authStore"
import { ProfilePage } from "../presentation/pages/profile/ProfileHome"
import { LoginPage } from "../presentation/pages/security/auth/LoginPage"
import { EventoPage } from "../presentation/pages/eventos/EventosPage"
import { MapPage } from "../presentation/pages/Map/MapPage"
import { RegisterPage } from "../presentation/pages/security/auth/RegisterPage";
import { IndexPage } from "../presentation/pages/home/IndexPage"
import { GeminiChatbot } from "../presentation/pages/Chatbot/ChatBotPage"
import { VerifyEmailPage } from "../presentation/pages/security/auth/VerifyImagePage"

//Private Route es un componente que protege las rutas que requieren autenticación tiene fallos por eso está comentado
export const AppRouter = () => {
    const { authenticated } = useAuthStore();
    return (
        <div className="min-h-screen bg-gray-100">
            <Routes>
                {/* Ruta principal que redirige a la página de inicio */}
                <Route path="/" element={<HomePage />} />

                {/* Ruta protegida que requiere autenticación */}
                <Route element={<PrivateRoute />}>
                    <Route element={<Navbar />}>
                        <Route path="/index" element={<IndexPage />} />
                        <Route path="/chatbot" element={<GeminiChatbot />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/eventos" element={<EventoPage />} />
                        <Route path="/publication" element={<MapPage />} />
                        <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
                    </Route>
                    {/*Auth de login y registro */}
                </Route>
                <Route path="/auth">
                    <Route path="login" element={authenticated ? <Navigate to="/index" replace /> : <LoginPage />} />
                    <Route path="register" element={authenticated ? <Navigate to="/index" replace /> : <RegisterPage />} />
                </Route>
            </Routes>
        </div>
    )
}

