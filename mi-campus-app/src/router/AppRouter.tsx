import { Route, Routes, Navigate } from "react-router" //Navigate lo colocamos para que redirija a la ruta principal si el usuario ya está autenticado
import { Navbar } from "../presentation/components/layout/Navbar"
import { HomePage } from "../presentation/pages/home/HomePage"
import { PrivateRoute } from "../presentation/components/shared/PrivateRoute"
import { useAuthStore } from "../presentation/stores/authStore"
import { ProfilePage } from "../presentation/pages/profile/ProfileHome"
import { LoginPage } from "../presentation/pages/security/auth/LoginPage"
import { EventoPage } from "../presentation/pages/eventos/EventosPage"
import { MapPage } from "../presentation/pages/Map/MapPage"

export const AppRouter = () => {
    const {authenticated } = useAuthStore();
    return (
        <div className="min-h-screen bg-gray-100">
            <Routes>
                <Route element={<PrivateRoute/>}>
                    <Route element={<Navbar />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/eventos" element={<EventoPage />} />
                    <Route path="/mapa" element={<MapPage/>} />
                </Route>
                </Route>
                <Route path="/auth">
                    <Route path="login" element={authenticated ? <Navigate to="/" replace/> : <LoginPage />} />
                </Route>
            </Routes>
        </div>
    )
}

