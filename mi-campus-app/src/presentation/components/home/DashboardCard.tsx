import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

interface DashboardCardProps {
title: string;
description?: string;
to?: string;
icon?: React.ReactNode;
actionText?: string;
}

export const DashboardCard = ({
title,
description,
to,
icon,
actionText = "ACCEDER"
}: DashboardCardProps) => {
return (
    <div className="dashboard-card">
    <div className="p-5">
        <div className="flex items-start space-x-4">
        {icon && (
            <div className="card-icon-container">
            {icon}
            </div>
        )}
        <div className="flex-1">
            <h3 className="card-title">{title}</h3>
            {description && (
            <p className="card-description">{description}</p>
            )}
            {to && (
            <Link
                to={to}
                className="card-button"
            >
                {actionText}
                <ArrowRight className="ml-1" size={16} />
            </Link>
            )}
        </div>
        </div>
    </div>
    </div>
);
};