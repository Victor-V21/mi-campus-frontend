import { AxiosError } from "axios";
import type { ApiResponse } from "../../../infrastructure/interfaces/api.response";
import { miCampusApi } from "../../api/campus.api";
import { PUBLICATION_TYPES_BASE } from "../../configs/endpoints";
import type { ApiErrorResponse } from "../../../infrastructure/interfaces/api-error-response";

export const deletePublicationTypeAction = async (id: string): Promise<ApiResponse<any>> => {
  try {
    const { data } = await miCampusApi.delete<ApiResponse<any>>(`${PUBLICATION_TYPES_BASE}/${id}`);
    return data;
  } catch (error) {
    const apiError = error as AxiosError<ApiErrorResponse>;
    if (apiError.response) throw new Error(apiError.response.data.message);
    else if (apiError.request) throw new Error("Error de conexión.");
    else throw new Error("Error desconocido.");
  }
};
