import type { ApiResponse } from "../../../infrastructure/interfaces/api.response";
import { authCampusApi } from "../../api/auth.campus.api";
import type { ApiErrorResponse } from "../../../infrastructure/interfaces/api-error-response";
import type { CampusModel } from "../../models/campus.model";
import type { AxiosError } from "axios";

export const editCampusAction = async (campusData: CampusModel, id: string): Promise<ApiResponse<any>> => {
    try {
        // Opción 1: Usar PUT pero con el ID en la URL
        const { data } = await authCampusApi.put<ApiResponse<any>>(
            `/campuses/${id}`, // ID en la URL
            campusData
        );

        // Opción 2: Si el backend espera PATCH en lugar de PUT
        // const { data } = await authCampusApi.patch<ApiResponse<any>>(
        //     `/campuses/${id}`,
        //     campusData
        // );

        return data;
    } catch (error) {
        const apiError = error as AxiosError<ApiErrorResponse>;
        console.error(apiError);

        if (apiError.response) {
            return {
                status: false,
                message: apiError.response.data.message || "Error al actualizar el campus"
            };
        } else if (apiError.request) {
            return {
                status: false,
                message: 'Error de conexión'
            };
        } else {
            return {
                status: false,
                message: 'Error desconocido'
            };
        }
    }
};