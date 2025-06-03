import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
    try {
        const query = `
      SELECT c.*, 
        COALESCE(SUM(v.precio_total), 0) as total_compras,
        COUNT(v.id) as total_ventas
      FROM clientes c
      LEFT JOIN ventas v ON c.id = v.id_cliente
      GROUP BY c.id
      ORDER BY c.fecha_registro DESC
    `
        const [clientes] = await db.query(query)
        return NextResponse.json(clientes)
    } catch (error) {
        console.error("Error fetching clientes:", error)
        return NextResponse.json({ error: "Error fetching clientes" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { nombre, contacto, notas } = body

        const query = `
      INSERT INTO clientes (nombre, contacto, notas)
      VALUES (?, ?, ?)
    `
        const [result] = await db.query(query, [nombre, contacto, notas])

        return NextResponse.json({ success: true, result })
    } catch (error) {
        console.error("Error creating cliente:", error)
        return NextResponse.json({ error: "Error creating cliente" }, { status: 500 })
    }
}
