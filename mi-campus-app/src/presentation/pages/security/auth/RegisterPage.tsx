import { useState, useEffect } from "react";
import { User, Mail, Lock, Calendar, BookOpen, ChevronDown } from "lucide-react";
import { Link } from "react-router";
import { useRegister } from "../../../hooks/useRegister";
import { useNavigate } from "react-router"; // Import useNavigate
import { useCampuses } from "../../../hooks/useCampuses";
import type { RegisterModel } from "../../../../core/models/register.model"; // Corrected path

export const RegisterPage = () => {
  const [formData, setFormData] = useState<Omit<RegisterModel, "avatarUrl"> & { confirmPassword: string }>({
    firstName: "",
    lastName: "",
    email: "",
    noAccount: "",
    birthDay: "",
    campusId: "",
    password: "",
    confirmPassword: ""
  });

  const { registerResponse } = useRegister();
  const navigate = useNavigate(); // Initialize useNavigate
  const { campusesPaginationQuery } = useCampuses();
  const [errorMessage, setErrorMessage] = useState("");
  const [campuses, setCampuses] = useState<Array<{ id: string, name: string }>>([]);

  // Cargar los campuses cuando el componente se monta
  useEffect(() => {
    if (campusesPaginationQuery.data?.status && campusesPaginationQuery.data.data) {
      setCampuses(
        campusesPaginationQuery.data.data.items.map(campus => ({
          id: campus.id,
          name: campus.name
        }))
      );
    }
  }, [campusesPaginationQuery.data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    if (!formData.email.endsWith("@unah.hn")) {
      setErrorMessage("Debes usar un correo institucional de la UNAH");
      return;
    }

    if (!formData.campusId) {
      setErrorMessage("Debes seleccionar un campus");
      return;
    }

    try {
      // Preparamos los datos para el registro
      const registerData: RegisterModel = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        noAccount: formData.noAccount,
        birthDay: formData.birthDay,
        campusId: formData.campusId,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        avatarUrl: "" // Valor por defecto
      };

      await registerResponse.mutateAsync(registerData, {
        onSuccess: (result) => {
          if (result.status) {
            navigate('/auth/verify-email', {
              state: { email: formData.email },
              replace: true
            });
          } else {
            setErrorMessage(result.message || "Error en el registro");
          }
        },
        onError: (error) => {
          setErrorMessage("Error en el registro. Intenta nuevamente.");
          console.error(error);
        }
      });
    } catch (error) {
      setErrorMessage("Ocurrió un error durante el registro");
      console.error(error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-header">
          <h1>Mi Campus UNAH</h1>
          <p>Crea tu cuenta estudiantil</p>
        </div>

        <div className="login-body">
          <h2 className="login-title">Registro de Estudiante</h2>

          {errorMessage && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {errorMessage}
            </div>
          )}

          {campusesPaginationQuery.isLoading && (
            <div className="mb-4 p-2 bg-blue-100 text-blue-700 rounded">
              Cargando campus universitarios...
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit}>
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
                  value={formData.firstName}
                  onChange={handleChange}
                  required
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
                  value={formData.lastName}
                  onChange={handleChange}
                  required
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
                value={formData.email}
                onChange={handleChange}
                required
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
                value={formData.noAccount}
                onChange={handleChange}
                required
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
                  value={formData.birthDay || ''}
                  onChange={handleChange}
                  required
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
                  value={formData.campusId}
                  onChange={handleChange}
                  required
                  disabled={campusesPaginationQuery.isLoading}
                >
                  <option value="">Selecciona un campus</option>
                  {campuses.map(campus => (
                    <option key={campus.id} value={campus.id}>
                      {campus.name}
                    </option>
                  ))}
                </select>
              </div>
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
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
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
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={8}
                />
              </div>
            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={registerResponse.isPending || campusesPaginationQuery.isLoading}
            >
              {registerResponse.isPending ? "Registrando..." : "Registrarse"}
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