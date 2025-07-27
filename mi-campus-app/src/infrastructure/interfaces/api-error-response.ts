export interface ApiErrorResponse<T = unknown> {
message: string;
status:  boolean;
data?:    T;
}