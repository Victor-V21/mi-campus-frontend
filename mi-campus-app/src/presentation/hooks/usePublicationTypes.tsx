import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";

import type { ApiResponse } from "../../infrastructure/interfaces/api.response";
import type { PublicationTypeModel } from "../../core/models/publication-types.model";

import { getAllPublicationTypesAction } from "../../core/actions/publication-types/get-all-publication-types.action";
import { createPublicationTypeAction } from "../../core/actions/publication-types/create-publication-type.action";
import { editPublicationTypeAction } from "../../core/actions/publication-types/edit-publication-type.action";
import { deletePublicationTypeAction } from "../../core/actions/publication-types/delete-publication-type.action";

export const usePublicationTypes = (returnTo: string = "/publication-types") => {
  
  const [page, setPage] = useState(1);             
  const [pageSize, setPageSize] = useState(10);  
  const [searchTerm, setSearchTerm] = useState(""); 

  const navigate = useNavigate();

  // LIST
  const publicationTypesQuery = useQuery({
    queryKey: ["publication-types", page, pageSize, searchTerm],
    queryFn: () => getAllPublicationTypesAction(), // el filtro es cliente
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  // CREATE
  const createPublicationTypeMutation = useMutation({
    mutationFn: (payload: PublicationTypeModel) => createPublicationTypeAction(payload),
    onSuccess: (data: ApiResponse<any>) => {
      if (data.status) {
        refreshPublicationTypes();
        navigate(returnTo);
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // EDIT
  const editPublicationTypeMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: PublicationTypeModel }) =>
      editPublicationTypeAction(id, payload),
    onSuccess: (data: ApiResponse<any>) => {
      if (data.status) {
        refreshPublicationTypes();
        navigate(returnTo);
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // DELETE
  const deletePublicationTypeMutation = useMutation({
    mutationFn: (id: string) => deletePublicationTypeAction(id),
    onSuccess: (data: ApiResponse<any>) => {
      if (data.status) {
        refreshPublicationTypes();
        navigate(returnTo);
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const refetch = publicationTypesQuery.refetch;

  const refreshPublicationTypes = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    // Props (mismo patrón)
    page,
    pageSize,
    searchTerm,
    publicationTypesQuery,
    createPublicationTypeMutation,
    editPublicationTypeMutation,
    deletePublicationTypeMutation,

    // Methods
    setPage,
    setPageSize,
    setSearchTerm,
    refreshPublicationTypes,
  };
};
