import { AxiosError } from "axios";
import type { ApiResponse } from "../../../../infrastructure/interfaces/api.response";
import { authCampusApi } from "../../../api/auth.campus.api";
import type { ApiErrorResponse } from "../../../../infrastructure/interfaces/api-error-response";
import type { UserResponse } from "../../../../infrastructure/interfaces/user.response";

export const getOneUserByIdAction = async (id: string): Promise<ApiResponse<UserResponse>> => {
    try {
        const { data } = await authCampusApi.get<ApiResponse<UserResponse>>(
            `/users/${id}`
        );

        return data;

    } catch (error) {
        const apiError = error as AxiosError<ApiErrorResponse>;

        console.error(apiError);

        if (apiError.response) {
            // throw new Error(apiError.response.data.message);
            return {
                status: false,
                message: apiError.response.data.message || "Error al buscar el registro"
            }

        } else if (apiError.request) {
            // throw new Error('Error de conexión');
            return {
                status: false,
                message: 'Error de conexión'
            }
        } else {
            // throw new Error('Error desconocido')
            return {
                status: false,
                message: 'Error desconocido'
            }
        }
    }
} 