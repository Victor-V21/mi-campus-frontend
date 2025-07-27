import { Globe, Home, Menu, Users,  UserCircle, MapPin } from "lucide-react";
import { NavLink } from "../shared/NavLink";
import { useState } from "react";
import { MobileNavLink } from "../shared/MobileNavLink";
import { Outlet, useLocation } from "react-router";

export const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const isActive = (path: string) => {
        if (path === '/') {
            return location.pathname === '/'
        }

        return location.pathname.startsWith(path);
    }


    return (
        <>
            <nav className="navbar-unah bg-blue-800 text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between h-16">
                        {/* Logo y titulo */}
                        <div className="flex items-center">
                            <span className="font-LexendDeca-Bold text-xl">
                                Mi Campus Informativo
                            </span>
                        </div>

                        {/* Navegación en escritorio */}
                        <div className="hidden md:flex">
                            <NavLink to="/" active={isActive("/")} text="Inicio" icon={<Home size={18} />} />
                            <NavLink to="/eventos" active={isActive("/eventos")} text="Eventos" icon={<Globe size={18} />} />
                            <NavLink to="/mapa" active={isActive("/Mapa")} text="Mapa" icon={<MapPin size={18} />} />
                            <NavLink to="/perfil" active={isActive("/perfil")} text="Perfil" icon={<UserCircle size={18} />} />
                            <button className="login-btn font-LexendDeca-Bold">
                                Iniciar Sesión
                                </button>

                        </div>
                        {/* Botón de menu móvil */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={toggleMenu}
                                className="text-white hover:text-blue-200 focus:outline-none"
                            >
                                <Menu size={24} />
                            </button>

                        </div>

                    </div>
                </div>

                {/* Menu móvil */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <MobileNavLink to="/" active={isActive("/")} icon={<Home size={18} />} text="Inicio" />
                            <MobileNavLink to="/eventos" active={isActive("/eventos")} icon={<Globe size={18} />} text="Eventos" />
                            <MobileNavLink to="/mapa" active={isActive("/mapa")} icon={<Users size={18} />} text="Mapa" />
                            <MobileNavLink to="/perfil" active={isActive("/perfil")} icon={<UserCircle size={18} />} text="Perfil" />
                            <button className="login-btn font-LexendDeca-Bold">
                                Iniciar Sesión
                                </button>
                        </div>
                    </div>
                )}

            </nav>

            {/* Principal content */}
            <div className="min-h-screen bg-gray-100 mx-auto p-4 mt-4">
                <Outlet />
            </div>

        </>

    );
}