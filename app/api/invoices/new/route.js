import { query } from "@/lib/db";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function POST(req) {
    try {
        const body = await req.json();
        const { 
            user_id, order_id, invoice_code, invoice_sequence, order_code, 
            invoice_date, due_date, bill_to_name, subject, subtotal, status, remark, 
            advance_received, discount, total_amount, invoice_items 
        } = body;
        
        // 1. Get the admin ID from the authentication token securely
        let token = req.headers.get("Authorization")?.split(" ")[1];
        if (!token) {
            token = req.cookies.get("token")?.value;
        }
        
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        
        // Use the ID from the payload (assuming it's stored as `id` or `admin_id`)
        const created_by_admin_id = payload.admin_id || payload.id;

        const invoice_created = await query(
            `INSERT INTO invoices 
            (user_id, order_id, created_by_admin_id, invoice_code, invoice_sequence, order_code, 
             invoice_date, due_date, bill_to_name, subject, subtotal, status, remark, 
             advance_received, discount, total_amount, tax_amount) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`,
            [
                user_id, order_id, created_by_admin_id, invoice_code, invoice_sequence, order_code, 
                invoice_date, due_date, bill_to_name, subject, subtotal, status, remark, 
                advance_received, discount, total_amount
            ]
        );
        
        if (invoice_items && invoice_items.length > 0) {
            for (const item of invoice_items) {
                await query(
                    "INSERT INTO invoice_items (invoice_id, description, quantity, unit_price, line_total, service_name) VALUES (?, ?, ?, ?, ?, '')",
                    [invoice_created.insertId, item.description, item.quantity, item.unit_price, item.line_total]
                );
            }
        }
        
        return NextResponse.json({ message: "Invoice created successfully", id: invoice_created.insertId });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error", details: err.message }, { status: 500 });
    }
}
