"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { getNextInvoiceSequence } from '../create/actions';

export default function EditClient({ invoiceId, invoiceCode: initialInvoiceCode }) {
    // Dropdown / API Data State
    const [customers, setCustomers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [templateHtml, setTemplateHtml] = useState("");

    // Form State
    const [customerSearchText, setCustomerSearchText] = useState("");
    const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const [showOrderDropdown, setShowOrderDropdown] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const [invoiceCode, setInvoiceCode] = useState("");
    const [subject, setSubject] = useState("");
    const [invoiceDate, setInvoiceDate] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [rows, setRows] = useState([{ id: Date.now(), desc: '', qty: '', rate: '' }]);
    const [advance, setAdvance] = useState("");
    const [discount, setDiscount] = useState("");
    const [remark, setRemark] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");
    const [isLoadingData, setIsLoadingData] = useState(true);

    // Preview State
    const [previewHtml, setPreviewHtml] = useState("");
    const [previewScale, setPreviewScale] = useState(1);
    const [previewMarginBottom, setPreviewMarginBottom] = useState(0);

    // Refs for clicking outside
    const customerDropdownRef = useRef(null);
    const orderDropdownRef = useRef(null);
    const previewContainerRef = useRef(null);

    useEffect(() => {
        // Fetch Customers
        fetch('/api/invoices/customers/list')
            .then(res => res.json())
            .then(data => {
                if (data.users) setCustomers(data.users);
            })
            .catch(err => console.error("Error fetching customers:", err));

        // Fetch Template
        fetch('/assets/template_pdf.html')
            .then(res => res.text())
            .then(text => setTemplateHtml(text))
            .catch(err => console.error("Error fetching template:", err));

        // Fetch existing invoice data
        if (invoiceId) {
            fetch(`/api/invoices/view?id=${invoiceId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.invoice && data.invoice.length > 0) {
                        const inv = data.invoice[0];
                        setCustomerSearchText(inv.bill_to_name || "");
                        setSelectedCustomer({ id: inv.user_id, display_name: inv.bill_to_name });
                        
                        // Fetch orders for this customer to populate the orders dropdown
                        fetch(`/api/invoices/customers/orders?id=${inv.user_id}`)
                            .then(r => r.json())
                            .then(orderData => {
                                if (orderData.orders) setOrders(orderData.orders);
                                setSelectedOrder({ id: inv.order_id, order_code: inv.order_code });
                            });
                        
                        setInvoiceCode(inv.invoice_code || "");
                        setInvoiceDate(inv.invoice_date ? inv.invoice_date.substring(0, 10) : "");
                        setDueDate(inv.due_date ? inv.due_date.substring(0, 10) : "");
                        setSubject(inv.subject || "");
                        setAdvance(inv.advance_received || "0");
                        setDiscount(inv.discount || "0");
                        setRemark(inv.remark || "");
                        
                        if (data.items && data.items.length > 0) {
                            setRows(data.items.map((it, idx) => ({
                                id: it.id || Date.now() + idx,
                                desc: it.description || "",
                                qty: it.quantity || "1",
                                rate: it.unit_price || "0"
                            })));
                        } else {
                            setRows([{ id: Date.now(), desc: '', qty: '', rate: '' }]);
                        }
                    }
                    setIsLoadingData(false);
                })
                .catch(err => {
                    console.error("Error fetching invoice data:", err);
                    setIsLoadingData(false);
                });
        } else {
            setIsLoadingData(false);
        }
    }, [invoiceId]);

    // Handle clicks outside of dropdowns
    useEffect(() => {
        function handleClickOutside(event) {
            if (customerDropdownRef.current && !customerDropdownRef.current.contains(event.target)) {
                setShowCustomerDropdown(false);
            }
            if (orderDropdownRef.current && !orderDropdownRef.current.contains(event.target)) {
                setShowOrderDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Responsive iframe scaling
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

    // Filter customers locally
    const filteredCustomers = customers.filter(u => {
        const name = (u.display_name || `${u.first_name || ""} ${u.last_name || ""}`).trim().toLowerCase();
        const email = (u.email || "").toLowerCase();
        const search = customerSearchText.toLowerCase();
        return name.includes(search) || email.includes(search);
    });

    // Customer Selection
    const handleSelectCustomer = async (u) => {
        setSelectedCustomer(u);
        const name = (u.display_name || `${u.first_name || ""} ${u.last_name || ""}`).trim();
        setCustomerSearchText(name);
        setShowCustomerDropdown(false);
        
        // Reset Order
        setSelectedOrder(null);
        setOrders([]);

        // Fetch Orders for this user
        try {
            const res = await fetch('/api/invoices/customers/orders?id=' + u.id);
            const data = await res.json();
            if (data.orders) setOrders(data.orders);
        } catch (err) {
            console.error("Error fetching orders:", err);
        }

        // Generate Invoice Code if customer changed
        let initials = (u.initials || "").trim();
        if (!initials && u.first_name) {
            initials = (u.first_name.charAt(0) + (u.last_name ? u.last_name.charAt(0) : "X")).toUpperCase();
        }
        if (initials.length > 2) initials = initials.substring(0, 2);
        if (initials.length < 2) initials = initials.padEnd(2, "X");
        if (!initials) initials = "XX";

        const nextSeq = await getNextInvoiceSequence(u.id);
        const newCode = initials + String(nextSeq).padStart(4, '0');
        setInvoiceCode(newCode);
    };

    // Row Management
    const addRow = () => setRows([...rows, { id: Date.now(), desc: '', qty: '', rate: '' }]);
    const removeRow = (id) => setRows(rows.filter(r => r.id !== id));
    
    const updateRow = (id, field, value) => {
        setRows(rows.map(r => r.id === id ? { ...r, [field]: value } : r));
    };

    // Calculate Totals
    const subtotal = rows.reduce((acc, row) => {
        const q = parseFloat(row.qty) || (row.desc ? 1 : 0);
        const r = parseFloat(row.rate) || 0;
        return acc + (q * r);
    }, 0);

    let discountPercent = parseFloat(discount) || 0;
    if (discountPercent > 100) discountPercent = 100;
    const discountVal = discountPercent > 0 ? (subtotal * discountPercent / 100) : 0;
    const advVal = parseFloat(advance) || 0;
    const total = subtotal - advVal - discountVal;

    // Handle Form Submit
    const handleSubmit = async (e, status) => {
        e.preventDefault();
        
        if (!selectedCustomer) {
            setSubmitMessage("Error: Please select a customer.");
            return;
        }
        if (!selectedOrder) {
            setSubmitMessage("Error: Please select an order.");
            return;
        }
        
        setIsSubmitting(true);
        setSubmitMessage("");

        // Format items
        const invoice_items = rows.map(r => ({
            description: r.desc || "Item",
            quantity: parseFloat(r.qty) || 1,
            unit_price: parseFloat(r.rate) || 0,
            line_total: (parseFloat(r.qty) || 1) * (parseFloat(r.rate) || 0)
        }));

        const payload = {
            invoice_id: invoiceId,
            user_id: selectedCustomer.id,
            order_id: selectedOrder.id,
            created_by_admin_id: 1, // You can replace this with actual logged in admin ID from auth context later
            invoice_code: invoiceCode,
            invoice_sequence: parseInt(invoiceCode.replace(/\D/g, ''), 10) || 1, // extracts numeric part
            order_code: selectedOrder.order_code,
            invoice_date: invoiceDate || new Date().toISOString().split('T')[0],
            due_date: dueDate || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0], // 14 days later
            bill_to_name: customerSearchText,
            subject: subject || `Invoice for Order ${selectedOrder.order_code}`,
            subtotal: subtotal,
            status: status, // "draft" or "sent"
            remark: remark || "for trusting our services. Looking forward to working again.",
            advance_received: advVal,
            discount: discountPercent,
            total_amount: total,
            invoice_items: invoice_items
        };

        try {
            const res = await fetch('/api/invoices/edit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            
            if (res.ok) {
                setSubmitMessage("Success: " + data.message);
                // Optionally redirect to /invoices after a short delay
                setTimeout(() => window.location.href = '/invoices', 2000);
            } else {
                setSubmitMessage("Error: " + (data.error || "Failed to create invoice"));
            }
        } catch (err) {
            console.error(err);
            setSubmitMessage("Error: Server communication failed.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Helpers
    const formatMoney = (val) => isNaN(val) ? "0.00" : parseFloat(val).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    const formatDateObj = (dateString) => {
        if (!dateString) return "";
        const parts = dateString.split('-');
        if (parts.length !== 3) return dateString;
        const d = new Date(parts[0], parts[1] - 1, parts[2]);
        if (isNaN(d.getTime())) return dateString;
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${String(d.getDate()).padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
    };

    // Generate Preview HTML
    useEffect(() => {
        if (!templateHtml) return;

        let html = templateHtml;
        const clientName = customerSearchText || 'Client Name';
        const invDateFormatted = invoiceDate ? formatDateObj(invoiceDate) : '01 Jan 2026';
        const dueDateFormatted = dueDate ? formatDateObj(dueDate) : '15 Jan 2026';
        const subj = subject || (selectedOrder ? `Invoice for Order ${selectedOrder.order_code}` : 'Invoice For Thumbnail Designing and Video Editing Services From Module Wings.');
        const code = invoiceCode || 'AB001';

        let itemsHtml = '';
        let count = 0;
        
        rows.forEach((row, i) => {
            const desc = row.desc || `Title - ${i + 1}`;
            const qtyRaw = row.qty === "" ? 1 : parseFloat(row.qty);
            const qty = isNaN(qtyRaw) ? 1 : qtyRaw;
            const rate = parseFloat(row.rate) || 0;
            const amt = qty * rate;
            count++;

            itemsHtml += `
            <tr>
                <td class="col-hash" style="text-align: center;"><p style="text-align: center;">${count}</p></td>
                <td class="col-desc"><p>${desc}</p></td>
                <td class="col-qty center">${qty.toString()}</td>
                <td class="col-rate center">${formatMoney(rate)}</td>
                <td class="col-amt center">${formatMoney(amt)}</td>
            </tr>
            `;
        });

        if (count === 0) {
            itemsHtml = `
            <tr>
                <td class="col-hash" style="text-align: center;"><p style="text-align: center;">1</p></td>
                <td class="col-desc"><p>Title - 1</p></td>
                <td class="col-qty center">1</td>
                <td class="col-rate center">X,XXX</td>
                <td class="col-amt center">X,XXX</td>
            </tr>
            `;
        }

        const origin = typeof window !== "undefined" ? window.location.origin : "";
        const baseUrl = origin; // Assuming /assets sits at root

        const reps = {
            '{{CLIENT_NAME}}': clientName,
            '{{INVOICE_DATE}}': invDateFormatted,
            '{{INVOICE_CODE}}': code,
            '{{SUBJECT}}': subj,
            '{{ITEMS_BODY}}': itemsHtml,
            '{{SUBTOTAL}}': formatMoney(subtotal),
            '{{TOTAL}}': formatMoney(total),
            '{{DUE_DATE}}': dueDateFormatted,
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
    }, [templateHtml, customerSearchText, invoiceDate, dueDate, subject, invoiceCode, rows, advance, discount, selectedOrder, subtotal, total, advVal, discountVal]);


    return (
        <>
            <link rel="stylesheet" href="/assets/css/invoice.css" />
            
            <div className="main-content">
                <div className="creator">
                    <p className="sal">Edit Invoice</p>
                    
                    {isLoadingData ? (
                        <div style={{ padding: '20px', textAlign: 'center' }}>Loading invoice data...</div>
                    ) : (
                        <>
                    {submitMessage && (
                        <div style={{
                            padding: '15px', 
                            borderRadius: '12px', 
                            marginBottom: '20px', 
                            fontFamily: "'Satoshi-Medium', sans-serif",
                            backgroundColor: submitMessage.startsWith("Error") ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 200, 0, 0.1)',
                            color: submitMessage.startsWith("Error") ? '#ff4444' : '#00c851',
                            border: `1px solid ${submitMessage.startsWith("Error") ? 'rgba(255, 0, 0, 0.2)' : 'rgba(0, 200, 0, 0.2)'}`
                        }}>
                            {submitMessage}
                        </div>
                    )}

                    <form className="form" onSubmit={(e) => e.preventDefault()}>
                        {/* Customer Name */}
                        <div className="field" style={{ position: 'relative' }} ref={customerDropdownRef}>
                            <span className="label">Customer Name</span>
                            <div className="input-full has-btn">
                                <input type="hidden" name="user_id" value={selectedCustomer?.id || ''} />
                                <input 
                                    id="customer_search" 
                                    className="input-field" 
                                    placeholder="Select or add a customer" 
                                    type="text" 
                                    autoComplete="off" 
                                    value={customerSearchText}
                                    onChange={(e) => {
                                        setCustomerSearchText(e.target.value);
                                        setSelectedCustomer(null);
                                        setShowCustomerDropdown(true);
                                    }}
                                    onFocus={() => setShowCustomerDropdown(true)}
                                />
                                <div className="search"><img src="/assets/icons/search-white.svg" alt="" /></div>
                            </div>
                            {showCustomerDropdown && (
                                <div className="autocomplete-dropdown" style={{ display: 'flex' }}>
                                    {filteredCustomers.length > 0 ? filteredCustomers.map(u => {
                                        const name = (u.display_name || `${u.first_name || ""} ${u.last_name || ""}`).trim();
                                        return (
                                            <div key={u.id} className="autocomplete-item" onClick={() => handleSelectCustomer(u)}>
                                                {name} {u.email ? `(${u.email})` : ''}
                                            </div>
                                        );
                                    }) : (
                                        <div className="autocomplete-item" style={{ color: '#888' }}>No customers found</div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Order Number & Invoice Number */}
                        <div className="field-row">
                            <div className="field" style={{ position: 'relative' }} ref={orderDropdownRef}>
                                <span className="label">Order Number</span>
                                <div className="input-half">
                                    <input type="hidden" name="order_id" value={selectedOrder?.id || ''} />
                                    <input 
                                        id="order_search" 
                                        className="input-field" 
                                        placeholder={selectedCustomer ? (orders.length > 0 ? `Select an order (${orders.length})` : "No orders found") : "Select a customer first"} 
                                        type="text" 
                                        autoComplete="off" 
                                        readOnly 
                                        style={{ cursor: 'pointer' }}
                                        value={selectedOrder ? selectedOrder.order_code : ''}
                                        onClick={() => setShowOrderDropdown(!showOrderDropdown)}
                                    />
                                </div>
                                {showOrderDropdown && orders.length > 0 && (
                                    <div className="autocomplete-dropdown" style={{ width: '335px', display: 'flex' }}>
                                        {orders.map(o => (
                                            <div key={o.id} className="autocomplete-item" onClick={() => {
                                                setSelectedOrder(o);
                                                setShowOrderDropdown(false);
                                            }}>
                                                {o.order_code} {o.order_type ? `- ${o.order_type}` : ''}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="field">
                                <span className="label">Invoice Number (Auto generated)</span>
                                <div className="input-half">
                                    <input 
                                        id="invoice_code" 
                                        name="invoice_code" 
                                        className="input-field" 
                                        type="text" 
                                        readOnly 
                                        style={{ fontFamily: "'Satoshi-Medium', sans-serif", color: "#111" }}
                                        value={invoiceCode}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Subject */}
                        <div className="field">
                            <span className="label">Subject</span>
                            <div className="input-full">
                                <input 
                                    id="subject" 
                                    name="subject" 
                                    className="input-field" 
                                    placeholder="Let your customer know what this Invoice is for..." 
                                    type="text" 
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Invoice Date & Due Date */}
                        <div className="field-row">
                            <div className="field">
                                <span className="label">Invoice Date</span>
                                <div className="input-half">
                                    <input 
                                        id="invoice_date" 
                                        name="invoice_date" 
                                        className="input-field" 
                                        type="date" 
                                        value={invoiceDate}
                                        onChange={(e) => setInvoiceDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <span className="label">Due Date</span>
                                <div className="input-half">
                                    <input 
                                        id="due_date" 
                                        name="due_date" 
                                        className="input-field" 
                                        type="date" 
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Item Table */}
                        <div className="field mt-20">
                            <span className="label">Item Table</span>
                            <div className="item-table-container">
                                <div className="item-table-header">
                                    <div className="th-desc">ITEM DETAILS</div>
                                    <div className="th-qty">QUANTITY</div>
                                    <div className="th-rate">RATE</div>
                                </div>
                                
                                {rows.map((row) => (
                                    <div className="item-row" key={row.id}>
                                        <input 
                                            name="item_desc[]" 
                                            className="input-item-desc" 
                                            placeholder="Type or click to select an item." 
                                            type="text"
                                            value={row.desc}
                                            onChange={(e) => updateRow(row.id, 'desc', e.target.value)}
                                        />
                                        <input 
                                            name="item_qty[]" 
                                            className="input-item-qty" 
                                            placeholder="1.00" 
                                            type="number" 
                                            step="0.01"
                                            value={row.qty}
                                            onChange={(e) => updateRow(row.id, 'qty', e.target.value)}
                                        />
                                        <input 
                                            name="item_rate[]" 
                                            className="input-item-rate" 
                                            placeholder="0.00" 
                                            type="number" 
                                            step="0.01"
                                            value={row.rate}
                                            onChange={(e) => updateRow(row.id, 'rate', e.target.value)}
                                        />
                                        {rows.length > 1 && (
                                            <button 
                                                type="button" 
                                                className="remove-row-btn" 
                                                style={{ background: 'var(--primary, #1231ff)', color: 'white', border: 'none', borderRadius: '8px', width: '38px', height: '38px', cursor: 'pointer', fontFamily: "'Satoshi-Medium', sans-serif" }} 
                                                onClick={() => removeRow(row.id)}
                                            >X</button>
                                        )}
                                    </div>
                                ))}

                                <button type="button" className="add-row-btn" onClick={addRow}>Add New Row</button>
                            </div>
                        </div>

                        {/* Bottom Section */}
                        <div className="bottom-section">
                            <div className="bottom-left">
                                <div className="field-row">
                                    <div className="field">
                                        <span className="label">Advance Received</span>
                                        <div className="input-small-container">
                                            <input 
                                                id="advance" 
                                                name="advance" 
                                                className="input-field" 
                                                placeholder="0.00" 
                                                type="number" 
                                                step="0.01" 
                                                value={advance}
                                                onChange={(e) => setAdvance(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <span className="label">Discount</span>
                                        <div className="input-small-container">
                                            <input 
                                                id="discount" 
                                                name="discount" 
                                                className="input-field" 
                                                placeholder="0" 
                                                type="number" 
                                                step="0.01" 
                                                max="100" 
                                                value={discount}
                                                onChange={(e) => {
                                                    let val = parseFloat(e.target.value);
                                                    if (val > 100) val = 100;
                                                    setDiscount(isNaN(val) ? "" : val);
                                                }}
                                            />
                                            <span className="suffix">%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="field">
                                    <span className="label">Remark</span>
                                    <div className="input-full" style={{ height: 'auto', padding: '0', background: 'transparent', border: 'none' }}>
                                        <textarea 
                                            id="remark" 
                                            name="remark" 
                                            className="input-remark" 
                                            placeholder="for trusting our services. Looking forward to working again."
                                            value={remark}
                                            onChange={(e) => setRemark(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <span className="subtext">Will be displayed on the invoice</span>
                                </div>
                            </div>
                            <div className="bottom-right">
                                <div className="totals-box">
                                    <div className="total-row">
                                        <span>Subtotal</span>
                                        <span>₹ {formatMoney(subtotal)}</span>
                                    </div>
                                    <div className="total-row">
                                        <span>Advance</span>
                                        <span>₹ {formatMoney(advVal)}</span>
                                    </div>
                                    <div className="total-separator"></div>
                                    <div className="total-row main-total">
                                        <span>Total</span>
                                        <span>₹ {formatMoney(total)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="form-actions">
                            <button type="button" className="btn-draft" onClick={(e) => handleSubmit(e, "draft")} disabled={isSubmitting}>
                                {isSubmitting ? "Saving..." : "Save as Draft"}
                            </button>
                            <button type="button" className="btn-send" onClick={(e) => handleSubmit(e, "sent")} disabled={isSubmitting}>
                                {isSubmitting ? "Saving..." : "Save and Send"}
                            </button>
                            <button type="reset" className="btn-reset" onClick={() => {
                                setRows([{ id: Date.now(), desc: '', qty: '', rate: '' }]);
                                setCustomerSearchText("");
                                setSelectedCustomer(null);
                                setOrders([]);
                                setSelectedOrder(null);
                                setInvoiceCode("");
                                setAdvance("");
                                setDiscount("");
                                setSubject("");
                                setInvoiceDate("");
                                setDueDate("");
                                setRemark("");
                            }}>Reset</button>
                        </div>
                    </form>
                        </>
                    )}
                </div>
                
                <div className="preview" ref={previewContainerRef} style={{ paddingTop: '124px', overflow:'hidden', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <div style={{ transformOrigin: 'top center', transform: `scale(${previewScale})`, marginBottom: `${previewMarginBottom}px` }}>
                        <div style={{ padding: '10px', background: 'rgba(255, 255, 255, 0.5)', border: '1px solid #ffffff', borderRadius: '25px', boxSizing: 'content-box', width: '595px', height: '842px' }}>
                            <div style={{ width: '595px', height: '842px', position: 'relative', overflow: 'hidden', borderRadius: '20px' }}>
                                <iframe 
                                    scrolling="no"
                                    srcDoc={previewHtml}
                                    id="preview-iframe" 
                                    style={{ border: 'none', width: '794px', height: '1123px', transformOrigin: 'top left', transform: 'scale(0.749370277)', position: 'absolute', top: 0, left: 0 }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
