import { Mail, Lock, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { FormikProvider, useFormik } from "formik";
import { useEffect } from "react";
import { loginInitialValues, loginValidationSchema } from "../../../../infrastructure/validations/login.validation";
import { useAuthStore } from "../../../stores/authStore";

export const LoginPage = () => {
  const { errorMessage, login, authenticated } = useAuthStore();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginValidationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (formValues) => {
      await login(formValues);
    },
  });

  useEffect(() => {
    if (authenticated) {
      navigate("/");
    }
  }, [authenticated]);

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

          {typeof errorMessage === 'string' && errorMessage.trim().length > 0 && (
            <div className="bg-red-100 border border-red-400 px-4 py-3 rounded relative">
              <span>{errorMessage}</span>
            </div>
          )}

          <FormikProvider value={formik}>
            <form className="login-form" onSubmit={formik.handleSubmit}>
              {/* Email */}
              <div className="form-group relative">
                <div className="flex items-center gap-2">
                  <Mail size={18} className="h-5 w-5 text-unah-blue" />
                  <label htmlFor="email">Correo institucional</label>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu.correo@unah.hn"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              {/* Contraseña */}
              <div className="form-group relative">
                <div className="flex items-center gap-2">
                  <Lock size={18} className="h-5 w-5 text-unah-blue" />
                  <label htmlFor="password">Contraseña</label>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              {/* ¿Olvidaste tu contraseña? */}
              <Link to="/recuperar-contrasena" className="forgot-link">
                ¿Olvidaste tu contraseña?
              </Link>

              {/* Botón Ingresar */}
              <button type="submit" className="login-btn" disabled={formik.isSubmitting}>
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
          </FormikProvider>
        </div>
      </div>
    </div>
  );
};
