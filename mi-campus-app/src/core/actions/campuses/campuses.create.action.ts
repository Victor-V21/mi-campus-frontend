
import type { ApiResponse } from '../../../infrastructure/interfaces/api.response'
import { authCampusApi } from '../../api/auth.campus.api';
import type { AxiosError } from 'axios';
import type { ApiErrorResponse } from '../../../infrastructure/interfaces/api-error-response';
import type { CampusesResponse } from '../../../infrastructure/interfaces/campuses.response';
import type { CampusModel } from '../../models/campus.model';

export const createCampusAction = async (model: CampusModel): Promise<ApiResponse<CampusesResponse>> => {

    try {
        const { data } = await authCampusApi.post<ApiResponse<CampusesResponse>>(
            '/campuses', model
        );

        return data;
    } catch (error) {
        const apiError = error as AxiosError<ApiErrorResponse>;

        console.error(apiError);

        if (apiError.response) {
            // throw new Error(apiError.response.data.message);
            return {
                status: false,
                message: apiError.response.data.message || "Error al buscar los registros"
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
