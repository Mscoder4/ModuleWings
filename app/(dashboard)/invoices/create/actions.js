"use server";

import { query } from "@/lib/db";

export async function getNextInvoiceSequence(userId) {
    if (!userId) return 1;
    try {
        const rows = await query("SELECT COALESCE(MAX(invoice_sequence), 0) AS m FROM invoices WHERE user_id = ?", [userId]);
        const m = parseInt(rows[0]?.m || 0, 10);
        return m + 1;
    } catch (err) {
        console.error("Error fetching next invoice sequence:", err);
        return 1;
    }
}
