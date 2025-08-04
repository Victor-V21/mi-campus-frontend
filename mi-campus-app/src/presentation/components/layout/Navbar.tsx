import { Globe, Home, Menu, UserCircle, MapPin, MessageCircleIcon, NotebookIcon, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { NavLink } from "../shared/NavLink";
import { useState } from "react";
import { MobileNavLink } from "../shared/MobileNavLink";
import { Outlet, useLocation } from "react-router";
import { useAuthStore } from "../../stores/authStore";

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();
    const { logout } = useAuthStore();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const isActive = (path: string) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <>
            {/* Navbar para pantallas pequeñas */}
            <nav className="md:hidden bg-blue-800 text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between h-16">
                        {/* Logo y título */}
                        <div className="flex items-center">
                            <span className="font-LexendDeca-Bold text-xl">
                                Mi Campus
                            </span>
                        </div>

                        {/* Botón de menú móvil */}
                        <div className="flex items-center">
                            <button
                                onClick={toggleMenu}
                                className="text-white hover:text-blue-200 focus:outline-none"
                            >
                                <Menu size={24} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Menú móvil desplegable */}
                {isMenuOpen && (
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <MobileNavLink to="/" active={isActive("/")} icon={<Home size={18} />} text="Inicio" />
                        <MobileNavLink to="/eventos" active={isActive("/eventos")} icon={<Globe size={18} />} text="Eventos" />
                        <MobileNavLink to="/mapa" active={isActive("/mapa")} icon={<MapPin size={18} />} text="Mapa" />
                        <MobileNavLink to="/chatbot" active={isActive("/chatbot")} icon={<MessageCircleIcon size={18} />} text="ChatBot" />
                        <MobileNavLink to="/notification" active={isActive("/notification")} icon={<NotebookIcon size={18} />} text="Notificaciones" />
                        <MobileNavLink to="/perfil" active={isActive("/perfil")} icon={<UserCircle size={18} />} text="Perfil" />
                        <button
                            type="button" 
                            onClick={logout}
                            className="w-full text-left flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700">
                            <LogOut size={18}/>
                            <span className="ml-2">Salir</span>
                        </button>
                    </div>
                )}
            </nav>

            {/* Layout para pantallas grandes */}
            <div className="hidden md:flex min-h-screen">
                <div className={`bg-blue-800 text-white ${isCollapsed ? 'w-16' : 'w-56'} flex flex-col transition-all duration-300`}>
                    {/* Logo y botón de colapso */}
                    <div className="flex items-center justify-between p-4 border-b border-blue-700 h-16">
                        {!isCollapsed && (
                            <span className="font-LexendDeca-Bold text-lg whitespace-nowrap overflow-hidden">
                                Mi Campus
                            </span>
                        )}
                        <button
                            onClick={toggleCollapse}
                            className="text-white hover:text-blue-200 focus:outline-none p-1 rounded-full hover:bg-blue-700"
                        >
                            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                        </button>
                    </div>

                    {/* Navegación principal */}
                    <nav className="flex-1 overflow-y-auto py-2">
                        <NavLink 
                            to="/" 
                            active={isActive("/")} 
                            text={isCollapsed ? "" : "Inicio"} 
                            icon={<Home size={20} />}
                        />
                        <NavLink 
                            to="/eventos" 
                            active={isActive("/eventos")} 
                            text={isCollapsed ? "" : "Eventos"} 
                            icon={<Globe size={20} />}
                        />
                        <NavLink 
                            to="/mapa" 
                            active={isActive("/mapa")} 
                            text={isCollapsed ? "" : "Mapa"} 
                            icon={<MapPin size={20} />}
                        />
                        <NavLink 
                            to="/notification" 
                            active={isActive("/notification")} 
                            text={isCollapsed ? "" : "Notificaciones"} 
                            icon={<NotebookIcon size={20} />}
                        />
                        <NavLink 
                            to="/profile" 
                            active={isActive("/profile")} 
                            text={isCollapsed ? "" : "Perfil"} 
                            icon={<UserCircle size={20} />}
                        />
                        <button
                    type="button"
                    onClick={logout}
                    className="flex items-center w-full gap-2 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
                    >
                    <LogOut size={20} />
                    {!isCollapsed && <span>Salir</span>}
                </button>
                    </nav>
                </div>
                {/* Contenido principal */}
                <div className="flex-1 bg-gray-100 overflow-y-auto">
                    <div className="p-4">
                        <Outlet />
                    </div>
                </div>
            </div>

            {/* Contenido para móviles (fuera del navbar) */}
            <div className="md:hidden bg-gray-100 min-h-screen">
                <div className="p-4 pt-20"> {/* Ajuste de padding para el navbar móvil */}
                    <Outlet />
                </div>
            </div>
        </>
    );
};