import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get("id");
        const orders = await query("SELECT id,order_code,service_number FROM orders WHERE user_id = ?", [id]);
        return NextResponse.json({orders});
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}