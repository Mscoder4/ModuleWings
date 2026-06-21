"use client";

import { useEffect, useState } from "react";

export default function PreviewClient({ invoiceId }) {
    const [htmlContent, setHtmlContent] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPreview = async () => {
            try {
                // Fetch invoice data using the provided API route
                const res = await fetch(`/api/invoices/view?id=${invoiceId}`);
                if (!res.ok) throw new Error("Failed to fetch invoice");
                const data = await res.json();
                
                const invoice = data.invoice[0];
                const items = data.items;

                // Fetch template HTML
                const templateRes = await fetch('/assets/template_pdf.html');
                let tpl = await templateRes.text();

                // Format helpers
                const formatDate = (dateString) => {
                    if (!dateString) return "";
                    const date = new Date(dateString);
                    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    return `${String(date.getDate()).padStart(2, '0')} ${months[date.getMonth()]} ${date.getFullYear()}`;
                };

                const formatCurrency = (amount) => {
                    return `₹&nbsp;${parseFloat(amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                };

                const clientName = (invoice.bill_to_name || "").trim() || "Client Name";
                const subtotal = parseFloat(invoice.subtotal) || 0;
                const total = parseFloat(invoice.total_amount) || 0;
                const discount = parseFloat(invoice.discount) || 0;
                const advance = parseFloat(invoice.advance_received) || 0;

                // Build items HTML rows
                let itemsHtml = "";
                items.forEach((it, i) => {
                    const n = i + 1;
                    const desc = it.description || it.service_name || "";
                    // Use standard JavaScript logic mimicking PHP's rtrim(rtrim(number_format, '0'), '.')
                    const qtyRaw = parseFloat(it.quantity).toFixed(2);
                    const qty = parseFloat(qtyRaw).toString(); 
                    
                    const rate = formatCurrency(it.unit_price);
                    const amt = formatCurrency(it.line_total);
                    itemsHtml += `
                        <tr>
                            <td class="col-hash">${n}</td>
                            <td class="col-desc">${desc}</td>
                            <td class="col-qty center">${qty}</td>
                            <td class="col-rate center">${rate}</td>
                            <td class="col-amt center">${amt}</td>
                        </tr>
                    `;
                });

                const discRow = discount > 0 ? `<tr><td class="lbl">- Discount</td><td class="val">${formatCurrency(discount)}</td></tr>` : "";
                const advRow = advance > 0 ? `<tr><td class="lbl">- Advance</td><td class="val">${formatCurrency(advance)}</td></tr>` : "";

                // Fix DPI discrepancies in browser preview by forcing pixel dimensions instead of mm
                tpl = tpl.replace('width: 210mm;', 'width: 794px;');
                tpl = tpl.replace('height: 297mm;', 'height: 1123px;');

                // Replace text placeholders
                tpl = tpl.replace('{{CLIENT_NAME}}', clientName);
                tpl = tpl.replace('{{INVOICE_DATE}}', formatDate(invoice.invoice_date));
                tpl = tpl.replace('{{INVOICE_CODE}}', invoice.invoice_code || "");
                tpl = tpl.replace('{{SUBJECT}}', invoice.subject || "");
                tpl = tpl.replace('{{ITEMS_BODY}}', itemsHtml);
                tpl = tpl.replace('{{DISCOUNT_ROW}}', discRow);
                tpl = tpl.replace('{{ADVANCE_ROW}}', advRow);
                tpl = tpl.replace('{{SUBTOTAL}}', formatCurrency(subtotal));
                tpl = tpl.replace('{{TOTAL}}', formatCurrency(total));
                tpl = tpl.replace('{{DUE_DATE}}', formatDate(invoice.due_date));
                tpl = tpl.replace('{{TOTAL_DUE}}', `₹&nbsp;${Math.round(total).toLocaleString('en-IN')}`);
                
                // Replace image and font placeholders with static asset paths (instead of base64 used in PHP for DOMPDF)
                tpl = tpl.replace('{{LOGO_SRC}}', '/assets/images/6.png');
                tpl = tpl.replace('{{SIGN_SRC}}', '/assets/images/danishsig.svg');
                
                tpl = tpl.replace('{{FONT_REG}}', '/assets/fonts/satoshi/Satoshi-Regular.otf');
                tpl = tpl.replace('{{FONT_MED}}', '/assets/fonts/satoshi/Satoshi-Medium.otf');
                tpl = tpl.replace('{{FONT_BOLD}}', '/assets/fonts/satoshi/Satoshi-Bold.otf');
                tpl = tpl.replace('{{FONT_BLACK}}', '/assets/fonts/satoshi/Satoshi-Black.otf');
                
                tpl = tpl.replace('{{MANROPE_REG}}', '/assets/fonts/Manrope/static/Manrope-Regular.ttf');
                tpl = tpl.replace('{{MANROPE_MED}}', '/assets/fonts/Manrope/static/Manrope-SemiBold.ttf');
                tpl = tpl.replace('{{MANROPE_BOLD}}', '/assets/fonts/Manrope/static/Manrope-Bold.ttf');

                setHtmlContent(tpl);
            } catch (err) {
                console.error(err);
                setHtmlContent("<div style='padding: 20px;'>Error loading invoice preview</div>");
            } finally {
                setLoading(false);
            }
        };

        loadPreview();
    }, [invoiceId]);

    if (loading) {
        return <div style={{ padding: "20px" }}>Loading preview...</div>;
    }

    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
