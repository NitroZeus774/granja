import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const promise = await db.query("select * from rol");
        const roles = promise[0]
        return NextResponse.json(roles, { status: 200 });
    } catch (error) {
        console.error("Error fetching roles:", error);
        return NextResponse.json({ error: "Failed to fetch roles" }, { status: 500 });
    }
}