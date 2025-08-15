import { AxiosError } from "axios";
import type { ApiResponse } from "../../../infrastructure/interfaces/api.response";
import type { Publication } from "../../../infrastructure/interfaces/publication.response";
import { miCampusApi } from "../../api/campus.api";
import { PUBLICATIONS_BASE } from "../../configs/endpoints";
import type { ApiErrorResponse } from "../../../infrastructure/interfaces/api-error-response";


export const getOnePublicationAction = async (id: string): Promise<ApiResponse<Publication>> => {
  try {
    const { data } = await miCampusApi.get<ApiResponse<Publication>>(`${PUBLICATIONS_BASE}/${id}`);
    return data;
  } catch (error) {
    const apiError = error as AxiosError<ApiErrorResponse>;
    if (apiError.response) throw new Error(apiError.response.data.message);
    else if (apiError.request) throw new Error("Error de conexión.");
    else throw new Error("Error desconocido.");
  }
};
