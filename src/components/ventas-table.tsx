"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Venta {
    id: number
    producto_nombre: string
    cliente_nombre: string
    cantidad: number
    precio_total: number
    metodo_pago: "Efectivo" | "Tarjeta" | "Transferencia"
}

// Función helper para formatear precios de forma segura
const formatPrice = (price: any): string => {
    if (price === null || price === undefined) return "0.00"
    const numPrice = Number(price)
    return isNaN(numPrice) ? "0.00" : numPrice.toFixed(2)
}

export function VentasTable() {
    const [ventas, setVentas] = useState<Venta[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchVentas() {
            try {
                const response = await fetch("/api/ventas")
                const data = await response.json()
                setVentas(data)
            } catch (error) {
                console.error("Error fetching ventas:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchVentas()
    }, [])

    if (loading) {
        return (
            <div className="rounded-md border">
                <div className="p-8 text-center">
                    <div className="text-sm text-muted-foreground">Cargando ventas...</div>
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
                        <TableHead>Producto</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Cantidad</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Método de Pago</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {ventas.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                No hay ventas registradas
                            </TableCell>
                        </TableRow>
                    ) : (
                        ventas.map((venta) => (
                            <TableRow key={venta.id}>
                                <TableCell className="font-medium">{venta.id}</TableCell>
                                <TableCell>{venta.producto_nombre || "Producto eliminado"}</TableCell>
                                <TableCell>{venta.cliente_nombre || "Cliente eliminado"}</TableCell>
                                <TableCell>{venta.cantidad}</TableCell>
                                <TableCell>${formatPrice(venta.precio_total)}</TableCell>
                                <TableCell>
                                    <Badge
                                        className={
                                            venta.metodo_pago === "Efectivo"
                                                ? "bg-primary"
                                                : venta.metodo_pago === "Tarjeta"
                                                    ? "bg-accent"
                                                    : "bg-amber-500"
                                        }
                                    >
                                        {venta.metodo_pago}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
