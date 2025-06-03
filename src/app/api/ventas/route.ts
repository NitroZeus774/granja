import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
    try {
        const query = `
      SELECT v.*, p.nombre as producto_nombre, c.nombre as cliente_nombre
      FROM ventas v
      LEFT JOIN productos p ON v.id_producto = p.id
      LEFT JOIN clientes c ON v.id_cliente = c.id
      ORDER BY v.id DESC
    `
        const [ventas] = await db.query(query)
        return NextResponse.json(ventas)
    } catch (error) {
        console.error("Error fetching ventas:", error)
        return NextResponse.json({ error: "Error fetching ventas" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { id_producto, id_cliente, cantidad, precio_total, descuento, metodo_pago } = body

        const query = `
      INSERT INTO ventas (id_producto, id_cliente, cantidad, precio_total, descuento, metodo_pago)
      VALUES (?, ?, ?, ?, ?, ?)
    `
        const [result] = await db.query(query, [id_producto, id_cliente, cantidad, precio_total, descuento, metodo_pago])

        return NextResponse.json({ success: true, result })
    } catch (error) {
        console.error("Error creating venta:", error)
        return NextResponse.json({ error: "Error creating venta" }, { status: 500 })
    }
}
