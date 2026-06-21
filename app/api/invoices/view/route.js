import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get("id");
        const invoices = await query(
            `SELECT i.*, u.display_name AS customer_name, u.email, u.phone 
             FROM invoices i 
             LEFT JOIN users u ON i.user_id = u.id 
             WHERE i.id = ?`, 
            [id]
        );
        const items = await query("SELECT * FROM invoice_items WHERE invoice_id = ?", [id]);
        return NextResponse.json({invoice: invoices, items});
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}