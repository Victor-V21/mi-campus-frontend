import { create } from "zustand";
import type { LoginModel } from "../../core/models/login.model";
import { loginAction } from "../../core/actions/security/Auth/login.action";

interface AuthStore {
    token?: string;
    email?: string;
    authenticated: boolean;
    errorMessage?: string;
    login: (login: LoginModel) => void;
    logout: () => void;
}

const storedToken = localStorage.getItem('token') || undefined;
const storedEmail = localStorage.getItem('email') || undefined;


export const useAuthStore = create<AuthStore>()((set) => ({
    token: storedToken,
    email: storedEmail,
    errorMessage: undefined,
    authenticated: isTokenValid(storedToken),
    login: async (login: LoginModel) => {
        set({errorMessage: undefined});
        const response = await loginAction(login);

        if(response.status && response.data) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", response.data.email);

            set({token: response.data.token, email: response.data.email, authenticated: true});

            return;
        }

        set({errorMessage: response.message, authenticated: false});

        return;
    },
    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        set({token: undefined, email: undefined, authenticated: false});
    }
}))

function isTokenValid(token?: string): boolean {
    if (!token) return false;
    try{
        const paylod = JSON.parse(atob(token.split('.')[1]))
        if(!paylod.exp) return false;

        const now = Math.floor(Date.now() / 1000);
        console.log({tokenExpirationTime: paylod.exp, currentTime: now, isValid: paylod.exp > now});

        return paylod.exp > now;
    } catch{
        return false;
    }
}