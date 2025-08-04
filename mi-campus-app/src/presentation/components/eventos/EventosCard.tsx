// src/pages/events/EventsPage.tsx
import { ArrowRight, CalendarDays, Clock, MapPin, Search } from "lucide-react";
import { Title } from "../../components/shared/Title";
import { useState } from "react";

export const EventsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const events = [
    {
      id: 1,
      title: "Charla de Inteligencia Artificial",
      date: "2023-11-14",
      time: "14:00 - 16:00",
      location: "Edificio C1, Aula 302",
      description: "Conoce las últimas tendencias en IA aplicada a la educación universitaria",
      category: "Tecnología"
    },
    {
      id: 2,
      title: "Taller de Investigación Científica",
      date: "2023-11-17",
      time: "09:00 - 12:00",
      location: "Biblioteca Central, Sala 4",
      description: "Aprende metodologías de investigación para tus proyectos académicos",
      category: "Académico"
    },
    {
      id: 3,
      title: "Feria de Empleo UNAH",
      date: "2023-11-19",
      time: "10:00 - 16:00",
      location: "Plaza Central",
      description: "Conoce oportunidades laborales con las mejores empresas del país",
      category: "Empleo"
    }
  ];

  return (
    <div className="page-container">
      {/* Encabezado */}
      <div className="mb-8">
        <Title 
          text="Eventos Académicos" 
          className="section-title"
        />
        
        {/* Barra de búsqueda y filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar eventos..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-unah-blue focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-lg font-LexendDeca-Medium ${
                activeFilter === 'all' 
                  ? 'bg-unah-blue text-white' 
                  : 'border border-unah-blue text-unah-blue hover:bg-blue-50'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setActiveFilter('week')}
              className={`px-4 py-2 rounded-lg font-LexendDeca-Medium ${
                activeFilter === 'week' 
                  ? 'bg-unah-blue text-white' 
                  : 'border border-unah-blue text-unah-blue hover:bg-blue-50'
              }`}
            >
              Esta semana
            </button>
            <button
              onClick={() => setActiveFilter('career')}
              className={`px-4 py-2 rounded-lg font-LexendDeca-Medium ${
                activeFilter === 'career' 
                  ? 'bg-unah-blue text-white' 
                  : 'border border-unah-blue text-unah-blue hover:bg-blue-50'
              }`}
            >
              Por carrera
            </button>
          </div>
        </div>
      </div>

      {/* Listado de eventos */}
      <div className="space-y-6">
        {events.map((event) => (
          <div 
            key={event.id} 
            className="dashboard-card hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              {/* Encabezado del evento */}
              <div className="flex justify-between items-start mb-4">
                <h3 className="card-title">{event.title}</h3>
                <span className="bg-unah-blue text-white text-xs font-LexendDeca-Medium px-2 py-1 rounded-lg">
                  {event.category}
                </span>
              </div>
              
              <p className="card-description mb-4">{event.description}</p>
              
              {/* Detalles del evento */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <CalendarDays className="text-unah-blue mr-2" size={18} />
                  <div>
                    <p className="text-sm font-LexendDeca-Medium text-gray-600">Fecha</p>
                    <p>
                      {new Date(event.date).toLocaleDateString('es-ES', { 
                        weekday: 'long', 
                        day: 'numeric', 
                        month: 'long' 
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="text-unah-blue mr-2" size={18} />
                  <div>
                    <p className="text-sm font-LexendDeca-Medium text-gray-600">Horario</p>
                    <p>{event.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="text-unah-blue mr-2" size={18} />
                  <div>
                    <p className="text-sm font-LexendDeca-Medium text-gray-600">Ubicación</p>
                    <p>{event.location}</p>
                  </div>
                </div>
              </div>
              
              {/* Botón de acción */}
              <div className="mt-6">
                <button className="card-button flex items-center justify-center">
                  Ver detalles
                  <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};