// src/presentation/pages/eventos/EventoPage.tsx
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Plus, Pencil, Trash2, X } from "lucide-react";
import { Title } from "../../components/shared/Title";
import type { PublicationTypeDto } from "../../../infrastructure/interfaces/publication-type.response";
import type { PublicationTypeModel } from "../../../core/models/publication-types.model";
import { getAllPublicationTypesAction } from "../../../core/actions/publication-types/get-all-publication-types.action";
import { createPublicationTypeAction } from "../../../core/actions/publication-types/create-publication-type.action";
import { editPublicationTypeAction } from "../../../core/actions/publication-types/edit-publication-type.action";
import { deletePublicationTypeAction } from "../../../core/actions/publication-types/delete-publication-type.action";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { publicationTypeInitialValues, publicationTypeValidationSchema } from "../../../infrastructure/validations/publication-types.validation";

// 🔧 Normaliza la respuesta, venga como venga
function normalizeTypes(payload: any): PublicationTypeDto[] {
  // Array directo
  if (Array.isArray(payload)) return payload;

  // ApiResponse<T> { status, message, data }
  if (payload?.data && Array.isArray(payload.data)) return payload.data;

  // Paginado común { items, total, ... }
  if (Array.isArray(payload?.items)) return payload.items;

  // Otras variantes frecuentes
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  if (Array.isArray(payload?.value)) return payload.value;
  if (Array.isArray(payload?.data?.value)) return payload.data.value;

  return [];
}

