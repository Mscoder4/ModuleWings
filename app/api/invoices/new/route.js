import {query} from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { client_id, invoice_date, total_amount } = await req.json();
        const res = await query(
            "INSERT INTO invoices (client_id, invoice_date, total_amount) VALUES (?, ?, ?)",
            [client_id, invoice_date, total_amount]
        );
        return NextResponse.json({ message: "Invoice created" });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}