import { AxiosError } from "axios";
import type { ApiResponse } from "../../../infrastructure/interfaces/api.response";
import type { Publication } from "../../../infrastructure/interfaces/publication.response";
import { miCampusApi } from "../../api/campus.api";
import { PUBLICATIONS_BASE } from "../../configs/endpoints";
import type { ApiErrorResponse } from "../../../infrastructure/interfaces/api-error-response";
import type { PageResponse } from "../../../infrastructure/interfaces/page.response";


export const getPublicationsPaginationAction = async (
  searchTerm = "",
  page = 1,
  pageSize = 10,
  typeId?: string
): Promise<ApiResponse<PageResponse<Publication[]>>> => {
  try {
    const { data } = await miCampusApi.get<ApiResponse<PageResponse<Publication[]>>>(
      PUBLICATIONS_BASE,
      { params: { searchTerm, page, pageSize, typeId } }
    );
    return data;
  } catch (error) {
    const apiError = error as AxiosError<ApiErrorResponse>;
    if (apiError.response) throw new Error(apiError.response.data.message);
    else if (apiError.request) throw new Error("Error de conexión.");
    else throw new Error("Error desconocido.");
  }
};
