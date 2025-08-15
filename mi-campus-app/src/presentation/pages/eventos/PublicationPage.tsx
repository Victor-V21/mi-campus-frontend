import { useEffect, useMemo, useState } from "react";
import { Title } from "../../components/shared/Title";
import { usePublications } from "../../hooks/usePublications";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { publicationInitialValues, publicationValidationSchema } from "../../../infrastructure/validations/publication.validation";
import { Plus, Pencil, Trash2, ImagePlus, X } from "lucide-react";

const FILES_BASE = import.meta.env.VITE_FILES_BASE || "";
const imgUrl = (u?: string) => (!u ? "" : u.startsWith("http") ? u : `${FILES_BASE}${u}`);

export const PublicationPage = () => {
  const initType = new URLSearchParams(window.location.search).get("typeId") ?? "";

  const {
    loading, error, items, pageData,
    page, setPage,
    pageSize, setPageSize,
    searchTerm, setSearchTerm,
    typeId, setTypeId,
    refresh,

    types, typesLoading, typesError,

    create, edit, remove,
    addImage, removeImage,

    commentsByPub, commentsLoading, commentsError,
    loadComments, addComment, editComment, deleteComment,
  } = usePublications();

  useEffect(() => {
    if (initType && !typeId) setTypeId(initType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Modal
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [initForm, setInitForm] = useState(publicationInitialValues);

  const openCreate = () => {
    setMode("create");
    setEditingId(null);
    setInitForm({ ...publicationInitialValues, typeId: typeId || "" });
    setGeneralError(null);
    setOpen(true);
  };

  const openEdit = (p: any) => {
    setMode("edit");
    setEditingId(String(p.id));
    setInitForm({ title: p.title ?? "", text: p.text ?? "", typeId: String(p.typeId ?? "") });
    setGeneralError(null);
    setOpen(true);
  };

  const onChooseImages = async (pId: string, files?: FileList | null) => {
    if (!files || files.length === 0) return;
    for (const file of Array.from(files)) {
      try { await addImage(pId, file); } catch (e) { console.error(e); }
    }
  };

  const chips = useMemo(() => types.map(t => ({ id: String(t.id), label: t.name })), [types]);

  return (
    <div className="page-container">
      <Title text="Publicaciones" className="mb-8" />

      {/* Controles */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar publicaciones..."
          className="event-search-input flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Chips tipo (dinámicos) */}
        <div className="event-filter-buttons flex flex-wrap gap-2">
          <button onClick={() => setTypeId("")} className={!typeId ? "active" : ""}>Todas</button>
          {typesLoading && <button className="active" disabled>Cargando tipos…</button>}
          {typesError && <button style={{ borderColor: "rgba(185,28,28,.3)", color: "#b91c1c" }} disabled>Error tipos</button>}
          {!typesLoading && chips.map(c => (
            <button key={c.id} onClick={() => setTypeId(c.id)} className={typeId === c.id ? "active" : ""}>
              {c.label}
            </button>
          ))}
        </div>

        <div className="event-filter-buttons flex flex-wrap gap-2">
          <button onClick={refresh} className="event-details-button">Recargar</button>
          <button onClick={openCreate} className="event-details-button" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Plus size={16} /> Nueva publicación
          </button>
        </div>
      </div>

      {loading && <p>Cargando publicaciones…</p>}
      {error && !loading && (
        <div className="event-card" style={{ borderColor: "#fecaca" }}>
          <p className="event-description" style={{ color: "#b91c1c" }}>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {items.length === 0 ? (
            <div className="event-card">
              <p className="event-description">No hay publicaciones para los filtros seleccionados.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((p: any) => {
                const comments = commentsByPub[p.id] ?? [];
                const isCommentsLoading = commentsLoading[p.id] ?? false;
                const commentsErr = commentsError[p.id] ?? null;

                return (
                  <article key={p.id} className="event-card">

                    <div className="mb-4 flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div
                          style={{
                            width: 44, height: 44, borderRadius: "9999px", display: "grid",
                            placeItems: "center", background: "rgba(0,59,116,.08)",
                            border: "1px solid rgba(0,59,116,.15)", fontWeight: 600, color: "var(--unah-blue)"
                          }}
                          title={p.userName}
                        >
                          {(p.userName ?? "U").slice(0, 1).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="card-title" style={{ marginBottom: 2 }}>{p.userName}</h3>
                          <div style={{ color: "#6b7280", fontSize: ".85rem" }}>
                            {new Date(p.dateCreate ?? p.dateModify ?? Date.now()).toLocaleString("es-ES", {
                              day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>
                      <span className="event-category">{p.typeName}</span>
                    </div>


                    {p.title && <h4 className="event-title" style={{ marginBottom: 8 }}>{p.title}</h4>}


                    <p className="event-description">{p.text}</p>


                    {Array.isArray(p.images) && p.images.length > 0 && (
                      <div
                        style={{
                          display: "grid",
                          gap: "6px",
                          gridTemplateColumns: p.images.length > 1 ? "repeat(2,1fr)" : "1fr",
                          marginTop: ".25rem", marginBottom: ".25rem",
                        }}
                      >
                        {p.images.map((img: any) => (
                          <div key={img.id} style={{ position: "relative" }}>
                            <img
                              src={imgUrl(img.url)}
                              alt={img.fileName}
                              style={{
                                width: "100%", maxHeight: 420, objectFit: "cover",
                                borderRadius: "12px", border: "1px solid rgba(0,59,116,.12)",
                              }}
                            />
                            <button
                              className="event-details-button"
                              onClick={() => removeImage(String(p.id), String(img.id))}
                              style={{
                                position: "absolute", top: 8, right: 8,
                                background: "rgba(255,255,255,.9)",
                                color: "#b91c1c", border: "1px solid rgba(185,28,28,.3)"
                              }}
                            >
                              <X size={14} /> Quitar
                            </button>
                          </div>
                        ))}
                      </div>
                    )}


                    <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", marginTop: ".5rem" }}>
                      <label className="event-details-button" style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                        <ImagePlus size={16} /> Agregar imágenes
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          style={{ display: "none" }}
                          onChange={(e) => onChooseImages(String(p.id), e.target.files)}
                        />
                      </label>

                      <button
                        className="event-details-button"
                        style={{ background: "transparent", color: "var(--unah-blue)", border: "1px solid rgba(0,59,116,.2)", display: "flex", alignItems: "center", gap: 6 }}
                        onClick={() => openEdit(p)}
                      >
                        <Pencil size={16} /> Editar
                      </button>
                      <button
                        className="event-details-button"
                        style={{ background: "transparent", color: "#b91c1c", border: "1px solid rgba(185,28,28,.3)", display: "flex", alignItems: "center", gap: 6 }}
                        onClick={async () => {
                          if (!confirm("¿Eliminar publicación?")) return;
                          await remove(String(p.id));
                          alert("Publicación eliminada.");
                        }}
                      >
                        <Trash2 size={16} /> Eliminar
                      </button>
                      <a
                        href={`/publicaciones/${p.id}`}
                        className="event-details-button"
                        style={{ background: "transparent", color: "var(--unah-blue)", border: "1px solid rgba(0,59,116,.2)" }}
                      >
                        Ver detalle
                      </a>
                    </div>

                    {/* Comentarios */}
                    <div style={{ marginTop: ".75rem" }}>
                      <button
                        className="event-details-button"
                        style={{ background: "transparent", color: "var(--unah-blue)", border: "1px solid rgba(0,59,116,.2)" }}
                        onClick={() => loadComments(String(p.id))}
                      >
                        {isCommentsLoading ? "Cargando comentarios…" : "Comentarios"}
                      </button>

                      {commentsErr && <div style={{ color: "#b91c1c", marginTop: 6 }}>{commentsErr}</div>}

                      {comments.length > 0 && (
                        <div style={{ marginTop: 8, display: "grid", gap: 8 }}>
                          {comments.map((c) => (
                            <div key={c.id} className="event-card" style={{ padding: 12 }}>
                              <div className="flex justify-between">
                                <div style={{ fontWeight: 600 }}>{c.userName}</div>
                                <div style={{ color: "#6b7280", fontSize: ".85rem" }}>
                                  {c.dateCreate ? new Date(c.dateCreate).toLocaleString("es-ES") : ""}
                                </div>
                              </div>
                              <div style={{ marginTop: 4 }}>{c.text}</div>
                              <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                                <button
                                  className="event-details-button"
                                  style={{ background: "transparent", color: "var(--unah-blue)", border: "1px solid rgba(0,59,116,.2)" }}
                                  onClick={async () => {
                                    const nuevo = prompt("Editar comentario:", c.text);
                                    if (nuevo == null) return;
                                    await editComment(String(c.id), String(p.id), nuevo);
                                  }}
                                >
                                  Editar
                                </button>
                                <button
                                  className="event-details-button"
                                  style={{ background: "transparent", color: "#b91c1c", border: "1px solid rgba(185,28,28,.3)" }}
                                  onClick={async () => {
                                    if (!confirm("¿Eliminar comentario?")) return;
                                    await deleteComment(String(c.id), String(p.id));
                                  }}
                                >
                                  Eliminar
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Nuevo comentario */}
                      <Formik
                        initialValues={{ text: "" }}
                        onSubmit={async (vals, { resetForm }) => {
                          if (!vals.text.trim()) return;
                          await addComment(String(p.id), vals.text.trim());
                          resetForm();
                        }}
                      >
                        {({ isSubmitting }) => (
                          <Form style={{ display: "flex", gap: 8, marginTop: 10 }}>
                            <Field
                              name="text"
                              as="input"
                              placeholder="Escribe un comentario…"
                              className="event-search-input"
                              style={{ flex: 1 }}
                            />
                            <button type="submit" className="event-details-button" disabled={isSubmitting}>
                              Comentar
                            </button>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Paginación */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              className="event-details-button"
              style={{ background: "transparent", color: "var(--unah-blue)", border: "1px solid rgba(0,59,116,.2)" }}
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={!pageData.hasPreviousPage}
            >
              Anterior
            </button>
            <button
              className="event-details-button"
              onClick={() => setPage(page + 1)}
              disabled={!pageData.hasNextPage}
            >
              Siguiente
            </button>
            <select
              className="event-search-input"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              style={{ width: 140 }}
            >
              <option value={5}>5 / página</option>
              <option value={10}>10 / página</option>
              <option value={20}>20 / página</option>
            </select>
          </div>
        </>
      )}

      {/* Modal Crear/Editar */}
      {open && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.35)", display: "grid", placeItems: "center", zIndex: 50 }}
          onClick={() => setOpen(false)}
        >
          <div className="event-card" style={{ width: "100%", maxWidth: 640 }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="event-title">{mode === "create" ? "Nueva publicación" : "Editar publicación"}</h3>
              <button className="event-details-button" style={{ background: "transparent", border: "1px solid rgba(0,59,116,.2)" }} onClick={() => setOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <Formik
              enableReinitialize
              initialValues={initForm}
              validationSchema={publicationValidationSchema}
              onSubmit={async (vals, { setSubmitting }) => {
                try {
                  if (mode === "create") {
                    await create(vals);
                    alert("Publicación creada.");
                  } else {
                    await edit(editingId!, vals);
                    alert("Publicación actualizada.");
                  }
                  setOpen(false);
                } catch (e) {
                  setGeneralError(e instanceof Error ? e.message : "Error inesperado.");
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-3">
                    <label className="event-info-title">Título</label>
                    <Field name="title" as="input" className="event-search-input" placeholder="Asamblea, Feria, Aviso…" />
                    <ErrorMessage name="title">
                      {(msg) => <div style={{ color: "#b91c1c", fontSize: ".9rem", marginTop: 4 }}>{msg}</div>}
                    </ErrorMessage>
                  </div>

                  <div className="mb-3">
                    <label className="event-info-title">Contenido</label>
                    <Field name="text" as="textarea" className="event-search-input" style={{ minHeight: 120 }} placeholder="Describe el evento/anuncio…" />
                    <ErrorMessage name="text">
                      {(msg) => <div style={{ color: "#b91c1c", fontSize: ".9rem", marginTop: 4 }}>{msg}</div>}
                    </ErrorMessage>
                  </div>

                  <div className="mb-3">
                    <label className="event-info-title">Tipo</label>
                    <Field name="typeId" as="select" className="event-search-input">
                      <option value="">Seleccione un tipo…</option>
                      {types.map((t) => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="typeId">
                      {(msg) => <div style={{ color: "#b91c1c", fontSize: ".9rem", marginTop: 4 }}>{msg}</div>}
                    </ErrorMessage>
                  </div>

                  {generalError && (
                    <div className="event-card" style={{ borderColor: "#fecaca", background: "rgba(254,202,202,.25)" }}>
                      <p className="event-description" style={{ color: "#b91c1c" }}>{generalError}</p>
                    </div>
                  )}

                  <div className="mt-4 flex justify-end gap: 2">
                    <button type="button" className="event-details-button" style={{ background: "transparent", color: "var(--unah-blue)", border: "1px solid rgba(0,59,116,.2)" }} onClick={() => setOpen(false)} disabled={isSubmitting}>
                      Cancelar
                    </button>
                    <button type="submit" className="event-details-button" disabled={isSubmitting}>
                      {isSubmitting ? "Guardando…" : (mode === "create" ? "Crear" : "Guardar")}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};
