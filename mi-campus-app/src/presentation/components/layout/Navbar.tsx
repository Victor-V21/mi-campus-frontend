import { Globe, Home, Menu, UserCircle,  MessageCircleIcon, NotebookIcon, ChevronLeft, ChevronRight, LogOut,  Box } from "lucide-react";
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
                        <MobileNavLink to="/publication" active={isActive("/publication")} icon={<Box size={18} />} text="Publicaciones" />
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
            <div className="hidden md:flex min-h-screen flex-col">
                <div className="flex flex-1 overflow-hidden">
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
                                className="flex items-center px-3 py-2 text-sm font-LexendDeca-Medium text-decoration-none text-blue-100 hover:bg-blue-500"
                            >
                                {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                            </button>
                        </div>

                        {/* Navegación principal */}
                        <nav className="flex-1 overflow-y-auto py-2">
                            <NavLink 
                                to="/index" 
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
                                to="/publicaciones" 
                                active={isActive("/publication")} 
                                text={isCollapsed ? "" : "Publicaciones"} 
                                icon={<Box size={20} />}
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
                                className="flex items-center px-3 py-2 text-sm font-LexendDeca-Medium text-decoration-none text-blue-100 hover:bg-blue-500"  
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

                {/* Pie de página para desktop */}
                <footer className="bg-blue-800 text-white  flex flex-col md:flex-row justify-between items-center text-sm ">
                    <div className="flex items-center  md:mb-0">
                        <span>© {new Date().getFullYear()} Universidad Nacional Autónoma de Honduras</span>
                    </div>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-yellow-300 transition">Términos</a>
                        <a href="#" className="hover:text-yellow-300 transition">Privacidad</a>
                        <a href="#" className="hover:text-yellow-300 transition">Contacto</a>
                    </div>
                </footer>
            </div>

            {/* Contenido para móviles */}
            <div className="md:hidden bg-gray-100 min-h-screen flex flex-col">
                <div className="p-4 pt-20 flex-1">
                    <Outlet />
                </div>
                
                {/* Pie de página para móvil */}
                <footer className="bg-blue-800 text-white py-3 px-4 text-center text-sm">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center mb-2">
                            <span>© {new Date().getFullYear()} UNAH</span>
                        </div>
                        <div className="flex justify-center space-x-3 ">
                            <a href="#" className="hover:text-yellow-300 transition">Términos</a>
                            <a href="#" className="hover:text-yellow-300 transition">Privacidad</a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};