import { query } from "@/lib/db";
import PreviewClient from "./PreviewClient";

export default async function InvoicePreviewPage({ searchParams }) {
    const params = await searchParams;
    const code = params.code;
    
    if (!code) return <div>Invalid Invoice Code.</div>;

    const rows = await query("SELECT id FROM invoices WHERE invoice_code = ?", [code]);
    const id = rows[0]?.id;

    if (!id) return <div>Invoice not found.</div>;

    return <PreviewClient invoiceId={id} />;
}