export const EventoPage = () => {
  // listado
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [types, setTypes] = useState<PublicationTypeDto[]>([]);

  // modal CRUD
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [working, setWorking] = useState(false);
  const [initialForm, setInitialForm] = useState<PublicationTypeModel>(publicationTypeInitialValues);
  const [editId, setEditId] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  // Carga usando TU action
  const load = async () => {
    try {
      setErr(null);
      setLoading(true);

      const res = await getAllPublicationTypesAction(); // <- devuelve ApiResponse<T> (según tu patrón)
      // Log para ver forma real en consola
      console.log("[publication-types] raw response:", res);

      const list = normalizeTypes(res); // acepta ApiResponse o array
      setTypes(list);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "No se pudo cargar la información.");
      setTypes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  // filtro cliente
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (Array.isArray(types) ? types : []).filter((t) => {
      const name = (t?.name ?? "").toLowerCase();
      const desc = (t?.description ?? "").toLowerCase();
      return !q || name.includes(q) || desc.includes(q);
    });
  }, [types, search]);

  // ---- CRUD helpers ----
  const openCreate = () => {
    setMode("create");
    setEditId(null);
    setGeneralError(null);
    setInitialForm({ ...publicationTypeInitialValues });
    setOpen(true);
  };

  const openEdit = (t: PublicationTypeDto) => {
    setMode("edit");
    setEditId(String((t as any).id)); // ajusta si tu DTO usa otra clave
    setGeneralError(null);
    setInitialForm({
      name: t.name ?? "",
      description: t.description ?? "",
    });
    setOpen(true);
  };

  const onDelete = async (id: string) => {
    if (!confirm("¿Eliminar este tipo de publicación?")) return;
    setWorking(true);
    try {
      const del = await deletePublicationTypeAction(id); // throws si falla
      console.log("[publication-types] delete response:", del);
      await load();
      alert("Tipo eliminado.");
    } catch (e) {
      alert(e instanceof Error ? e.message : "Error inesperado al eliminar.");
    } finally {
      setWorking(false);
    }
  };

  return (
    <div className="page-container">
      <Title text="Eventos Académicos" className="mb-8" />

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Buscar tipos de publicación..."
          className="event-search-input flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2">
          <button onClick={load} className="event-details-button">Recargar</button>
          <button
            onClick={openCreate}
            className="event-details-button"
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <Plus size={16} /> Nuevo tipo
          </button>
        </div>
      </div>

      {/* Estados */}
      {loading && <p>Cargando tipos…</p>}
      {err && !loading && (
        <div className="event-card" style={{ borderColor: "#fecaca" }}>
          <p className="event-description" style={{ color: "#b91c1c" }}>{err}</p>
        </div>
      )}

      {/* Lista */}
      {!loading && !err && (
        <>
          {filtered.length === 0 ? (
            <div className="event-card">
              <p className="event-description">No hay tipos que coincidan con la búsqueda.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {filtered.map((t) => (
                <article key={String((t as any).id)} className="event-card">
                  <header className="mb-4 flex justify-between items-start">
                    <h3 className="event-title">{t.name}</h3>
                    <span className="event-category">TIPO</span>
                  </header>

                  <p className="event-description">{t.description ?? "Sin descripción"}</p>

                  {/* Acciones */}
                  <div className="mt-4 flex gap-2">
                    <button
                      className="event-details-button"
                      style={{ background: "transparent", color: "var(--unah-blue)", border: "1px solid rgba(0,59,116,.2)", display: "flex", alignItems: "center", gap: 6 }}
                      onClick={() => openEdit(t)}
                    >
                      <Pencil size={16} /> Editar
                    </button>
                    <button
                      className="event-details-button"
                      style={{ background: "transparent", color: "#b91c1c", border: "1px solid rgba(185,28,28,.3)", display: "flex", alignItems: "center", gap: 6 }}
                      onClick={() => onDelete(String((t as any).id))}
                      disabled={working}
                    >
                      <Trash2 size={16} /> Eliminar
                    </button>
                    <a
                      href={`/publicaciones?typeId=${String((t as any).id)}`}
                      className="event-details-button"
                      style={{ display: "flex", alignItems: "center", gap: 6 }}
                    >
                      Ver publicaciones <ArrowRight size={16} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}

      {/* Modal Formik + Yup */}
      {open && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.35)", display: "grid", placeItems: "center", zIndex: 50 }}
          onClick={() => !working && setOpen(false)}
        >
          <div className="event-card" style={{ width: "100%", maxWidth: 560 }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="event-title">
                {mode === "create" ? "Nuevo tipo de publicación" : "Editar tipo de publicación"}
              </h3>
              <button
                onClick={() => !working && setOpen(false)}
                className="event-details-button"
                style={{ background: "transparent", border: "1px solid rgba(0,59,116,.2)" }}
              >
                <X size={16} />
              </button>
            </div>

            <Formik<PublicationTypeModel>
              enableReinitialize
              initialValues={initialForm}
              validationSchema={publicationTypeValidationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                setGeneralError(null);
                setWorking(true);
                try {
                  if (mode === "create") {
                    const res = await createPublicationTypeAction(values);
                    console.log("[publication-types] create response:", res);
                    await load();
                    setOpen(false);
                    alert("Tipo creado.");
                  } else {
                    const id = editId!;
                    const res = await editPublicationTypeAction(id, values);
                    console.log("[publication-types] edit response:", res);
                    await load();
                    setOpen(false);
                    alert("Tipo actualizado.");
                  }
                } catch (e) {
                  setGeneralError(e instanceof Error ? e.message : "Error inesperado.");
                } finally {
                  setWorking(false);
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-3">
                    <label className="event-info-title">Nombre</label>
                    <Field name="name" as="input" className="event-search-input" placeholder="Ej. Evento, Anuncio, Comunidad" />
                    <ErrorMessage name="name">
                      {msg => <div style={{ color: "#b91c1c", fontSize: ".9rem", marginTop: 4 }}>{msg}</div>}
                    </ErrorMessage>
                  </div>

                  <div className="mb-3">
                    <label className="event-info-title">Descripción (opcional)</label>
                    <Field name="description" as="textarea" className="event-search-input" style={{ minHeight: 90 }} placeholder="Describe brevemente en qué se usará este tipo" />
                    <ErrorMessage name="description">
                      {msg => <div style={{ color: "#b91c1c", fontSize: ".9rem", marginTop: 4 }}>{msg}</div>}
                    </ErrorMessage>
                  </div>

                  {generalError && (
                    <div className="event-card" style={{ borderColor: "#fecaca", background: "rgba(254,202,202,.25)" }}>
                      <p className="event-description" style={{ color: "#b91c1c" }}>{generalError}</p>
                    </div>
                  )}

                  <div className="mt-4 flex justify-end gap-2">
                    <button type="button" className="event-details-button" style={{ background: "transparent", color: "var(--unah-blue)", border: "1px solid rgba(0,59,116,.2)" }} onClick={() => setOpen(false)} disabled={working || isSubmitting}>
                      Cancelar
                    </button>
                    <button type="submit" className="event-details-button" disabled={working || isSubmitting}>
                      {working || isSubmitting ? "Guardando…" : mode === "create" ? "Crear" : "Guardar cambios"}
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
