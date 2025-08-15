import { useState } from "react";
import { BookOpen, FileText } from "lucide-react";
import { Title } from "../../components/shared/Title"; // Asegúrate de que este componente exista
import { DashboardCard } from "../../components/home/DashboardCard"; // Asegúrate de que este componente exista
import { ProfileCard } from "../../components/profile/ProfileCard"; // Asegúrate de que este componente exista
import { useUserProfile } from "../../hooks/useUsers"; // Asegúrate de que la ruta esté correcta

export const ProfilePage = () => {
  // Obtenemos el email desde localStorage
  const email = localStorage.getItem('email'); // Este es un string

  const { userGetOneQuery } = useUserProfile(email || ''); // Pasamos el email o un valor vacío si no existe

  const [activeTab, setActiveTab] = useState("academico");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // Mostrar mientras se carga
  if (userGetOneQuery.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Cargando...</div>
      </div>
    );
  }

  // Mostrar error en caso de que ocurra
  if (userGetOneQuery.isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-600">Error al cargar el perfil</div>
      </div>
    );
  }

  // Si la respuesta tiene status: false
  if (userGetOneQuery.data?.status === false) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-600">{userGetOneQuery.data.message}</div>
      </div>
    );
  }

  // Datos del usuario
  const user = userGetOneQuery.data?.data;

  return (
    <div className="profile-page">
      <Title text="Mi Perfil" />

      <div className="profile-grid">
        {/* Tarjeta del perfil del usuario */}
        <ProfileCard
          name={user?.fullName || "Nombre del Usuario"}
          email={user?.email || "Email no disponible"}
          carrera={user?.campusId || "Campus no disponible"}
          añoIngreso={2021} // Aquí puedes agregar el año de ingreso si lo tienes
          avatarUrl={user?.avatarUrl || "/default-avatar.png"} // Usamos avatarUrl o uno por defecto
        />

        {/* Tarjetas de datos académicos / otros */}
        <div className="tab-container">
          <div className="tab-buttons">
            <button
              className={activeTab === "academico" ? "active" : ""}
              onClick={() => handleTabChange("academico")}
            >
              <BookOpen className="icon" /> Académico
            </button>
            <button
              className={activeTab === "personal" ? "active" : ""}
              onClick={() => handleTabChange("personal")}
            >
              <FileText className="icon" /> Personal
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "academico" ? (
              <DashboardCard
                title="Historial Académico"
                description="Consulta tus clases inscritas, historial de notas y promedios generales."
              />
            ) : (
              <DashboardCard
                title="Datos Personales"
                description="Aquí puedes modificar tu información personal y dirección."
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
