import { AxiosError } from "axios";
import { miCampusApi } from "../../api/campus.api";
import type { ApiResponse } from "../../../infrastructure/interfaces/api.response";
import type { ApiErrorResponse } from "../../../infrastructure/interfaces/api-error-response";

export const deletePublicationFeedbackAction = async (
  feedbackId: string
): Promise<ApiResponse<any>> => {
  try {
    const { data } = await miCampusApi.delete<ApiResponse<any>>(
      `/publications/feedback/${feedbackId}`
    );
    return data ?? ({ status: true, message: "OK" } as any);
  } catch (error) {
    const apiError = error as AxiosError<ApiErrorResponse>;
    if (apiError.response) throw new Error(apiError.response.data.message);
    if (apiError.request) throw new Error("Error de conexión.");
    throw new Error("Error desconocido.");
  }
};
