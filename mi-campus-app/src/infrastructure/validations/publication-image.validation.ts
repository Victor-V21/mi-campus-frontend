import * as Yup from "yup";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB

export const publicationImageInitialValues = {
  file: undefined as File | undefined,
};

export const publicationImageValidationSchema = Yup.object({
  file: Yup.mixed<File>()
    .required("La imagen es requerida.")
    .test("file-type", "Formato no permitido. Usa JPG, PNG o WEBP.", (file) => {
      if (!file) return false;
      return ALLOWED_IMAGE_TYPES.includes(file.type);
    })
    .test("file-size", "La imagen debe pesar menos de 5MB.", (file) => {
      if (!file) return false;
      return file.size <= MAX_IMAGE_BYTES;
    }),
});

export const publicationImagesArraySchema = Yup.array()
  .of(
    Yup.mixed<File>()
      .test("file-type", "Formato no permitido. Usa JPG, PNG o WEBP.", (file) => {
        if (!file) return true; // permitir opcionales
        return ALLOWED_IMAGE_TYPES.includes(file.type);
      })
      .test("file-size", "Cada imagen debe pesar menos de 5MB.", (file) => {
        if (!file) return true;
        return file.size <= MAX_IMAGE_BYTES;
      })
  )
  .max(6, "Máximo 6 imágenes por publicación.");
