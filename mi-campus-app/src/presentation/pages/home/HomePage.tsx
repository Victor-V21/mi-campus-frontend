
import { BookOpen,  MessageSquare, Clipboard, FileText } from "lucide-react";
import { Title } from "../../components/shared/Title";
import { DashboardCard } from "../../components/home/DashboardCard";
import { useStatistics } from "../../hooks/useStatistics";
import { Loader } from "../../components/shared/Loader";


export const HomePage = () => {
    
const { data, isLoading } = useStatistics();

if(isLoading) {
    return <Loader />
}

console.log(data);
const servicios = [
    {
    title: "Plan de Estudios",
    description: "Realiza el seguimiento de tu plan de estudios",
    icon: <Clipboard size={20} />,
    to: "/plan-estudios"
    },
    {
    title: "Material de Estudio",
    description: "Accede a los materiales de estudio y recursos académicos",
    icon: <BookOpen size={20} />,
    to: "/material-estudio"
    },
    {
    title: "Certificación de Eventos",
    description: "Solicita tu certificación de eventos académicos",
    icon: <FileText size={20} />,
    to: "/certificacion-eventos"
    },
    {
    title: "Chatbot de Asistencia",
    description: "Consulta dudas académicas con nuestro chatbot",
    icon: <MessageSquare size={20} />,
    to: "/chatbot"
    }
];

return (
    <div className="container mx-auto px-4 py-8">
      {/* Sección de Servicios Académicos */}
    <section className="mb-12">
        <Title 
        text="Servicios Académicos" 
        className="text-3xl font-bold text-unah-blue mb-8 border-b-2 border-unah-yellow pb-2"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {servicios.map((servicio, index) => (
            <DashboardCard
            key={index}
            title={servicio.title}
            description={servicio.description}
            to={servicio.to}
            icon={servicio.icon}
            />
        ))}
        </div>
    </section>
    </div>
);
};