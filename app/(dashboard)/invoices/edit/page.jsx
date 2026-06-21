import { query } from "@/lib/db";
import EditClient from "./EditClient";

export default async function InvoiceEditPage({ searchParams }) {
    const params = await searchParams;
    const code = params.code;
    
    if (!code) {
        return <div style={{ padding: '124px 24px' }}>No invoice code provided. Please provide a valid code in the URL (e.g. ?code=DH0001).</div>;
    }

    const rows = await query("SELECT id FROM invoices WHERE invoice_code = ?", [code]);
    
    if (!rows || rows.length === 0) {
        return <div style={{ padding: '124px 24px' }}>Invoice not found for code: {code}</div>;
    }

    return <EditClient invoiceId={rows[0].id} invoiceCode={code} />;
}
