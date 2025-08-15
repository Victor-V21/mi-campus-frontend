import * as Yup from "yup";
import type { FeedbackCreateModel } from "../../core/models/feedback.model";

export const feedbackCreateInitialValues: FeedbackCreateModel = {
  publicationId: "",
  comment: "",
  rate: undefined,
};

export const feedbackCreateValidationSchema: Yup.ObjectSchema<FeedbackCreateModel> =
  Yup.object({
    publicationId: Yup.string().required("La publicación es requerida."),
    comment: Yup.string()
      .optional()
      .max(500, "El comentario debe tener menos de 500 caracteres."),
    rate: Yup.number()
      .optional()
      .min(1, "La calificación mínima es 1.")
      .max(10, "La calificación máxima es 5."),
  }).test(
    "al-menos-un-campo",
    "Debes ingresar un comentario o una calificación.",
    (value) => {
      const hasComment = !!value.comment && value.comment.trim().length > 0;
      const hasRate = typeof value.rate === "number";
      return hasComment || hasRate;
    }
  );
