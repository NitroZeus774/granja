"use client"

import { useState, useEffect } from "react"

interface User {
    id: number
    username: string
    role: string
    email: string
}

interface AuthContextType {
    user: User | null
    login: (email: string, password: string) => Promise<boolean>
    register: (username: string, email: string, password: string) => Promise<boolean>
    logout: () => void
}

export const useAuth = (): AuthContextType => {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {

        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (!response.ok) {
                // Si hay un error, lanzar una excepción con el mensaje del servidor
                throw new Error(data.error || "Error de autenticación")
            }

            // Si el login es exitoso, crear la sesión del usuario
            const user = {
                id: data.id_user,
                username: data.user,
                email: data.email,
                role: data.rol,
            }

            
            setUser(user)
            localStorage.setItem("user", JSON.stringify(user))
            return true
        } catch (error) {
            console.error("Error en login:", error)
            throw error // Re-lanzar el error para que el componente pueda manejarlo
        }
    }

    const register = async (username: string, email: string, password: string) => {
        try {
            const response = await fetch("/api/usuarios", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ username, email, password }),
            })

            if (!response.ok) {
                // Si la respuesta no es exitosa, lanzar un error
                const errorData = await response.json()
                throw new Error(errorData.error || "Error al crear el usuario")
            }

            const result = await response.json()

            // Si el usuario se creó correctamente, crear la sesión
            const mockUser = { id: Date.now(), username, role: "user", email }
            setUser(mockUser)
            localStorage.setItem("user", JSON.stringify(mockUser))
            return true
        } catch (error) {
            console.error("Error al registrar el usuario:", error)
            return false
        }
    }

    const logout = async () => {
        setUser(null)
        console.log(localStorage.getItem("user"))
        await fetch("/api/logout", {
            headers: {
                "Content-Type": "application/json",
            }
            , method: "POST",
            body: JSON.stringify({ id_user: localStorage.getItem("user").id }),
        })
        localStorage.removeItem("user")
    }

    return { user, login, register, logout }
}
