import { AxiosError } from "axios";
import type { ApiResponse } from "../../../infrastructure/interfaces/api.response";
import type { Statistics } from "../../../infrastructure/interfaces/statistics.response";
import type { ApiErrorResponse } from "../../../infrastructure/interfaces/api-error-response";
import { miCampusApi } from "../../api/campus.api";

export const countsAction = async (): Promise<ApiResponse<Statistics>> => {
  try {
    const { data } = await miCampusApi.get<ApiResponse<Statistics>>("/statistics/counts");

    return data;
  } catch (error) {

    const apiError = error as AxiosError<ApiErrorResponse>;

    console.error(apiError);

    if (apiError.response) {
      throw new Error(apiError.response.data.message);
    } else if (apiError.request) {
      throw new Error("Error de conexión")
    } else {
      throw new Error("Error desconocido.")
    }
  }
}
