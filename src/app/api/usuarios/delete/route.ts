import { db } from "gr/lib/db";

export async function POST(request: Request) {
    try {
        const id = await request.json()
        await db.query("update usuarios set activo = 0 where id = ?", [id]);

        return new Response(JSON.stringify("message: usuario eliminado exitosamente"), {
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