// src/pages/auth/VerifyEmailPage.tsx
import { MailCheck } from "lucide-react";
import { Link } from "react-router";

export const VerifyEmailPage = () => {
    return (
        <div className="login-page">
            <div className="login-box text-center">
                <div className="login-header">
                    <h1>Mi Campus UNAH</h1>
                    <p>Verificación requerida</p>
                </div>

                <div className="login-body">
                    <div className="flex justify-center mb-4">
                        <MailCheck size={64} className="text-green-500" />
                    </div>

                    <h2 className="text-xl font-bold mb-2">¡Registro exitoso!</h2>
                    <p className="mb-6">Hemos enviado un enlace de verificación a tu correo institucional.</p>
                    <p className="mb-6">Por favor revisa tu bandeja de entrada y haz clic en el enlace para activar tu cuenta.</p>

                    <div className="text-sm text-gray-600 mb-6">
                        <p>¿No es tu correo institucional?</p>
                        <Link to="/auth/register" className="text-unah-blue hover:underline">
                            Reingresar datos de registro
                        </Link>
                    </div>

                    <Link
                        to="/auth/login"
                        className="login-btn block text-center"
                    >
                        Ir a Iniciar Sesión
                    </Link>
                </div>
            </div>
        </div>
    );
};