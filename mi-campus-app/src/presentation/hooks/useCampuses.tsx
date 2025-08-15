import { useQuery } from "@tanstack/react-query"
import { getPaginationCampusesAction } from "../../core/actions/campuses/campuses.get.list.action";
import { useState } from "react";

export const useCampuses = () => {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");

    const campusesPaginationQuery = useQuery({
        queryKey: ["campuses", page, pageSize, searchTerm], // Unique key 
        queryFn: () => getPaginationCampusesAction(page, pageSize, searchTerm),
        staleTime: 1000 * 60 * 5, // 5M
        refetchOnWindowFocus: false,
    });

    return {
        campusesPaginationQuery,

        setPage,
        setPageSize,
        setSearchTerm
    }
}
