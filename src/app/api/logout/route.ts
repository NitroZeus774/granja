import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    await db.query('SET @IP_CLIENTE = ?', [req.headers.get('x-forwarded-for')]);
    const user = await req.json();
    await db.query('update historial_inicio_sesion set fecha_fin = NOW() WHERE id_usuario = ? and fecha_fin is NULL', [user.id_user]);
    return NextResponse.json({ message: 'Sesión cerrada' }, { status: 200 });
}