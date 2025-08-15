import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import type { CampusModel } from "../../core/models/campus.model";
import { getPaginationCampusesAction } from "../../core/actions/campuses/campuses.get.list.action";
import { getOndeCampusAction } from "../../core/actions/campuses/campuses.get.one.action";
import { createCampusAction } from "../../core/actions/campuses/campuses.create.action";
import { editCampusAction } from "../../core/actions/campuses/campuses.edit.action";
import { getListCampusesAdminAction } from "../../core/actions/campuses/campuses.get.list.admin.action";

export const useCampuses = () => {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCampusId, setSelectedCampusId] = useState<string | null>(null);

    // Query para la lista paginada de campuses
    const campusesPaginationQuery = useQuery({
        queryKey: ["campuses", "list", "public", page, pageSize, searchTerm],
        queryFn: () => getPaginationCampusesAction(page, pageSize, searchTerm),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false
    });

    const campusesAdminPaginationQuery = useQuery({
        queryKey: ["campuses", "list", "admin", page, pageSize, searchTerm],
        queryFn: () => getListCampusesAdminAction(page, pageSize, searchTerm),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false
    });

    // Query para un campus específico
    const campusQuery = useQuery({
        queryKey: ["campuses", "detail", selectedCampusId],
        queryFn: () => selectedCampusId ? getOndeCampusAction(selectedCampusId) : null,
        enabled: !!selectedCampusId, // Solo se ejecuta si hay un ID seleccionado
        staleTime: 1000 * 60 * 5 // 5 minutos
    });

    // Mutación para crear un nuevo campus
    const createCampusMutation = useMutation({
        mutationFn: (campusData: CampusModel) => createCampusAction(campusData),
        onSuccess: () => {
            // Invalidar la query de listado para refrescar los datos
            queryClient.invalidateQueries({ queryKey: ["campuses", "list"] });
        }
    });

    // Mutación para actualizar un campus
    const updateCampusMutation = useMutation({
        mutationFn: ({ id, campusData }: { id: string, campusData: CampusModel }) =>
            editCampusAction(campusData, id),
        onSuccess: () => {
            // Invalidar tanto el listado como el detalle del campus actualizado
            queryClient.invalidateQueries({ queryKey: ["campuses", "list"] });
            queryClient.invalidateQueries({ queryKey: ["campuses", "detail"] });
        }
    });

    return {
        // Queries
        campusesAdminPaginationQuery,
        campusesPaginationQuery,
        campusQuery,

        // Mutations
        createCampusMutation,
        updateCampusMutation,

        // State setters
        setPage,
        setPageSize,
        setSearchTerm,
        setSelectedCampusId,

        // Current state
        page,
        pageSize,
        searchTerm,
        selectedCampusId
    };
};