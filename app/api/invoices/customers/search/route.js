import {query} from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const url = new URL(req.url);
        const search = url.searchParams.get("search");
        const users = await query("SELECT id,first_name,last_name,salutation,email FROM users WHERE first_name LIKE ? OR last_name LIKE ?", ["%" + search + "%", "%" + search + "%"]);
        return NextResponse.json({users});  
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}