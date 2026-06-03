import {query} from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    // await authenticate(req);
    try {
        const invoices = await query("SELECT invoice_date,due_date,invoice_code,order_code,bill_to_name,status,total_amount,advance_received FROM invoices");
        return NextResponse.json(invoices);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}