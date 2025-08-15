import { AxiosError } from "axios";
import type { ApiResponse } from "../../../infrastructure/interfaces/api.response";
import type { PublicationCreateModel } from "../../models/publication.model";
import { miCampusApi } from "../../api/campus.api";
import { PUBLICATIONS_BASE } from "../../configs/endpoints";
import type { ApiErrorResponse } from "../../../infrastructure/interfaces/api-error-response";

export const createPublicationAction = async (
  payload: PublicationCreateModel
): Promise<ApiResponse<any>> => {
  try {
    const { data } = await miCampusApi.post<ApiResponse<any>>(PUBLICATIONS_BASE, payload);
    return data;
  } catch (error) {
    const apiError = error as AxiosError<ApiErrorResponse>;
    if (apiError.response) throw new Error(apiError.response.data.message);
    else if (apiError.request) throw new Error("Error de conexión.");
    else throw new Error("Error desconocido.");
  }
};
