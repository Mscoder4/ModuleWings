"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function RecordPaymentPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    // Default to 1 if no invoice ID provided, for demo purposes
    const invoiceId = parseInt(searchParams.get("id")) || 1;

    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [loadingCustomers, setLoadingCustomers] = useState(true);

    const [invoiceData, setInvoiceData] = useState(null);
    const [templateHtml, setTemplateHtml] = useState("");
    const [previewHtml, setPreviewHtml] = useState("");

    // Form states
    const [paymentNo, setPaymentNo] = useState("");
    const [bankCharges, setBankCharges] = useState("");
    const [paymentDate, setPaymentDate] = useState("");
    const [paymentMode, setPaymentMode] = useState("Cash");
    const [paymentReceivedOn, setPaymentReceivedOn] = useState("");
    const [notes, setNotes] = useState("");
    const [sendThankYou, setSendThankYou] = useState(false);

    const previewContainerRef = useRef(null);
    const [previewScale, setPreviewScale] = useState(1);
    const [previewMarginBottom, setPreviewMarginBottom] = useState(0);

    const resizeIframe = useCallback(() => {
        if (previewContainerRef.current) {
            const availableWidth = previewContainerRef.current.clientWidth;
            const requiredWidth = 595 + 40 + 2; // width + padding + border
            if (availableWidth < requiredWidth) {
                const scale = availableWidth / requiredWidth;
                setPreviewScale(scale);
                setPreviewMarginBottom(-((842 + 40 + 2) * (1 - scale)));
            } else {
                setPreviewScale(1);
                setPreviewMarginBottom(0);
            }
        }
    }, []);

    useEffect(() => {
        window.addEventListener('resize', resizeIframe);
        setTimeout(resizeIframe, 10);
        return () => window.removeEventListener('resize', resizeIframe);
    }, [resizeIframe]);

    // Fetch Customers for the left pane
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const res = await fetch("/api/customers/list");
                if (res.ok) {
                    const data = await res.json();
                    setCustomers(data.users || []);
                    setFilteredCustomers(data.users || []);
                }
            } catch (err) {
                console.error("Error fetching customers:", err);
            } finally {
                setLoadingCustomers(false);
            }
        };
        fetchCustomers();
    }, []);

    // Fetch Template
    useEffect(() => {
        fetch('/assets/template_pdf.html')
            .then(res => res.text())
            .then(text => setTemplateHtml(text))
            .catch(err => console.error("Error fetching template:", err));
    }, []);

    // Fetch Invoice details
    useEffect(() => {
        if (!invoiceId) return;

        const fetchInvoice = async () => {
            try {
                const res = await fetch(`/api/invoices/view?id=${invoiceId}`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.invoice && data.invoice.length > 0) {
                        const inv = data.invoice[0];
                        setInvoiceData({
                            ...inv,
                            items: data.items || []
                        });
                        setPaymentNo(inv.invoice_code || "INV-" + inv.id);

                        // Default date to today
                        const today = new Date().toISOString().split('T')[0];
                        setPaymentDate(today);
                        setPaymentReceivedOn(today);
                    }
                }
            } catch (err) {
                console.error("Error fetching invoice:", err);
            }
        };
        fetchInvoice();
    }, [invoiceId]);

    // Build Preview HTML
    useEffect(() => {
        if (!templateHtml || !invoiceData) return;

        let html = templateHtml;
        const origin = typeof window !== "undefined" ? window.location.origin : "";
        const baseUrl = origin;

        const formatMoney = (val) => {
            if (val === null || val === undefined) return "0.00";
            return parseFloat(val).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        };

        // Format dates
        let invDateFormatted = invoiceData.invoice_date;
        if (invDateFormatted) {
            const d = new Date(invDateFormatted);
            invDateFormatted = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        }

        let dueDateFormatted = invoiceData.due_date;
        if (dueDateFormatted) {
            const d = new Date(dueDateFormatted);
            dueDateFormatted = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        }

        // Build items HTML
        let itemsHtml = "";
        if (invoiceData.items && invoiceData.items.length > 0) {
            itemsHtml = invoiceData.items.map((item, index) => {
                return `
                <tr>
                    <td class="col-hash" style="text-align: center;"><p style="text-align: center;">${index + 1}</p></td>
                    <td class="col-desc"><p>${item.description || ''}</p></td>
                    <td class="col-qty center">${item.quantity || 1}</td>
                    <td class="col-rate center">${item.unit_price ? formatMoney(item.unit_price) : ''}</td>
                    <td class="col-amt center">${formatMoney(item.line_total)}</td>
                </tr>`;
            }).join('');
        }

        const subtotal = invoiceData.subtotal || 0;
        const total = invoiceData.total_amount || 0;
        const advVal = invoiceData.advance_received || 0;
        const discountVal = invoiceData.discount || 0;

        const reps = {
            '{{CLIENT_NAME}}': invoiceData.customer_name || invoiceData.bill_to_name || "Client Name",
            '{{INVOICE_DATE}}': invDateFormatted || '',
            '{{INVOICE_CODE}}': invoiceData.invoice_code || '',
            '{{SUBJECT}}': invoiceData.subject || '',
            '{{ITEMS_BODY}}': itemsHtml,
            '{{SUBTOTAL}}': formatMoney(subtotal),
            '{{TOTAL}}': formatMoney(total),
            '{{DUE_DATE}}': dueDateFormatted || '',
            '{{TOTAL_DUE}}': "₹&nbsp;" + Math.round(total).toLocaleString('en-IN'),
            '{{LOGO_SRC}}': baseUrl + '/assets/images/6.png',
            '{{SIGN_SRC}}': baseUrl + '/assets/images/danishsig.svg',
            '{{ADVANCE_ROW}}': advVal > 0 ? `<tr><td class="lbl">- Advance</td><td class="val">₹&nbsp;${formatMoney(advVal)}</td></tr>` : '',
            '{{DISCOUNT_ROW}}': discountVal > 0 ? `<tr><td class="lbl">- Discount</td><td class="val">₹&nbsp;${formatMoney(discountVal)}</td></tr>` : '',
            '{{FONT_REG}}': baseUrl + '/assets/fonts/satoshi/Satoshi-Regular.otf',
            '{{FONT_MED}}': baseUrl + '/assets/fonts/satoshi/Satoshi-Medium.otf',
            '{{FONT_BOLD}}': baseUrl + '/assets/fonts/satoshi/Satoshi-Bold.otf',
            '{{FONT_BLACK}}': baseUrl + '/assets/fonts/satoshi/Satoshi-Black.otf',
            '{{MANROPE_REG}}': baseUrl + '/assets/fonts/Manrope/static/Manrope-Regular.ttf',
            '{{MANROPE_MED}}': baseUrl + '/assets/fonts/Manrope/static/Manrope-SemiBold.ttf',
            '{{MANROPE_BOLD}}': baseUrl + '/assets/fonts/Manrope/static/Manrope-Bold.ttf'
        };

        for (let key in reps) {
            html = html.split(key).join(reps[key]);
        }

        html = html.replace('width: 210mm;', 'width: 794px;');
        html = html.replace('height: 297mm;', 'height: 1123px;');

        setPreviewHtml(html);

        setTimeout(resizeIframe, 50); // Re-trigger resize after html loads
    }, [templateHtml, invoiceData, resizeIframe]);

    const formatCurrency = (val) => {
        return parseFloat(val || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    return (
        <>
            <link rel="stylesheet" href="/assets/css/customers.css" />
            <link rel="stylesheet" href="/assets/css/payment-record.css?v=16" />

            <div className="split-view-container">
                {/* Left Pane - Active Customers */}
                <div className="split-list">
                    <div className="list-header">
                        <span className="header-title">Active Customers</span>
                        <button className="header-add-btn" onClick={() => router.push('/customers/add')}>Add</button>
                    </div>
                    <div className="split-list-content">
                        {filteredCustomers.map(c => {
                            const isActive = false; // We can add active state logic later if needed
                            return (
                                <div
                                    key={c.id}
                                    className={`customer-card ${isActive ? 'active' : ''}`}
                                    onClick={() => router.push(`/invoices/payment?customer_id=${c.id}`)}
                                >
                                    <div className="card-header">
                                        <span className="customer-name">{c.display_name}</span>
                                    </div>
                                    <div className="card-details">
                                        <span>₹{formatCurrency(c.receivables)}</span>
                                    </div>
                                </div>
                            );
                        })}
                        {filteredCustomers.length === 0 && !loadingCustomers && (
                            <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>No customers found.</div>
                        )}
                        {loadingCustomers && <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>}
                    </div>
                </div>

                {/* Middle Section - Form */}
                <div className="payment-form-section">
                    <div className="payment-form-card">
                        <h2>Payment for {invoiceData?.invoice_code || "..."}</h2>

                        <form onSubmit={(e) => e.preventDefault()} className="payment-form">

                            {/* Group 1 */}
                            <div className="form-group-wrapper">
                                <div className="form-group">
                                    <label className="required-label">Customer Name<span>*</span></label>
                                    <input type="text" className="form-control" value={invoiceData?.bill_to_name || ""} readOnly placeholder="Customer (Auto Fill)" />
                                </div>
                                <div className="form-group">
                                    <label className="required-label">Payment #<span>*</span></label>
                                    <input type="text" className="form-control" value={paymentNo} onChange={(e) => setPaymentNo(e.target.value)} placeholder="# (Auto Fill)" />
                                </div>
                            </div>

                            {/* Group 2 */}
                            <div className="form-group-wrapper">
                                <div className="form-group">
                                    <label className="required-label">Amount Received (INR)<span>*</span></label>
                                    <input type="text" className="form-control" value={invoiceData?.total_amount || ""} readOnly placeholder="Amount (Auto Fill)" />
                                </div>
                                <div className="form-group">
                                    <label>Bank Charges (if any)</label>
                                    <input type="text" className="form-control" value={bankCharges} onChange={(e) => setBankCharges(e.target.value)} placeholder="" />
                                </div>
                            </div>

                            {/* Group 3 */}
                            <div className="form-group-wrapper">
                                <div className="form-group">
                                    <label className="required-label">Payment Date<span>*</span></label>
                                    <input type="date" className="form-control" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Payment Mode</label>
                                    <select className="form-control" value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
                                        <option value="Cash">Cash</option>
                                        <option value="Bank Transfer">Bank Transfer</option>
                                        <option value="Credit Card">Credit Card</option>
                                        <option value="UPI">UPI</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Payment Received On</label>
                                    <input type="date" className="form-control" value={paymentReceivedOn} onChange={(e) => setPaymentReceivedOn(e.target.value)} />
                                </div>
                            </div>

                            {/* Group 4 */}
                            <div className="form-group-wrapper">
                                <div className="form-group align-top">
                                    <label>Notes</label>
                                    <textarea className="form-control" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Write a Note..."></textarea>
                                </div>
                            </div>

                        </form>
                    </div>

                    <div className="checkbox-group">
                        <label>
                            <input type="checkbox" checked={sendThankYou} onChange={(e) => setSendThankYou(e.target.checked)} />
                            Send a "Thank you" note fr this payment
                        </label>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn btn-draft">Save as Draft</button>
                        <button type="submit" className="btn btn-save" onClick={(e) => e.preventDefault()}>Save</button>
                        <button type="button" className="btn btn-cancel" onClick={() => router.back()}>Cancel</button>
                    </div>
                </div>

                {/* Right Section - Preview */}
                <div className="preview" ref={previewContainerRef} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '637px', flexShrink: 0 }}>
                    <div style={{ transformOrigin: 'top center', transform: `scale(${previewScale})`, marginBottom: `${previewMarginBottom}px` }}>
                        <div style={{ padding: '10px', background: 'rgba(255, 255, 255, 0.5)', border: '1px solid #ffffff', borderRadius: '25px', boxSizing: 'content-box', width: '595px', height: '842px' }}>
                            <div style={{ width: '595px', height: '842px', position: 'relative', overflow: 'hidden', borderRadius: '20px' }}>
                                {previewHtml ? (
                                    <iframe
                                        scrolling="no"
                                        srcDoc={previewHtml}
                                        id="preview-iframe"
                                        style={{ border: 'none', width: '794px', height: '1123px', transformOrigin: 'top left', transform: 'scale(0.749370277)', position: 'absolute', top: 0, left: 0 }}
                                    />
                                ) : (
                                    <div style={{ padding: '20px', textAlign: 'center', color: '#888', marginTop: '100px' }}>
                                        {invoiceData ? "Loading preview..." : "No invoice selected."}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
