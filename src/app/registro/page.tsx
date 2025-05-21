'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2"
export default function RegisterForm() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (!nombre || !correo || !password) {
            setError("Por favor completa todos los campos");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/registro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, correo, password }),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || "Error al registrar");
            Swal.fire({
                title: data.mensaje,
                icon: "success",
                draggable: true
            });
            router.push("/");

        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Ocurrió un error al registrar"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted text-foreground px-4 py-12">
            <div className="max-w-md w-full bg-card-bg p-8 rounded-lg shadow-md card">
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Registro</h2>
                    <p className="text-sm text-muted-foreground mt-2">
                        Crea una cuenta para comenzar
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
                        <label htmlFor="nombre" className="block text-sm font-medium mb-1">
                            Nombre
                        </label>
                        <input
                            id="nombre"
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="input w-full"
                            placeholder="Tu nombre completo"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="correo" className="block text-sm font-medium mb-1">
                            Correo electrónico
                        </label>
                        <input
                            id="correo"
                            type="email"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            className="input w-full"
                            placeholder="tu@email.com"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input w-full"
                            placeholder="••••••••"
                            required
                        />
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
                            "Registrarse"
                        )}
                    </button>
                </form>

                <p className="mt-6 text-sm text-center text-muted-foreground">
                    ¿Ya tienes una cuenta?{" "}
                    <a
                        href="/login"
                        className="text-primary hover:underline font-medium"
                    >
                        Inicia sesión
                    </a>
                </p>
            </div>
        </div>
    );
}
