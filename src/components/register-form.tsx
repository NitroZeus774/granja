"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TreePine } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft } from "lucide-react"

export function RegisterForm() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const { register } = useAuth()
    const { toast } = useToast()
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const validateEmail = (email: string) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            return emailRegex.test(email)
        }

        if (!validateEmail(email)) {
            toast({
                title: "Error",
                description: "Por favor ingresa un correo electrónico válido",
                variant: "destructive",
            })
            return
        }

        if (password !== confirmPassword) {
            toast({
                title: "Error",
                description: "Las contraseñas no coinciden",
                variant: "destructive",
            })
            return
        }

        if (password.length < 8) {
            toast({
                title: "Error",
                description: "La contraseña debe tener al menos 8 caracteres",
                variant: "destructive",
            })
            return
        }

        setLoading(true)

        try {
            const confirmed = await register(username, email, password)
            if (!confirmed) {
                toast({
                    title: "Error",
                    description: "Error al crear la cuenta. Inténtalo de nuevo.",
                    variant: "destructive",
                })
                return
            }
            toast({
                title: "Registro exitoso",
                description: "Cuenta creada correctamente",
            })
            const user = localStorage.getItem("user")
            if (user.role === "Administrador") {
                router.replace("/dashboard")
            }
            else if(user.role === "Cliente") {
                router.replace("/")
            }

        } catch (error) {
            toast({
                title: "Error",
                description: "Error al crear la cuenta",
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
                <h3 className="text-lg text-gray-600 mt-2">Registro de Usuario</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="username">Nombre de Usuario</Label>
                    <Input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <p className="text-sm text-gray-500 mt-1">Mínimo 4 caracteres, sin espacios</p>
                </div>
                <div>
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="tu@correo.com"
                    />
                    <p className="text-sm text-gray-500 mt-1">Usaremos este correo para contactarte</p>
                </div>
                <div>
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <p className="text-sm text-gray-500 mt-1">Mínimo 8 caracteres</p>
                </div>
                <div>
                    <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <Button type="submit" className="w-full btn-primary" disabled={loading}>
                    {loading ? "Registrando..." : "Registrarse"}
                </Button>
            </form>

            <div className="mt-4 text-center">
                <Link href="/login" className="text-[#5d8c47] hover:underline">
                    ¿Ya tienes cuenta? Inicia sesión
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
