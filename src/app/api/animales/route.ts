import { db } from "gr/lib/db";

export async function GET(request: Request) {
    try {

        const [rows] = await db.query("SELECT * FROM animales");

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