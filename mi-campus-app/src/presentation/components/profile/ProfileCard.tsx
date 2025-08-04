import { BadgeCheck, GraduationCap, Mail, User } from "lucide-react";

interface ProfileCardProps {
name: string;
email: string;
carrera: string;
añoIngreso: number;
avatarUrl?: string;
}

export const ProfileCard = ({
name,
email,
carrera,
añoIngreso,
avatarUrl,
}: ProfileCardProps) => {
return (
    <div className="profile-card">
    {avatarUrl ? (
        <img src={avatarUrl} alt="Avatar" className="avatar" />
    ) : (
        <div className="avatar-fallback">
        <User size={48} />
        </div>
    )}
    <h2 className="profile-name">
        {name} <BadgeCheck className="icon" />
    </h2>
    <p className="profile-email">
        <Mail className="icon" /> {email}
    </p>
    <p className="profile-detail">
        <GraduationCap className="icon" /> {carrera}
    </p>
    <span className="badge-unah">UNAH · {añoIngreso}</span>
    </div>
);
};
