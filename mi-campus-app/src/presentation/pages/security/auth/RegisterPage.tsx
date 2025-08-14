import { User, Mail, Lock, Calendar, BookOpen, Image, ChevronDown } from "lucide-react";
import { Link } from "react-router";

export const RegisterPage = () => {
  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-header">
          <h1>Mi Campus UNAH</h1>
          <p>Crea tu cuenta estudiantil</p>
        </div>

        <div className="login-body">
          <h2 className="login-title">Registro de Estudiante</h2>

          <form className="login-form">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <div className="flex items-center gap-2">
                  <User size={18} className="h-5 w-5 text-unah-blue" />
                  <label htmlFor="firstName">Nombres</label>
                </div>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Tus nombres"
                  className="pl-10"
                />
              </div>
              
              <div className="form-group">
                <div className="flex items-center gap-2">
                  <User size={18} className="h-5 w-5 text-unah-blue" />
                  <label htmlFor="lastName">Apellidos</label>
                </div>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Tus apellidos"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="flex items-center gap-2">
                <Mail size={18} className="h-5 w-5 text-unah-blue" />
                <label htmlFor="email">Correo institucional</label>
              </div>
              <input
                id="email"
                type="email"
                placeholder="tu.correo@unah.hn"
                className="pl-10"
              />
            </div>


            <div className="form-group">
              <div className="flex items-center gap-2">
                <BookOpen size={18} className="h-5 w-5 text-unah-blue" />
                <label htmlFor="noAccount">Número de cuenta</label>
              </div>
              <input
                id="noAccount"
                type="text"
                placeholder="20181000000"
                className="pl-10"
              />
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="h-5 w-5 text-unah-blue" />
                  <label htmlFor="birthDay">Fecha de nacimiento</label>
                </div>
                <input
                  id="birthDay"
                  type="date"
                  className="pl-10"
                />
              </div>
              
              <div className="form-group">
                <div className="flex items-center gap-2">
                  <ChevronDown size={18} className="h-5 w-5 text-unah-blue" />
                  <label htmlFor="campusId">Campus Universitario</label>
                </div>
                <select
                  id="campusId"
                  className="pl-10"
                >
                  <option value="">Selecciona un campus</option>
                  <option value="1">CU Tegucigalpa</option>
                  <option value="2">CU San Pedro Sula</option>
                </select>
              </div>
            </div>


            <div className="form-group">
              <div className="flex items-center gap-2">
                <Image size={18} className="h-5 w-5 text-unah-blue" />
                <label htmlFor="avatarUrl">Foto de perfil (URL)</label>
              </div>
              <input
                id="avatarUrl"
                type="text"
                placeholder="https://ejemplo.com/foto.jpg"
                className="pl-10"
              />
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <div className="flex items-center gap-2">
                  <Lock size={18} className="h-5 w-5 text-unah-blue" />
                  <label htmlFor="password">Contraseña</label>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                />
              </div>
              
              <div className="form-group">
                <div className="flex items-center gap-2">
                  <Lock size={18} className="h-5 w-5 text-unah-blue" />
                  <label htmlFor="confirmPassword">Confirmar</label>
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                />
              </div>
            </div>
            <button
              type="submit"
              className="login-btn"
            >
              Registrarse
            </button>

            <div className="divider">¿Ya tienes cuenta?</div>
            <Link to="/auth/login" className="register-btn">
              Iniciar sesión
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};