import { db } from "gr/lib/db";

export async function POST(request: Request) {
    const { id_user } = await request.json();
    console.log("logout: ",id_user)
    db.query("update historial_inicio_sesion set fecha_fin = NOW() where id = ?", [id_user]);
    return new Response(
        JSON.stringify({ message: "Sesión cerrada" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
    );
}