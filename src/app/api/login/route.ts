import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from 'gr/lib/db';

const SECRET = process.env.JWT_SECRET || 'test';

export async function POST(req: Request) {
    const ip = req.headers.get('x-forwarded-for') || 'ip_desconocida';

    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Datos incompletos' }, { status: 401 });
        }

        // Establecer IP cliente
        await db.query('SET @IP_CLIENTE = ?', [ip]);

        // Buscar usuario
        const [users]: any = await db.query('SELECT * FROM usuarios WHERE correo = ?', [email]);
        if (!Array.isArray(users) || users.length === 0) {
            return NextResponse.json({ error: 'Usuario o contraseña incorrectos' }, { status: 401 });
        }

        const user = users[0];
        if (user.bloqueado) {
            return NextResponse.json({ error: 'Usuario actualmente bloqueado' }, { status: 401 });
        }

        // Buscar intentos previos
        const [intentosRows]: any = await db.query(
            'SELECT * FROM intentos_login WHERE id_usuario = ?',
            [user.id]
        );
        const intentos = intentosRows[0];
        console.log(intentos)
        if (intentos) {
            const [timeDiffRows]: any = await db.query(
                'SELECT TIMESTAMPDIFF(MINUTE, ?, NOW()) AS time_block',
                [intentos.ultimo_intento]
            );
            const time = timeDiffRows[0];

            if (time.time_block >= 5) {
                await db.query(
                    'UPDATE intentos_login SET bloqueado = 0, intentos = 0 WHERE id_usuario = ?',
                    [user.id]
                );
            }

            if (intentos.intentos >= 3) {
                return NextResponse.json({
                    error: `Usuario actualmente bloqueado, espere 5 minutos e intente de nuevo (trans... ${time.time_block})`
                }, { status: 401 });
            }
        }

        const contrasenaCorrecta = await bcrypt.compare(password, user.clave);
        if (contrasenaCorrecta) {
            const token = jwt.sign({ id: user.id, email: user.correo }, SECRET, { expiresIn: '1h' });

            // Insertar en historial de sesiones
            await db.query(
                'INSERT INTO historial_inicio_sesion (token, id_usuario, ip) VALUES (?, ?, ?)',
                [token, user.id, ip]
            );

            // Eliminar intentos si existen
            await db.query('DELETE FROM intentos_login WHERE id_usuario = ?', [user.id]);

            // Obtener nombre de rol
            const [rolRows]: any = await db.query(
                'SELECT nombre FROM rol WHERE id = ?',
                [user.id_rol]
            );
            const rol = rolRows[0]?.nombre || 'Desconocido';

            return NextResponse.json({
                mensaje: 'Login exitoso',
                user: user.nombre,
                email: user.correo,
                rol: rol,
                id_user: user.id,
                token: token
            }, { status: 200 });
        } else {
            // Si no existía en intentos_login, se inserta con 0 intentos
            if (!intentos) {
                await db.query(
                    'INSERT INTO intentos_login (id_usuario, intentos) VALUES (?, ?)',
                    [user.id, 0]
                );
            }

            // Registrar intento fallido
            await db.query('CALL registrar_intento_fallido(?)', [user.id]);

            return NextResponse.json({ error: 'Usuario o contraseña incorrectos' }, { status: 401 });
        }
    } catch (error) {
        console.error('Error en login:', error);
        return NextResponse.json(
            { error: 'Error en el servidor al procesar el login' },
            { status: 500 }
        );
    }
}
