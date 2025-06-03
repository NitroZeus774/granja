import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
    try {
        // Obtener estadísticas generales
        const [totalAnimalesResult] = await db.query("SELECT COUNT(*) as total FROM animales")
        const [totalPlantasResult] = await db.query("SELECT COUNT(*) as total FROM plantas")
        const [totalProductosResult] = await db.query("SELECT COUNT(*) as total FROM productos")
        const [ventasMensualesResult] = await db.query(
            "SELECT COALESCE(SUM(precio_total), 0) as total FROM ventas WHERE MONTH(fecha_venta) = MONTH(CURRENT_DATE())",
        )
        const [animalesPorEstadoResult] = await db.query("SELECT estado, COUNT(*) as count FROM animales GROUP BY estado")
        const [plantasPorEstadoResult] = await db.query("SELECT estado, COUNT(*) as count FROM plantas GROUP BY estado")
        const [productosPorEstadoResult] = await db.query("SELECT estado, COUNT(*) as count FROM productos GROUP BY estado")
        const [ventasPorMetodoResult] = await db.query(
            "SELECT metodo_pago, COUNT(*) as count FROM ventas GROUP BY metodo_pago",
        )

        // Extraer valores de los resultados
        const totalAnimales =
            Array.isArray(totalAnimalesResult) && totalAnimalesResult.length > 0
                ? (totalAnimalesResult[0] as any).total || 0
                : 0

        const totalPlantas =
            Array.isArray(totalPlantasResult) && totalPlantasResult.length > 0 ? (totalPlantasResult[0] as any).total || 0 : 0

        const totalProductos =
            Array.isArray(totalProductosResult) && totalProductosResult.length > 0
                ? (totalProductosResult[0] as any).total || 0
                : 0

        const ventasMensuales =
            Array.isArray(ventasMensualesResult) && ventasMensualesResult.length > 0
                ? (ventasMensualesResult[0] as any).total || 0
                : 0

        const stats = {
            totalAnimales,
            totalPlantas,
            totalProductos,
            ventasMensuales,
            animalesPorEstado: animalesPorEstadoResult || [],
            plantasPorEstado: plantasPorEstadoResult || [],
            productosPorEstado: productosPorEstadoResult || [],
            ventasPorMetodo: ventasPorMetodoResult || [],
        }

        return NextResponse.json(stats)
    } catch (error) {
        console.error("Error fetching dashboard stats:", error)
        return NextResponse.json({ error: "Error fetching dashboard stats" }, { status: 500 })
    }
}
