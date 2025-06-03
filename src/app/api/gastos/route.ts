import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
    try {
        const query = `
      SELECT * FROM gastos 
      ORDER BY fecha DESC
    `
        const [gastos] = await db.query(query)
        return NextResponse.json(gastos)
    } catch (error) {
        console.error("Error fetching gastos:", error)
        return NextResponse.json({ error: "Error fetching gastos" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { tipo_gasto, monto, fecha } = body

        const query = `
      INSERT INTO gastos (tipo_gasto, monto, fecha)
      VALUES (?, ?, ?)
    `
        const [result] = await db.query(query, [tipo_gasto, monto, fecha])

        return NextResponse.json({ success: true, result })
    } catch (error) {
        console.error("Error creating gasto:", error)
        return NextResponse.json({ error: "Error creating gasto" }, { status: 500 })
    }
}
