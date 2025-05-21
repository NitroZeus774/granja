import { db } from "gr/lib/db";

export async function POST(request: Request) {
    try {
        const ip = request.headers.get("x-forwarded-for") || "ip_desconocida";
        await db.query("SET @IP_CLIENTE = ?", [ip]);

        const {
            id,
            descripcion,
            id_usuario,
            id_animal,
            fecha_inicio,
            fecha_fin,
            estado,
        } = await request.json();

        const [rows] = await db.query(
            `UPDATE programacion_tareas 
             SET descripcion = ?, id_usuario = ?, id_animal = ?, fecha_inicio = ?, fecha_fin = ?, estado = ?
             WHERE id = ?`,
            [descripcion, id_usuario, id_animal, fecha_inicio, fecha_fin, estado, id]
        );

        return new Response(JSON.stringify(rows), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error al actualizar programación:", error);
        return new Response(
            JSON.stringify({ error: "Error al actualizar la programación" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
