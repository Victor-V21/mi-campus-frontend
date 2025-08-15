import { AxiosError } from "axios";
import type { ApiResponse } from "../../../infrastructure/interfaces/api.response";
import type { PublicationEditModel } from "../../models/publication.model";
import { miCampusApi } from "../../api/campus.api";
import { PUBLICATIONS_BASE } from "../../configs/endpoints";
import type { ApiErrorResponse } from "../../../infrastructure/interfaces/api-error-response";

export const editPublicationAction = async (
  id: string,
  payload: PublicationEditModel
): Promise<ApiResponse<any>> => {
  try {
    const { data } = await miCampusApi.put<ApiResponse<any>>(`${PUBLICATIONS_BASE}/${id}`, payload);
    return data;
  } catch (error) {
    const apiError = error as AxiosError<ApiErrorResponse>;
    if (apiError.response) throw new Error(apiError.response.data.message);
    else if (apiError.request) throw new Error("Error de conexión.");
    else throw new Error("Error desconocido.");
  }
};
