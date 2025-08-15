import { useQuery } from "@tanstack/react-query";
import { getListUserAction } from "../../core/actions/security/users/user.get.list.action"; // Este es el hook que usa getListUserAction para obtener los usuarios

export const useUserProfile = (email: string) => {
    const userGetOneQuery = useQuery({
        queryKey: ["users", "detail", email],
        queryFn: () => (email ? getListUserAction(1, 10, email) : undefined),
        enabled: !!email, // Solo se ejecuta si hay un email proporcionado
        staleTime: 1000 * 60 * 5, // 5 minutos para mantener los datos frescos
    });

    return {
        userGetOneQuery, // Retornamos la consulta para obtener los datos del usuario
    };
};
