"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function InvoiceEdit() {
    const [rows, setRows] = useState([{ id: 1, desc: 'Example item', qty: '2', rate: '500' }]);
    
    const addRow = () => {
        setRows([...rows, { id: Date.now(), desc: '', qty: '', rate: '' }]);
    };
    
    const removeRow = (id) => {
        setRows(rows.filter(r => r.id !== id));
    };

    return (
        <>
            <link rel="stylesheet" href="/assets/css/invoice.css" />
            
            <div className="main-content">
            <div className="creator">
                <p className="sal">Edit Invoice</p>
                <form className="form" onSubmit={(e) => e.preventDefault()}>
                    {/* Customer Name */}
                    <div className="field" style={{ position: 'relative' }}>
                        <span className="label">Customer Name</span>
                        <div className="input-full has-btn">
                            <input type="hidden" id="user_id" name="user_id" value="1" />
                            <input id="customer_search" className="input-field" placeholder="Select or add a customer" type="text" autoComplete="off" defaultValue="John Doe" />
                            <div className="search"><img src="/assets/icons/search-white.svg" alt="" /></div>
                        </div>
                    </div>

                    {/* Order Number & Invoice Number */}
                    <div className="field-row">
                        <div className="field" style={{ position: 'relative' }}>
                            <span className="label">Order Number</span>
                            <div className="input-half">
                                <input type="hidden" id="order_id" name="order_id" value="1" />
                                <input id="order_search" className="input-field" placeholder="Select an order" type="text" autoComplete="off" readOnly style={{ cursor: 'pointer' }} defaultValue="V001" />
                            </div>
                        </div>
                        <div className="field">
                            <span className="label">Invoice Number (Auto generated)</span>
                            <div className="input-half">
                                <input id="invoice_code" name="invoice_code" className="input-field" type="text" readOnly style={{ fontFamily: "'Satoshi-Medium', sans-serif", color: "#111" }} defaultValue="JD0001" />
                            </div>
                        </div>
                    </div>

                    {/* Subject */}
                    <div className="field">
                        <span className="label">Subject</span>
                        <div className="input-full">
                            <input id="subject" name="subject" className="input-field" placeholder="Let your customer know what this Invoice is for..." type="text" defaultValue="Invoice for Services" />
                        </div>
                    </div>

                    {/* Invoice Date & Due Date */}
                    <div className="field-row">
                        <div className="field">
                            <span className="label">Invoice Date</span>
                            <div className="input-half">
                                <input id="invoice_date" name="invoice_date" className="input-field" placeholder="MM DD YYYY" type="date" defaultValue="2026-06-01" />
                            </div>
                        </div>
                        <div className="field">
                            <span className="label">Due Date</span>
                            <div className="input-half">
                                <input id="due_date" name="due_date" className="input-field" placeholder="MM DD YYYY" type="date" defaultValue="2026-06-15" />
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
                                    <input name="item_desc[]" className="input-item-desc" placeholder="Type or click to select an item." type="text" defaultValue={row.desc} />
                                    <input name="item_qty[]" className="input-item-qty" placeholder="1.00" type="number" step="0.01" defaultValue={row.qty} />
                                    <input name="item_rate[]" className="input-item-rate" placeholder="0.00" type="number" step="0.01" defaultValue={row.rate} />
                                    {rows.length > 1 && (
                                        <button type="button" className="remove-row-btn" style={{ background: 'var(--primary, #1231ff)', color: 'white', border: 'none', borderRadius: '8px', width: '38px', height: '38px', cursor: 'pointer', fontFamily: "'Satoshi-Medium', sans-serif" }} onClick={() => removeRow(row.id)}>X</button>
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
                                        <input id="advance" name="advance" className="input-field" placeholder="0.00" type="number" step="0.01" defaultValue="0" />
                                    </div>
                                </div>
                                <div className="field">
                                    <span className="label">Discount</span>
                                    <div className="input-small-container">
                                        <input id="discount" name="discount" className="input-field" placeholder="0" type="number" step="0.01" max="100" defaultValue="0" />
                                        <span className="suffix">%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <span className="label">Remark</span>
                                <div className="input-full" style={{ height: 'auto', padding: '0', background: 'transparent', border: 'none' }}>
                                    <textarea id="remark" name="remark" className="input-remark" placeholder="for trusting our services. Looking forward to working again." defaultValue="Thanks For Trusting Our Services."></textarea>
                                </div>
                                <span className="subtext">Will be displayed on the invoice</span>
                            </div>
                        </div>
                        <div className="bottom-right">
                            <div className="totals-box">
                                <div className="total-row">
                                    <span>Subtotal</span>
                                    <span>₹ 1,000.00</span>
                                </div>
                                <div className="total-row">
                                    <span>Advance</span>
                                    <span>₹ 0.00</span>
                                </div>
                                <div className="total-separator"></div>
                                <div className="total-row main-total">
                                    <span>Total</span>
                                    <span>₹ 1,000.00</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="form-actions">
                        <button type="submit" name="save_changes" className="btn-send">Save Changes</button>
                        <Link href="/invoices" className="btn-reset" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>Cancel</Link>
                    </div>
                </form>
            </div>
            <div className="preview" style={{ paddingTop: '124px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                <div style={{ transformOrigin: 'top center' }}>
                    <div style={{ padding: '10px', background: 'rgba(255, 255, 255, 0.5)', border: '1px solid #ffffff', borderRadius: '25px', boxSizing: 'content-box', width: '595px', height: '842px' }}>
                        <div style={{ width: '595px', height: '842px', position: 'relative', overflow: 'hidden', borderRadius: '20px' }}>
                            <iframe 
                                scrolling="no"
                                src="/invoices/preview" 
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
