import { AxiosError } from "axios";
import type { ApiResponse } from "../../../infrastructure/interfaces/api.response";
import type { ApiErrorResponse } from "../../../infrastructure/interfaces/api-error-response";
import { miCampusApi } from "../../api/campus.api";
import { PUBLICATIONS_BASE } from "../../configs/endpoints";


export const uploadPublicationImageAction = async (
  publicationId: string,
  file: File
): Promise<ApiResponse<any>> => {
  try {
    const form = new FormData();
    form.append("file", file);

    const { data } = await miCampusApi.post<ApiResponse<any>>(
      `${PUBLICATIONS_BASE}/${publicationId}/images`,
      form,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return data;
  } catch (error) {
    const apiError = error as AxiosError<ApiErrorResponse>;
    if (apiError.response) throw new Error(apiError.response.data.message);
    else if (apiError.request) throw new Error("Error de conexión.");
    else throw new Error("Error desconocido.");
  }
};

