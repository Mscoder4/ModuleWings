import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const sql = `
            SELECT 
                u.id, u.display_name, u.company_name, u.email, u.phone,
                COALESCE(SUM(CASE WHEN i.status IN ('unpaid', 'overdue', 'verified') THEN (i.total_amount - i.advance_received) ELSE 0 END), 0) as receivables
            FROM users u
            LEFT JOIN invoices i ON u.id = i.user_id
            WHERE u.is_active = 1
            GROUP BY u.id
            ORDER BY u.display_name ASC
        `;
        const result = await query(sql);
        return NextResponse.json({ users: result });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}