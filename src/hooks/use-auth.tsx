"use client"

import { useState, useEffect } from "react"

interface User {
    id: number
    username: string
    role: string
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check for stored user session
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
        setLoading(false)
    }, [])

    const login = async (username: string, password: string) => {

        const mockUser = { id: 1, username, role: "user" }
        setUser(mockUser)
        localStorage.setItem("user", JSON.stringify(mockUser))
        return mockUser
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("user")
    }

    const register = async (username: string, password: string) => {
        // Simulate registration - in real app, call API
        const mockUser = { id: Date.now(), username, role: "user" }
        setUser(mockUser)
        localStorage.setItem("user", JSON.stringify(mockUser))
        return mockUser
    }

    return {
        user,
        loading,
        login,
        logout,
        register,
    }
}
