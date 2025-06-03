"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TreePine, Mail, Lock } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft } from "lucide-react"


export function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const { toast } = useToast()
    const router = useRouter()

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateEmail(email)) {
            toast({
                title: "Error",
                description: "Por favor ingresa un correo electrónico válido",
                variant: "destructive",
            })
            return
        }

        if (password.length < 1) {
            toast({
                title: "Error",
                description: "Por favor ingresa tu contraseña",
                variant: "destructive",
            })
            return
        }

        setLoading(true)

        try {
            await login(email, password)
            toast({
                title: "¡Bienvenido de vuelta!",
                description: "Has iniciado sesión correctamente",
            })
            const userString = localStorage.getItem("user")
            const user = userString ? JSON.parse(userString) : null

            if (user?.role === "Administrador") {
                router.replace("/dashboard")
            } else {
                router.replace("/")
            }

        } catch (error) {
            console.log("Error en login:", error)
            toast({
                title: "Error de autenticación",
                description: error.message,
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg">
            
            <div className="text-center mb-6">
                <TreePine className="h-12 w-12 text-[#5d8c47] mx-auto mb-4" />
                <h2 className="text-2xl font-bold">Granja Los Prados</h2>
                <h3 className="text-lg text-gray-600 mt-2">Iniciar Sesión</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="tu@correo.com"
                            className="pl-10"
                        />
                    </div>
                </div>

                <div>
                    <Label htmlFor="password">Contraseña</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            className="pl-10"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-[#5d8c47] focus:ring-[#5d8c47]" />
                        <span className="ml-2 text-sm text-gray-600">Recordarme</span>
                    </label>
                    <Link href="/recuperar-password" className="text-sm text-[#5d8c47] hover:underline">
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>

                <Button type="submit" className="w-full btn-primary" disabled={loading}>
                    {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-2">¿No tienes una cuenta?</p>
                <Link href="/registro" className="text-[#5d8c47] hover:underline font-medium">
                    Crear cuenta nueva
                </Link>
            </div>

            {/* Header with back button */}
            <div className="w-full max-w-md mb-2 mt-4">
                <Link href="/">
                    <Button variant="ghost" className="text-[#5d8c47] hover:bg-green-100">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver al inicio
                    </Button>
                </Link>
            </div>
        </div>
    )
}
