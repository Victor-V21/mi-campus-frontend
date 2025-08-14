import { BookOpen, MessageSquare, Clipboard, FileText } from "lucide-react";
import { Link } from "react-router"; // Corregido: react-router-dom en lugar de react-router

export const HomePage = () => {
  const servicios = [
    {
      title: "Oferta académica",
      description: "Realiza el seguimiento de tu plan de estudios",
      icon: <Clipboard size={20} className="text-unah-blue" />,
      to: "https://www.unah.edu.hn/oferta-academica"
    },
    {
      title: "Registro de Academia",
      description: "Accede a tus registros académicos",
      icon: <BookOpen size={20} className="text-unah-blue" />,
      to: "https://registro.unah.edu.hn/"
    },
    {
      title: "Gestión y Registro de Artículo 140",
      description: "Solicita tu certificación de eventos académicos y el registro de artículo 140",
      icon: <FileText size={20} className="text-unah-blue" />,
      to: "https://articulo140-voae.unah.edu.hn/landing"
    },
    {
      title: "Soporte Correo UNAH",
      description: "Consulta los servicios de soporte para tu correo institucional",
      icon: <MessageSquare size={20} className="text-unah-blue" />,
      to: "https://cauti.unah.edu.hn/servicios/correo-y-colaboracion/correo-electronico/"
    }
  ];

  return (
    <div className="home-page">
      {/* Barra superior */}
      <header className="top-bar">
        <div className="logo-container">
          <img
            src="/src/presentation/imgs/Escudo_de_la_UNAH.png" // Asegúrate de tener esta imagen en tu carpeta public
            alt="Logo UNAH"
            className="logo"
          />
          <h1 className="app-title">Mi Campus</h1>
        </div>
        <Link
          to="/auth/login"
          className="login-btn"
        >
          Iniciar Sesión
        </Link>
      </header>

      {/* Sección hero */}
      <section className="hero-section">
        <h2 className="hero-title">¿Para qué está diseñada esta plataforma?</h2>
        <p className="hero-description">
          Mi Campus es una red social educativa diseñada para facilitar el acceso a tus recursos académicos. 
          Desde el seguimiento de tu plan de estudios hasta la interacción con otros estudiantes y docentes, 
          ¡aquí encuentras todo lo que necesitas!
        </p>
      </section>

      {/* Sección de servicios */}
      <section className="services-section">
        <h2 className="section-title">Servicios Académicos</h2>
        <div className="services-grid">
          {servicios.map((servicio, index) => (
            <Link
              to={servicio.to}
              key={index}
              className="service-card"
            >
              <div className="card-icon">
                {servicio.icon}
              </div>
              <h3 className="card-title">{servicio.title}</h3>
              <p className="card-description">{servicio.description}</p>
              <span className="card-button">
                Acceder →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};