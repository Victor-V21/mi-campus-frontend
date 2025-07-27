export interface PageResponse<T> {
currentPage:     number;
hasNextPage:     boolean;
hasPreviousPage: boolean;
pageSize:        number;
totalItems:      number;
totalPages:      number;
items:           T[];
}