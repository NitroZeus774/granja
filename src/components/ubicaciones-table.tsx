"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Ubicacion {
    id: number
    nombre: string
    capacidad: number
    ocupacion_animales: number
    ocupacion_plantas: number
    tipo_produccion: string
    descripcion: string
}

// Función helper para formatear valores numéricos de forma segura
const safeNumber = (value: any): number => {
    if (value === null || value === undefined) return 0
    const num = Number(value)
    return isNaN(num) ? 0 : num
}

// Función helper para calcular porcentaje de forma segura
const calculatePercentage = (value: number, total: number): number => {
    if (total <= 0) return 0
    return Math.min(100, Math.max(0, (value / total) * 100))
}

export function UbicacionesTable() {
    const [ubicaciones, setUbicaciones] = useState<Ubicacion[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchUbicaciones() {
            try {
                setLoading(true)
                setError(null)
                const response = await fetch("/api/ubicaciones")

                if (!response.ok) {
                    throw new Error(`Error al cargar ubicaciones: ${response.status}`)
                }

                const data = await response.json()

                // Asegurarse de que data sea un array
                if (!Array.isArray(data)) {
                    throw new Error("Formato de datos incorrecto")
                }

                setUbicaciones(data)
            } catch (error) {
                console.error("Error fetching ubicaciones:", error)
                setError("Error al cargar los datos de ubicaciones")
            } finally {
                setLoading(false)
            }
        }

        fetchUbicaciones()
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
                    <div className="text-sm text-muted-foreground">Cargando ubicaciones...</div>
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
                        <TableHead>Nombre</TableHead>
                        <TableHead>Tipo de Producción</TableHead>
                        <TableHead>Capacidad</TableHead>
                        <TableHead>Ocupación</TableHead>
                        <TableHead>Descripción</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {ubicaciones.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                No hay ubicaciones registradas
                            </TableCell>
                        </TableRow>
                    ) : (
                        ubicaciones.map((ubicacion) => {
                            // Asegurar que los valores sean números válidos
                            const capacidad = safeNumber(ubicacion.capacidad)
                            const ocupacionAnimales = safeNumber(ubicacion.ocupacion_animales)
                            const ocupacionPlantas = safeNumber(ubicacion.ocupacion_plantas)
                            const ocupacionTotal = ocupacionAnimales + ocupacionPlantas
                            const porcentajeOcupacion = calculatePercentage(ocupacionTotal, capacidad)

                            return (
                                <TableRow key={ubicacion.id || `ubicacion-${Math.random()}`}>
                                    <TableCell className="font-medium">{ubicacion.id || "N/A"}</TableCell>
                                    <TableCell>{ubicacion.nombre || "Sin nombre"}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{ubicacion.tipo_produccion || "Sin tipo"}</Badge>
                                    </TableCell>
                                    <TableCell>{capacidad}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Progress
                                                value={porcentajeOcupacion}
                                                className="h-2 w-20 bg-secondary"
                                                indicatorClassName="bg-primary"
                                            />
                                            <span className="text-xs">{porcentajeOcupacion.toFixed(0)}%</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="max-w-[200px] truncate">{ubicacion.descripcion || "Sin descripción"}</TableCell>
                                </TableRow>
                            )
                        })
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
