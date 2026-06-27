import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        
        if (!id) {
            return NextResponse.json({ error: "Customer ID is required" }, { status: 400 });
        }

        // Fetch invoices for this user
        const invoices = await query(
            "SELECT id, invoice_code, invoice_date, total_amount, status, order_code FROM invoices WHERE user_id = ?",
            [id]
        );

        return NextResponse.json(invoices);
    } catch (error) {
        console.error("Error fetching customer invoices:", error);
        return NextResponse.json({ error: "Server error", details: error.message }, { status: 500 });
    }
}