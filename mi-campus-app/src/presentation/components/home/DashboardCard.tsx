import { Plus } from "lucide-react";
import { Link } from "react-router";

interface Props {
title: string;
countValue: number;
icon?: React.ReactNode;
to?: string;
}


export const DashboardCard = ({ title, icon, countValue, to = "/" }: Props) => {
return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-row items-center justify-between gap-4">

    <div className="flex flex-row items-center justify-center gap-4">
        {/* icono */}
        <div>
        {icon && <span>{icon}</span>}
        </div>

        {/* titulo y contenido */}
        <div>
        <h2 className="text-lg font-bold mb-2">{title}</h2>

        <span className="text-gray-800">Total:</span>
        <span>{countValue}</span>
        </div>
    </div>

    <Link to={to} className="text-blue-500 hover:text-blue-600 flex flex-row items-center" >

        <Plus size={24} />
        <span>Agregar</span>

    </Link>
    </div>
)
}
