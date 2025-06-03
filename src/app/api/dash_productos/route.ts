import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
    try {
        const query = `
      SELECT p.*, c.nombre as categoria, u.nombre as ubicacion_nombre
      FROM productos p
      LEFT JOIN categorias c ON p.id_categoria = c.id
      LEFT JOIN ubicaciones u ON p.id_ubicacion = u.id
      ORDER BY p.id DESC
    `
        const [productos] = await db.query(query)
        return NextResponse.json(productos)
    } catch (error) {
        console.error("Error fetching productos:", error)
        return NextResponse.json({ error: "Error fetching productos" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { nombre, id_ubicacion, cantidad, unidad, estado, precio_unidad, id_categoria } = body

        const query = `
      INSERT INTO productos (nombre, id_ubicacion, cantidad, unidad, estado, precio_unidad, id_categoria)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `
        const [result] = await db.query(query, [
            nombre,
            id_ubicacion,
            cantidad,
            unidad,
            estado,
            precio_unidad,
            id_categoria,
        ])

        return NextResponse.json({ success: true, result })
    } catch (error) {
        console.error("Error creating producto:", error)
        return NextResponse.json({ error: "Error creating producto" }, { status: 500 })
    }
}
