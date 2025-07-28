import { Mail, Lock, UserPlus } from "lucide-react";
import { Link } from "react-router";

export const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="login-box">
        {/* Encabezado */}
        <div className="login-header">
        <h1>Mi Campus UNAH</h1>
        <p>Ingresa a tu cuenta estudiantil</p>
        </div>

        <div className="login-body">
        <h2 className="login-title">Iniciar Sesión</h2>

          <form className="login-form">
            {/* Email */}
            <div className="form-group relative">
             <div>
                {<Mail size={18} className="h-5 w-5 text-unah-blue " />} 
                 <label htmlFor="email">Correo institucional
              </label>
             </div>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="tu.correo@unah.hn"
              />
            </div>

            {/* Contraseña */}
            <div className="form-group relative">
                {<Lock size={18} className="h-5 w-5 text-unah-blue " />}
              <label  htmlFor="password">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
              />
            </div>

            {/* ¿Olvidaste tu contraseña? */}
            <Link to="/recuperar-contrasena" className="forgot-link">
              ¿Olvidaste tu contraseña?
            </Link>

            {/* Botón Ingresar */}
            <button type="submit" className="login-btn">
              Ingresar
            </button>

            {/* Separador */}
            <div className="divider">o</div>

            {/* Botón Registro */}
            <Link to="/registro" className="register-btn">
              <UserPlus className="mr-2 h-4 w-4" />
              Crear una cuenta nueva
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
