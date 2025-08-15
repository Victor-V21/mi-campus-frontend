import { AxiosError } from "axios";
import type { ApiResponse } from "../../../infrastructure/interfaces/api.response";
import { miCampusApi } from "../../api/campus.api";
import { PUBLICATION_TYPES_BASE } from "../../configs/endpoints";
import type { PublicationTypeModel } from "../../models/publication-types.model";
import type { ApiErrorResponse } from "../../../infrastructure/interfaces/api-error-response";

export const editPublicationTypeAction = async (
  id: string,
  payload: PublicationTypeModel
): Promise<ApiResponse<any>> => {
  try {
    const { data } = await miCampusApi.put<ApiResponse<any>>(`${PUBLICATION_TYPES_BASE}/${id}`, payload);
    return data;
  } catch (error) {
    const apiError = error as AxiosError<ApiErrorResponse>;
    if (apiError.response) throw new Error(apiError.response.data.message);
    else if (apiError.request) throw new Error("Error de conexión.");
    else throw new Error("Error desconocido.");
  }
};
