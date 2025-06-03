import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
    try {
        const query = `
      SELECT p.*, u.nombre as ubicacion_nombre 
      FROM plantas p 
      LEFT JOIN ubicaciones u ON p.id_ubicacion = u.id 
      ORDER BY p.fecha_registro DESC
    `
        const [plantas] = await db.query(query)
        return NextResponse.json(plantas)
    } catch (error) {
        console.error("Error fetching plantas:", error)
        return NextResponse.json({ error: "Error fetching plantas" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { nombre_cientifico, nombre_comun, estado, descripcion, id_ubicacion } = body

        const query = `
      INSERT INTO plantas (nombre_cientifico, nombre_comun, estado, descripcion, id_ubicacion)
      VALUES (?, ?, ?, ?, ?)
    `
        const [result] = await db.query(query, [nombre_cientifico, nombre_comun, estado, descripcion, id_ubicacion])

        return NextResponse.json({ success: true, result })
    } catch (error) {
        console.error("Error creating planta:", error)
        return NextResponse.json({ error: "Error creating planta" }, { status: 500 })
    }
}
