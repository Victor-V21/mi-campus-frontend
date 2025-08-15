import * as Yup from "yup";
import type { PublicationEditModel } from "../../core/models/publication.model";

export const publicationEditInitialValues = (partial?: Partial<PublicationEditModel>): PublicationEditModel => ({
  id: partial?.id ?? "",
  typeId: partial?.typeId ?? "",
  title: partial?.title ?? "",
  text: partial?.text ?? "",
  dateCreate: partial?.dateCreate ?? "",
});

export const publicationEditValidationSchema: Yup.ObjectSchema<PublicationEditModel> =
  Yup.object({
    id: Yup.string()
      .required("El identificador es requerido."),
    typeId: Yup.string()
      .required("El tipo de publicación es requerido."),
    title: Yup.string()
      .required("El título es requerido.")
      .min(3, "El título debe tener al menos 3 caracteres.")
      .max(150, "El título debe tener menos de 150 caracteres."),
    text: Yup.string()
      .required("El contenido es requerido.")
      .min(10, "El contenido debe tener al menos 10 caracteres.")
      .max(2000, "El contenido debe tener menos de 2000 caracteres."),
    dateCreate: Yup.string()
      .optional()
      .test("es-fecha-valida", "Fecha inválida.", (value) => {
        if (!value) return true;
        const t = Date.parse(value);
        return !Number.isNaN(t);
      }),
  });
