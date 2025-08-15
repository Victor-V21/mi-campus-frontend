import * as Yup from "yup";
import type { PublicationModel } from "../../core/models/publication.model";


export const publicationInitialValues: PublicationModel = {
  title: "",
  text: "",
  typeId: "",
};

export const publicationValidationSchema: Yup.ObjectSchema<PublicationModel> =
  Yup.object({
    title: Yup.string()
      .required("El título es requerido.")
      .min(3, "El título debe tener al menos 3 caracteres.")
      .max(150, "El título debe tener menos de 150 caracteres."),
    text: Yup.string()
      .required("El contenido es requerido.")
      .min(5, "El contenido debe tener al menos 5 caracteres.")
      .max(2000, "El contenido es demasiado largo."),
    typeId: Yup.string().required("El tipo de publicación es requerido."),
  });
