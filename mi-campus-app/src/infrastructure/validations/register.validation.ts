import * as Yup from "yup";
import type { RegisterModel } from "../../core/models/register.model";

// 1) Valores iniciales
export const registerInitialValues: RegisterModel = {
  firstName: "",
  lastName: "",
  email: "",
  noAccount: "",
  avatarUrl: null,  
  birthDay: null,    
  campusId: "",
  roles: [],
  password: "",
  confirmPassword: ""
};
// me tira error al usar el tipo RegisterModel directamente en Yup, por lo que lo he comentado

export const registerValidationSchema /* : Yup.ObjectSchema<RegisterModel> */ = Yup.object({
  firstName: Yup.string()
    .required("El nombre es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres"),

  lastName: Yup.string()
    .required("El apellido es requerido")
    .min(2, "El apellido debe tener al menos 2 caracteres"),

  email: Yup.string()
    .email("El correo electrónico debe ser válido")
    .required("El correo electrónico es requerido"),

  noAccount: Yup.string()
    .required("El número de cuenta es requerido")
    .matches(/^[0-9]{8}$/, "El número de cuenta debe tener 8 dígitos"),

  avatarUrl: Yup.string()
    .url("La URL del avatar debe ser válida")
    .nullable(), 

  birthDay: Yup.date()
    .nullable() 
    .max(new Date(), "La fecha de nacimiento no puede ser en el futuro")
    .required("La fecha de nacimiento es requerida")
    .typeError("La fecha de nacimiento debe ser una fecha válida"),

  campusId: Yup.string()
    .required("El campus es requerido"),

  roles: Yup.array(Yup.string())
    .min(1, "Debe seleccionar al menos un rol")
    .required("Los roles son requeridos"),

  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es requerida"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir")
    .required("La confirmación de la contraseña es requerida"),
});
