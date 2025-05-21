import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from 'gr/lib/db';

export async function POST(req: Request) {
    try {
        const ip = req.headers.get('x-forwarded-for') || 'ip_desconocida';
        const { nombre, correo, password } = await req.json();
        console.log('Datos recibidos:', { nombre, correo, password });
        if (!nombre || !correo || !password ) {
            return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
        }

        await db.query('SET @IP_CLIENTE = ?', [ip]);

        const [existing]: any = await db.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
        if (existing.length > 0) {
            return NextResponse.json({ error: 'El correo ya está registrado' }, { status: 409 });
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        await db.query(
            'INSERT INTO usuarios (nombre, correo, clave, bloqueado) VALUES (?, ?, ?, 0)',
            [nombre, correo, hashedPassword]
        );

        return NextResponse.json({ mensaje: 'Usuario registrado exitosamente' }, { status: 201 });
    } catch (error) {
        console.error('Error en el registro:', error);
        return NextResponse.json(
            { error: 'Error en el servidor al registrar el usuario' },
            { status: 500 }
        );
    }
}
