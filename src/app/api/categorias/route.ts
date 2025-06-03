import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const c = await db.query("SELECT id, nombre FROM categorias ORDER BY nombre ASC");
        return NextResponse.json({ categorias: c[0] }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}