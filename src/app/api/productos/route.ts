import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    try {
        const products = await db.query("select * from productos_categorias");
        const productos = products[0]
        return NextResponse.json({ productos }, { status: 200 })
    } catch (err) {
        return NextResponse.json({
            message: err
        }, { status: 401 })
    }
}