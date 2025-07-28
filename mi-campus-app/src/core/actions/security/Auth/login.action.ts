import { AxiosError } from "axios";
import type { LoginModel } from "../../../models/login.model";
import type { ApiResponse } from "../../../../infrastructure/interfaces/api.response";
import type { LoginResponse } from "../../../../infrastructure/interfaces/login.response";
import { authCampusApi } from "../../../api/auth.campus.api";
import type { ApiErrorResponse } from "../../../../infrastructure/interfaces/api-error-response";

export const loginAction = async (login: LoginModel): Promise<ApiResponse<LoginResponse>> => {
    try {
        const { data } = await authCampusApi.post<ApiResponse<LoginResponse>>(
            '/auth/login',
            login
        );

        return data;
        
    } catch (error) {
        const apiError = error as AxiosError<ApiErrorResponse>;

        console.error(apiError);

        if(apiError.response) {
           // throw new Error(apiError.response.data.message);
        return{
            status: false,
            message: apiError.response.data.message || "Error al iniciar sesion"
        }
        
        } else if (apiError.request) {
           // throw new Error('Error de conexión');
        return{
            status: false,
            message: 'Error de conexión'
        }
        } else {
           // throw new Error('Error desconocido')
        return{
            status: false,
            message: 'Error desconocido'
        }
        }
        
    }
} 