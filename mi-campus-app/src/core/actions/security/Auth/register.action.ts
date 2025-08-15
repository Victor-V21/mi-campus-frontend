import { AxiosError } from "axios";
import type { ApiResponse } from "../../../../infrastructure/interfaces/api.response";
import { authCampusApi } from "../../../api/auth.campus.api";
import type { ApiErrorResponse } from "../../../../infrastructure/interfaces/api-error-response";
import type { RegisterModel } from "../../../models/register.model";
import type { RegisterResponse } from "../../../../infrastructure/interfaces/register.response";

export const registerAction = async (register: RegisterModel): Promise<ApiResponse<RegisterResponse>> => {
    try {
        const { data } = await authCampusApi.post<ApiResponse<RegisterResponse>>(
            '/users/register',
            register
        );

        return data;

    } catch (error) {
        const apiError = error as AxiosError<ApiErrorResponse>;

        console.error(apiError);

        if (apiError.response) {
            // throw new Error(apiError.response.data.message);
            return {
                status: false,
                message: apiError.response.data.message || "Error al registrarse"
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