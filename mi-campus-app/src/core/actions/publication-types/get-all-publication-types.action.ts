import { AxiosError } from "axios";
import type { ApiResponse } from "../../../infrastructure/interfaces/api.response";
import { miCampusApi } from "../../api/campus.api";
import type { PublicationTypeDto } from "../../../infrastructure/interfaces/publication-type.response";
import { PUBLICATION_TYPES_BASE } from "../../configs/endpoints";
import type { ApiErrorResponse } from "../../../infrastructure/interfaces/api-error-response";

export const getAllPublicationTypesAction = async (): Promise<ApiResponse<PublicationTypeDto[]>> => {
  try {
    const { data } = await miCampusApi.get<ApiResponse<PublicationTypeDto[]>>(PUBLICATION_TYPES_BASE);
    return data;
  } catch (error) {
    const apiError = error as AxiosError<ApiErrorResponse>;
    if (apiError.response) throw new Error(apiError.response.data.message);
    else if (apiError.request) throw new Error("Error de conexión.");
    else throw new Error("Error desconocido.");
  }
};
