import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET() {
    try {
        const promise = await db.query("SELECT * FROM users");
        const users = await promise[0];
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const { username, email, password } = await request.json();

    try {

        const ip = request.headers.get('x-forwarded-for');
        await db.query("set @IP_CLIENTE = ?", [ip]);
        const hash = await bcrypt.hash(password, 10);
        await db.query("INSERT INTO usuarios (nombre, correo, clave) VALUES (?, ?, ?)", [username, email, hash]);
        
        return NextResponse.json({ status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}