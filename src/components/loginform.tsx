"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2"
export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (!email || !password) {
            setError("Por favor completa todos los campos");
            Swal.fire("Por favor completa todos los campos");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
                credentials: "same-origin",
            });

            const data = await response.json();
            if (data.token) {
                sessionStorage.setItem("rol", data.rol);
                sessionStorage.setItem("user", data.user);
                sessionStorage.setItem("id_user", data.id_user);
                sessionStorage.setItem("email", data.email);
                Swal.fire("Bienvenido " + data.user);
                console.log(data);
                if (data.rol === "Administrador") router.push("/Dashboard");
                else if (data.rol === "Veterinario") router.push("/Dashboard/Veterinaria");
                else if (data.rol === "Cliente") router.push("/Dashboard/Cliente");
            }

            else {
                Swal.fire(data.error || "Error al iniciar sesión");
                setError(data.error || "Error al iniciar sesión");
            }

        } catch (err) {
            Swal.fire(err instanceof Error? err.message: "???")
            setError(
                err instanceof Error
                    ? err.message
                    : "Ocurrió un error al iniciar sesión"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted text-foreground px-4 py-12">
            <div className="max-w-md w-full bg-card-bg p-8 rounded-lg shadow-md card">
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Iniciar sesión</h2>
                    <p className="text-sm text-muted-foreground mt-2">
                        Ingresa tus credenciales para acceder
                    </p>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                            Correo electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            className="input w-full"
                            placeholder="tu@email.com"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium mb-1"
                        >
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            className="input w-full"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="accent-blue-600" />
                            <span>Recordarme</span>
                        </label>
                        <a href="#" className="text-primary hover:underline">
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`button w-full text-center ${isLoading ? "opacity-75 cursor-not-allowed" : ""
                            }`}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8H4z"
                                    />
                                </svg>
                                <span>Procesando...</span>
                            </div>
                        ) : (
                            "Iniciar sesión"
                        )}
                    </button>
                </form>

                <p className="mt-6 text-sm text-center text-muted-foreground">
                    ¿No tienes una cuenta?{" "}
                    <a
                        href="/registro"
                        className="text-primary hover:underline font-medium"
                    >
                        Regístrate
                    </a>
                </p>
            </div>
        </div>
    );
}
