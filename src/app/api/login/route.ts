import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export async function POST(req: Request) {

    function esHashBcrypt(cadena: string) {
        return typeof cadena === 'string' && cadena.startsWith('$2b$') && cadena.length === 60
    }

    async function verify_hasher(pass: string) {
        if (!esHashBcrypt(pass)) {
            const nuevaHash = await bcrypt.hash(pass, 10)
            return nuevaHash;
        }
        else {
            return null;
        }
    }

    const ip = req.headers.get('x-forwarded-for');
    await db.query('SET @IP_CLIENTE = ?', [ip === "::1" ? "127.0.0.1" : ip]);
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Datos incompletos' }, { status: 401 });
        }

        const [users]: any = await db.query('SELECT * FROM usuarios WHERE correo = ?', [email]);
        if (!Array.isArray(users) || users.length === 0) {
            return NextResponse.json({ error: 'Usuario o contraseña incorrectos' }, { status: 401 });
        }

        const user = users[0];
        if (user.bloqueado) {
            return NextResponse.json({ error: 'Usuario actualmente bloqueado, si cree que se trata de un error comuniquese con un administrador' }, { status: 401 });
        }

        await db.query('set @IP_CLIENTE = ?', [ip])
        const [intentosRows] = await db.query(
            'SELECT * FROM intentos_login WHERE id_usuario = ?',
            [user.id]
        );

        const intentos = intentosRows[0];
        if (intentos) {

            const [timeDiffRows]: any = await db.query(
                'SELECT TIMESTAMPDIFF(MINUTE, ?, NOW()) AS time_block',
                [intentos.ultimo_intento]
            );
            const time = timeDiffRows[0];
            console.log(time)
            if (time && time.time_block >= 5) {
                await db.query(
                    'update intentos_login set intentos = 0, bloqueado = 0 where id_usuario = ?',
                    [user.id]
                );
            }

            else if (intentos.intentos >= 3) {
                return NextResponse.json({
                    error: `Usuario actualmente bloqueado, espere 5 minutos e intente de nuevo (trans... ${time.time_block})`
                }, { status: 401 });
            }
        }
        const hash = await verify_hasher(user.clave)
        if (hash !== null) {
            db.query('update usuarios set clave = ? where id = ?', [hash, user.id])
        }

        const contrasenaCorrecta = await bcrypt.compare(password, hash ? hash : user.clave);

        if (contrasenaCorrecta) {

            db.query(
                'INSERT INTO historial_inicio_sesion (id_usuario) VALUES (?)',
                [user.id]
            );
            db.query('delete from intentos_login where id_usuario = ?', [user.id])
            const r = await db.query('select nombre from rol where id = ?', [user.id_rol])
            const lr = r[0]
            return NextResponse.json({
                mensaje: 'Login exitoso',
                user: user.nombre,
                email: user.correo,
                id_user: user.id,
                rol: lr[0].nombre,
            }, { status: 200 });
        }
        else if (!intentos) {
            await db.query(
                'INSERT INTO intentos_login (id_usuario, intentos, ultimo_intento) VALUES (?, ?, NOW())',
                [user.id, 0]
            );
        }
        await db.query('CALL registrar_intento_fallido(?)', [user.id]);
        return NextResponse.json({ error: 'Usuario o contraseña incorrectos' }, { status: 401 });
    } catch (error) {
        console.error('Error en login:', error);
        return NextResponse.json(
            { error: 'Error en el servidor al procesar el login' },
            { status: 500 }
        );
    }
}
