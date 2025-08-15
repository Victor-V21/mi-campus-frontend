import * as Yup from "yup";
import type { PublicationTypeModel } from "../../core/models/publication-types.model";


export const publicationTypeInitialValues: PublicationTypeModel = {
  name: "",
  description: "",
};

export const publicationTypeValidationSchema: Yup.ObjectSchema<PublicationTypeModel> =
  Yup.object({
    name: Yup.string()
      .required("El nombre es requerido.")
      .min(3, "El nombre debe tener al menos 3 caracteres.")
      .max(100, "El nombre debe tener menos de 100 caracteres."),
    description: Yup.string()
      .optional()
      .max(300, "La descripción debe tener menos de 300 caracteres."),
  });
