import * as Yup from "yup";
import type { PublicationCreateModel } from "../../core/models/publication.model";

export const publicationCreateInitialValues: PublicationCreateModel = {
  userId: "",
  typeId: "",
  title: "",
  text: "",
  dateCreate: "", // si no usas fecha, déjalo en "" y será opcional
};

// En publication-create.validation.ts
export const publicationCreateValidationSchema: Yup.ObjectSchema<PublicationCreateModel> =
  Yup.object({
    userId: Yup.string().optional(), // Asegúrate de que sea opcional
    typeId: Yup.string().required("El tipo de publicación es requerido."),
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
      .test("valid-date", "Fecha inválida", (value) => {
        if (!value) return true;
        return !isNaN(Date.parse(value));
      }),
  });
