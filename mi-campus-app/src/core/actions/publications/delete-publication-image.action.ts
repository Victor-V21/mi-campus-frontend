import { AxiosError } from "axios";
import type { ApiResponse } from "../../../infrastructure/interfaces/api.response";
import type { ApiErrorResponse } from "../../../infrastructure/interfaces/api-error-response";
import { miCampusApi } from "../../api/campus.api";
import { PUBLICATIONS_BASE } from "../../configs/endpoints";


export const deletePublicationImageAction = async (
  publicationId: string,
  imageId: string
): Promise<ApiResponse<any>> => {
  try {
    const { data } = await miCampusApi.delete<ApiResponse<any>>(
      `${PUBLICATIONS_BASE}/${publicationId}/images/${imageId}`
    );
    return data;
  } catch (error) {
    const apiError = error as AxiosError<ApiErrorResponse>;
    if (apiError.response) throw new Error(apiError.response.data.message);
    else if (apiError.request) throw new Error("Error de conexión.");
    else throw new Error("Error desconocido.");
  }
};
