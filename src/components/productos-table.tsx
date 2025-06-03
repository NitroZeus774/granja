"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Producto {
    id: number
    nombre: string
    cantidad: number
    unidad: string
    estado: "Disponible" | "Reservado" | "Vencido" | "Dañado"
    precio_unidad: number
    categoria: string
    ubicacion_nombre: string
}

// Función helper para formatear precios de forma segura
const formatPrice = (price: any): string => {
    if (price === null || price === undefined) return "0.00"
    const numPrice = Number(price)
    return isNaN(numPrice) ? "0.00" : numPrice.toFixed(2)
}

export function ProductosTable() {
    const [productos, setProductos] = useState<Producto[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchProductos() {
            try {
                const response = await fetch("/api/productos")
                const data = await response.json()
                setProductos(data)
            } catch (error) {
                console.error("Error fetching productos:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchProductos()
    }, [])

    if (loading) {
        return (
            <div className="rounded-md border">
                <div className="p-8 text-center">
                    <div className="text-sm text-muted-foreground">Cargando productos...</div>
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
                        <TableHead>Cantidad</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Categoría</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {productos.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                No hay productos registrados
                            </TableCell>
                        </TableRow>
                    ) : (
                        productos.map((producto) => (
                            <TableRow key={producto.id}>
                                <TableCell className="font-medium">{producto.id}</TableCell>
                                <TableCell>{producto.nombre}</TableCell>
                                <TableCell>
                                    {producto.cantidad} {producto.unidad}
                                </TableCell>
                                <TableCell>${formatPrice(producto.precio_unidad)}</TableCell>
                                <TableCell>
                                    <Badge
                                        className={
                                            producto.estado === "Disponible"
                                                ? "bg-primary"
                                                : producto.estado === "Reservado"
                                                    ? "bg-amber-500"
                                                    : "bg-red-500"
                                        }
                                    >
                                        {producto.estado}
                                    </Badge>
                                </TableCell>
                                <TableCell>{producto.categoria || "Sin categoría"}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
