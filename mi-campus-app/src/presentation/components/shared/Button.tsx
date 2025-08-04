import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  icon?: ReactNode;
  onClick?: () => void;
}

export const Button = ({
  children,
  variant = "primary",
  className = "",
  icon,
  onClick
}: ButtonProps) => {
  // Clases base
  const baseClasses = "inline-flex items-center justify-center px-4 py-2 rounded-lg font-LexendDeca-Medium transition-all duration-200";
  
  // Clases por variante
  const variantClasses = {
    primary: "bg-unah-blue text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
    outline: "border border-unah-blue text-unah-blue hover:bg-blue-50",
    ghost: "text-unah-blue hover:bg-blue-50"
  };

  // Combina clases
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <button
      onClick={onClick}
      className={combinedClasses}
    >
      {children}
      {icon && (
        <span className={`ml-2 ${!children ? 'mx-1' : ''}`}>
          {icon}
        </span>
      )}
    </button>
  );
};