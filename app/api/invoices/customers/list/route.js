import {query} from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const users = await query("SELECT id,first_name,last_name,salutation,email FROM users");
        return NextResponse.json({users});
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}