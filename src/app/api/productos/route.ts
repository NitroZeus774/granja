import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
    try {

        const promise = await db.query("select * from productos")
        const productos = promise[0]
        return NextResponse.json(productos)
    } catch (error) {
        console.error("Error fetching productos:", error)
        return NextResponse.json({ error: "Error fetching productos" }, { status: 500 })
    }
}