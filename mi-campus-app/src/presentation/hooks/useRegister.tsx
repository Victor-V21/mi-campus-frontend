import { useMutation } from "@tanstack/react-query";
import { registerAction } from "../../core/actions/security/Auth/register.action";
import type { RegisterModel } from "../../core/models/register.model";


export const useRegister = () => {
    const mutation = useMutation({
        mutationFn: (register: RegisterModel) => registerAction(register),
        onError: (data) => {
            console.log(data);
        }
    });

    return {
        mutation,
        registerResponse: mutation
    };
};
