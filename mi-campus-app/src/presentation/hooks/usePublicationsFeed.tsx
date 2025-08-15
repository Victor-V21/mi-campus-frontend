import { useCallback, useEffect, useState } from "react";
import { publicationsApi } from "../../core/api/publications.api";
import type { Publication, PaginationDto } from "../../core/models/publication.model";

type PageState = PaginationDto<Publication[]> | null;

export function usePublicationsFeed() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<PageState>(null);

  const fetch = useCallback(async (opts?: { searchTerm?: string; page?: number; pageSize?: number }) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await publicationsApi.list(opts);
      if (data.status && data.data) setPage(data.data);
      else setError(data.message || "No se pudo obtener publicaciones.");
    } catch (e: any) {
      setError(e.message || "Error al cargar publicaciones.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch({ page: 1, pageSize: 6 }); }, [fetch]);

  return { loading, error, page, fetch, setPage };
}
