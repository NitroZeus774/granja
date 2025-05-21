import { db } from "gr/lib/db";

export async function POST(request: Request) {
    try {

        const ip = request.headers.get('x-forwarded-for') || 'ip_desconocida';
        await db.query('SET @IP_CLIENTE = ?', [ip]);
        const {bloqueado, correo, id, id_rol, nombre } = await request.json();
        const [rows] = await db.query("Update usuarios set nombre = ?, correo = ?, id_rol = ?, bloqueado = ? where id = ?", [nombre, correo,id_rol ,bloqueado , id]);

        return new Response(JSON.stringify(rows), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error al realizar la consulta:", error);
        return new Response(
            JSON.stringify({ error: "Error al obtener los datos" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}