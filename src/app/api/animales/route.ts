import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
    try {
        const query = `
      SELECT a.*, u.nombre as ubicacion_nombre 
      FROM animales a 
      LEFT JOIN ubicaciones u ON a.id_ubicacion = u.id 
      ORDER BY a.fecha_registro DESC
    `
        const [animales] = await db.query(query)
        return NextResponse.json(animales)
    } catch (error) {
        console.error("Error fetching animales:", error)
        return NextResponse.json({ error: "Error fetching animales" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { tipo, peso, nombre_cientifico, nombre_comun, estado, descripcion, id_ubicacion } = body

        const query = `
      INSERT INTO animales (tipo, peso, nombre_cientifico, nombre_comun, estado, descripcion, id_ubicacion)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `
        const [result] = await db.query(query, [
            tipo,
            peso,
            nombre_cientifico,
            nombre_comun,
            estado,
            descripcion,
            id_ubicacion,
        ])

        return NextResponse.json({ success: true, result })
    } catch (error) {
        console.error("Error creating animal:", error)
        return NextResponse.json({ error: "Error creating animal" }, { status: 500 })
    }
}
