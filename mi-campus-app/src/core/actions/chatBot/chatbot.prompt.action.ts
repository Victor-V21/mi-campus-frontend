
import type { ChatBotPrompt } from '../../models/chatbot.model'
import type { ApiResponse } from '../../../infrastructure/interfaces/api.response'
import type { ChatResponse } from '../../../infrastructure/interfaces/chat.response'
import { authCampusApi } from '../../api/auth.campus.api';
import type { AxiosError } from 'axios';
import type { ApiErrorResponse } from '../../../infrastructure/interfaces/api-error-response';

export const chatPrompt = async (prompt: ChatBotPrompt): Promise<ApiResponse<ChatResponse>> => {

    try {
        const { data } = await authCampusApi.post<ApiResponse<ChatResponse>>(
            '/gemini/generate',
            prompt
        );

        return data;
    } catch (error) {
        const apiError = error as AxiosError<ApiErrorResponse>;

        console.error(apiError);

        if (apiError.response) {
            // throw new Error(apiError.response.data.message);
            return {
                status: false,
                message: apiError.response.data.message || "Error al contactar con la IA"
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
