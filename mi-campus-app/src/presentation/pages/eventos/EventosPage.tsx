import { CalendarDays, Clock, MapPin, ArrowRight } from "lucide-react";
import { Title } from "../../components/shared/Title";
import { useState } from "react";

export const EventoPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const events = [
    {
      id: 1,
      title: "Charla de Inteligencia Artificial",
      date: "2023-11-14",
      time: "14:00 - 16:00",
      location: "Edificio C1, Aula 302",
      description:
        "Conoce las últimas tendencias en IA aplicada a la educación universitaria",
      category: "TECNOLOGÍA",
    },
    {
      id: 2,
      title: "Taller de Investigación Científica",
      date: "2023-11-17",
      time: "09:00 - 12:00",
      location: "Biblioteca Central, Sala 4",
      description:
        "Aprende metodologías de investigación para tus proyectos académicos",
      category: "ACADÉMICO",
    },
    {
      id: 3,
      title: "Feria de Empleo UNAH",
      date: "2023-11-19",
      time: "10:00 - 16:00",
      location: "Plaza Central",
      description:
        "Conoce oportunidades laborales con las mejores empresas del país",
      category: "EMPLEO",
    },
  ];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="page-container">
      <Title text="Eventos Académicos" className="mb-8" />

      {/* Buscador + filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Buscar eventos..."
            className="event-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="event-filter-buttons flex flex-wrap gap-2">
          <button
            onClick={() => setActiveFilter("all")}
            className={activeFilter === "all" ? "active" : ""}
          >
            Todos
          </button>
          <button
            onClick={() => setActiveFilter("week")}
            className={activeFilter === "week" ? "active" : ""}
          >
            Esta semana
          </button>
          <button
            onClick={() => setActiveFilter("career")}
            className={activeFilter === "career" ? "active" : ""}
          >
            Por carrera
          </button>
        </div>
      </div>

      {/* Lista de eventos */}
      <div className="space-y-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="event-card">
            <div className="mb-4 flex justify-between items-start">
              <h3 className="event-title">{event.title}</h3>
              <span className="event-category">{event.category}</span>
            </div>

            <p className="event-description">{event.description}</p>

            <div className="event-info">
              <div className="event-icon">
                <CalendarDays size={18} />
                <div>
                  <p className="event-info-title">Fecha</p>
                  <p>
                    {new Date(event.date).toLocaleDateString("es-ES", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
              </div>

              <div className="event-icon">
                <Clock size={18} />
                <div>
                  <p className="event-info-title">Horario</p>
                  <p>{event.time}</p>
                </div>
              </div>

              <div className="event-icon">
                <MapPin size={18} />
                <div>
                  <p className="event-info-title">Ubicación</p>
                  <p>{event.location}</p>
                </div>
              </div>
            </div>

            <button className="event-details-button flex items-center mt-6">
              Ver detalles
              <ArrowRight className="ml-2" size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
