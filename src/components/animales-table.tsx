"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Animal {
    id: number
    tipo: string
    peso: string
    nombre_cientifico: string
    nombre_comun: string
    estado: "Sano" | "Recuperacion" | "Enfermo"
    ubicacion_nombre: string
    fecha_registro: string
}

// Función helper para formatear valores de forma segura
const formatValue = (value: any): string => {
    if (value === null || value === undefined) return "N/A"
    return String(value)
}

export function AnimalesTable() {
    const [animales, setAnimales] = useState<Animal[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchAnimales() {
            try {
                setLoading(true)
                setError(null)
                const response = await fetch("/api/animales")

                if (!response.ok) {
                    throw new Error(`Error al cargar animales: ${response.status}`)
                }

                const data = await response.json()

                // Asegurarse de que data sea un array
                if (!Array.isArray(data)) {
                    throw new Error("Formato de datos incorrecto")
                }

                setAnimales(data)
            } catch (error) {
                console.error("Error fetching animales:", error)
                setError("Error al cargar los datos de animales")
            } finally {
                setLoading(false)
            }
        }

        fetchAnimales()
    }, [])

    if (error) {
        return (
            <div className="rounded-md border">
                <div className="p-8 text-center">
                    <div className="text-sm text-red-500">{error}</div>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="rounded-md border">
                <div className="p-8 text-center">
                    <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-primary border-r-transparent mb-4"></div>
                    <div className="text-sm text-muted-foreground">Cargando animales...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Nombre Común</TableHead>
                        <TableHead>Peso</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Ubicación</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {animales.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                No hay animales registrados
                            </TableCell>
                        </TableRow>
                    ) : (
                        animales.map((animal) => (
                            <TableRow key={animal.id || `animal-${Math.random()}`}>
                                <TableCell className="font-medium">{animal.id || "N/A"}</TableCell>
                                <TableCell>{formatValue(animal.tipo) === "N/A" ? "Sin tipo" : formatValue(animal.tipo)}</TableCell>
                                <TableCell>
                                    {formatValue(animal.nombre_comun) === "N/A" ? "Sin nombre" : formatValue(animal.nombre_comun)}
                                </TableCell>
                                <TableCell>{formatValue(animal.peso)}</TableCell>
                                <TableCell>
                                    <Badge
                                        className={
                                            animal.estado === "Sano"
                                                ? "bg-primary"
                                                : animal.estado === "Recuperacion"
                                                    ? "bg-amber-500"
                                                    : "bg-red-500"
                                        }
                                    >
                                        {animal.estado || "Desconocido"}
                                    </Badge>
                                </TableCell>
                                <TableCell>{animal.ubicacion_nombre || "Sin ubicación"}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
