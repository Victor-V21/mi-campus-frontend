import { useCallback, useEffect, useMemo, useState } from "react";
import type { ApiResponse } from "../../infrastructure/interfaces/api.response";
import type { PageResponse } from "../../infrastructure/interfaces/page.response";
import type { Publication } from "../../core/models/publication.model";
import { getPublicationsPaginationAction } from "../../core/actions/publications/get-pagination-publications.action";
import { getAllPublicationTypesAction } from "../../core/actions/publication-types/get-all-publication-types.action";
import { getOnePublicationAction } from "../../core/actions/publications/get-one-publication.action";
import { getPublicationFeedbackAction } from "../../core/actions/publications/get-publication-feedback.action";
import { createPublicationFeedbackAction } from "../../core/actions/publications/create-publication-feedback.action";
import { editPublicationFeedbackAction } from "../../core/actions/publications/edit-publication-feedback.action";
import { deletePublicationFeedbackAction } from "../../core/actions/publications/delete-publication-feedback.action";
import { createPublicationAction } from "../../core/actions/publications/create-publication.action";
import { editPublicationAction } from "../../core/actions/publications/edit-publication.action";
import { deletePublicationAction } from "../../core/actions/publications/delete-publication.action";
import { uploadPublicationImageAction } from "../../core/actions/publications/upload-publication-image.action";
import { deletePublicationImageAction } from "../../core/actions/publications/delete-publication-image.action";



// Normalizador por si tu PageResponse cambia de forma
function normPage(payload: ApiResponse<PageResponse<Publication[]>> | any): PageResponse<Publication[]> {
  const d = payload?.data ?? payload;
  return {
    currentPage: d?.currentPage ?? d?.page ?? 1,
    pageSize: d?.pageSize ?? d?.page_size ?? 10,
    totalItems: d?.totalItems ?? d?.total ?? 0,
    totalPages: d?.totalPages ?? d?.pages ?? 1,
    hasNextPage: !!d?.hasNextPage,
    hasPreviousPage: !!d?.hasPreviousPage,
    items: Array.isArray(d?.items) ? d.items : [],
  };
}

type Feedback = {
  id: string;
  userId: string;
  userName: string;
  text: string;
  rating?: number;
  dateCreate?: string;
};

export const usePublications = (publicationId?: string) => {

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeId, setTypeId] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pageData, setPageData] = useState<PageResponse<Publication[]>>(normPage(null));


  const [typesLoading, setTypesLoading] = useState(false);
  const [typesError, setTypesError] = useState<string | null>(null);
  const [types, setTypes] = useState<{ id: string; name: string }[]>([]);


  const [detail, setDetail] = useState<Publication | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  
  const [commentsByPub, setCommentsByPub] = useState<Record<string, Feedback[]>>({});
  const [commentsLoading, setCommentsLoading] = useState<Record<string, boolean>>({});
  const [commentsError, setCommentsError] = useState<Record<string, string | null>>({});

  const load = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const resp = await getPublicationsPaginationAction(
        searchTerm,
        page,
        pageSize,
       typeId || undefined
      );
      setPageData(normPage(resp));
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo cargar publicaciones.");
      setPageData(normPage(null));
    } finally {
      setLoading(false);
    }
  }, [searchTerm, page, pageSize, typeId]);


  const loadTypes = useCallback(async () => {
    try {
      setTypesError(null);
      setTypesLoading(true);
      const resp = await getAllPublicationTypesAction();
      const list = resp?.data ?? [];
      setTypes(list.map((x: any) => ({ id: String(x.id), name: x.name })));
    } catch (e) {
      setTypesError(e instanceof Error ? e.message : "No se pudo cargar tipos.");
      setTypes([]);
    } finally {
      setTypesLoading(false);
    }
  }, []);

  const loadOne = useCallback(async () => {
    if (!publicationId) return;
    try {
      setDetailError(null);
      setDetailLoading(true);
      const resp = await getOnePublicationAction(publicationId);
      setDetail(resp?.data ?? null);
    } catch (e) {
      setDetailError(e instanceof Error ? e.message : "No se pudo cargar el detalle.");
      setDetail(null);
    } finally {
      setDetailLoading(false);
    }
  }, [publicationId]);

  // Comentarios
  const loadComments = useCallback(async (pubId: string) => {
    setCommentsLoading((m) => ({ ...m, [pubId]: true }));
    setCommentsError((m) => ({ ...m, [pubId]: null }));
    try {
      const resp = await getPublicationFeedbackAction(pubId);
      const arr = Array.isArray(resp?.data) ? resp.data : (resp?.data?.items ?? []);
      setCommentsByPub((m) => ({ ...m, [pubId]: arr }));
    } catch (e) {
      setCommentsError((m) => ({ ...m, [pubId]: e instanceof Error ? e.message : "No se pudo cargar comentarios." }));
      setCommentsByPub((m) => ({ ...m, [pubId]: [] }));
    } finally {
      setCommentsLoading((m) => ({ ...m, [pubId]: false }));
    }
  }, []);

  const addComment = useCallback(async (pubId: string, text: string, rating?: number) => {
    await createPublicationFeedbackAction(pubId, { text, rating });
    await loadComments(pubId);
  }, [loadComments]);

  const editComment = useCallback(async (feedbackId: string, pubId: string, text: string, rating?: number) => {
    await editPublicationFeedbackAction(feedbackId, { text, rating });
    await loadComments(pubId);
  }, [loadComments]);

  const deleteComment = useCallback(async (feedbackId: string, pubId: string) => {
    await deletePublicationFeedbackAction(feedbackId);
    await loadComments(pubId);
  }, [loadComments]);

  // CRUD publicaciones
  const create = useCallback(async (payload: any) => {
    const resp = await createPublicationAction(payload);
    if (resp?.status) await load();
    return resp;
  }, [load]);

  const edit = useCallback(async (id: string, payload: any) => {
    const resp = await editPublicationAction(id, payload);
    if (resp?.status) {
      await load();
      if (publicationId === id) await loadOne();
    }
    return resp;
  }, [load, loadOne, publicationId]);

  const remove = useCallback(async (id: string) => {
    await deletePublicationAction(id);
    await load();
  }, [load]);

  // Imágenes
  const addImage = useCallback(async (id: string, file: File) => {
    const resp = await uploadPublicationImageAction(id, file);
    if (resp?.status) {
      await load();
      if (publicationId === id) await loadOne();
    }
  }, [load, loadOne, publicationId]);

  const removeImage = useCallback(async (id: string, imageId: string) => {
    await deletePublicationImageAction(id, imageId);
    await load();
    if (publicationId === id) await loadOne();
  }, [load, loadOne, publicationId]);

  // Auto-cargas
  useEffect(() => { load(); }, [load]);
  useEffect(() => { loadTypes(); }, [loadTypes]);
  useEffect(() => { loadOne(); }, [loadOne]);

  useEffect(() => { setPage(1); }, [searchTerm, typeId]);

  const items = useMemo(() => pageData.items ?? [], [pageData]);

  return {
    // lista
    loading, error, items, pageData,
    page, setPage,
    pageSize, setPageSize,
    searchTerm, setSearchTerm,
    typeId, setTypeId,

    // tipos
    types, typesLoading, typesError,

    // detalle
    detail, detailLoading, detailError,

    // acciones publicaciones
    create, edit, remove,
    addImage, removeImage,

    // comentarios
    commentsByPub, commentsLoading, commentsError,
    loadComments, addComment, editComment, deleteComment,

    // recargas
    refresh: load,
    refreshTypes: loadTypes,
    refreshOne: loadOne,
  };
};
