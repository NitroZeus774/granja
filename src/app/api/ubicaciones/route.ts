import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
    try {
        const query = `
      SELECT u.*, 
        (SELECT COUNT(*) FROM animales WHERE id_ubicacion = u.id) as ocupacion_animales,
        (SELECT COUNT(*) FROM plantas WHERE id_ubicacion = u.id) as ocupacion_plantas
      FROM ubicaciones u
      ORDER BY u.nombre
    `
        const [ubicaciones] = await db.query(query)
        return NextResponse.json(ubicaciones)
    } catch (error) {
        console.error("Error fetching ubicaciones:", error)
        return NextResponse.json({ error: "Error fetching ubicaciones" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { nombre, capacidad, tipo_produccion, descripcion } = body

        const query = `
      INSERT INTO ubicaciones (nombre, capacidad, tipo_produccion, descripcion)
      VALUES (?, ?, ?, ?)
    `
        const [result] = await db.query(query, [nombre, capacidad, tipo_produccion, descripcion])

        return NextResponse.json({ success: true, result })
    } catch (error) {
        console.error("Error creating ubicacion:", error)
        return NextResponse.json({ error: "Error creating ubicacion" }, { status: 500 })
    }
}
