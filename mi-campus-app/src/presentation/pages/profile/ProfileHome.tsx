import { useState } from "react";
import { BookOpen, FileText } from "lucide-react";
import { Title } from "../../components/shared/Title";
import { DashboardCard } from "../../components/home/DashboardCard";
import { ProfileCard } from "../../components/profile/ProfileCard";

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("academico");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="profile-page">
      <Title text="Mi Perfil" />

      <div className="profile-grid">
        {/* Tarjeta del perfil del usuario */}
        <ProfileCard
          name="Juan Pérez"
          email="juanperz@unah.hn"
          carrera="Ingeniería en Sistemas"
          añoIngreso={2021}
          avatarUrl="https://b2472105.smushcdn.com/2472105/wp-content/uploads/2023/03/Fotografia-de-Retrato-819x1024.jpg?lossy=1&strip=1&webp=1"
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
