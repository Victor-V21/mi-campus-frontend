import * as Yup from "yup";
import type { LoginModel } from "../../core/models/login.model";

export const loginInitialValues : LoginModel = {
    email: "",
    password: ""
}

export const loginValidationSchema: Yup.ObjectSchema<LoginModel> = Yup.object({
    email: Yup.string()
        .required('El correo electrónico es requerido')
        .email('El correo electrónico debe ser válido'),
    password: Yup.string()
        .required('La contraseña es requerida')
})