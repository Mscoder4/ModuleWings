"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function InvoicesContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeCode = searchParams.get("code");

    const [invoices, setInvoices] = useState([]);
    const [summary, setSummary] = useState({
        totalOutstanding: 0,
        dueToday: 0,
        dueWithin30: 0,
        overdue: 0,
        avgDaysToPay: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const res = await fetch("/api/invoices/list");
                if (res.ok) {
                    const data = await res.json();
                    setInvoices(data);
                    computeSummary(data);
                }
            } catch (err) {
                console.error("Error fetching invoices:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, []);

    const computeSummary = (data) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const thirtyDaysFromNow = new Date(today);
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

        let totalOutstanding = 0;
        let dueToday = 0;
        let dueWithin30 = 0;
        let overdue = 0;

        data.forEach((inv) => {
            const amount = parseFloat(inv.total_amount) || 0;
            const advance = parseFloat(inv.advance_received) || 0;
            const balance = amount - advance;
            const status = inv.status || "draft";
            
            const dueDate = new Date(inv.due_date);
            dueDate.setHours(0, 0, 0, 0);

            if (status === "unpaid" || status === "overdue") {
                totalOutstanding += balance;
            }

            if (status === "unpaid" && dueDate.getTime() === today.getTime()) {
                dueToday += balance;
            }

            if (status === "unpaid" && dueDate > today && dueDate <= thirtyDaysFromNow) {
                dueWithin30 += balance;
            }

            if (status === "overdue") {
                overdue += balance;
            }
        });

        setSummary({
            totalOutstanding,
            dueToday,
            dueWithin30,
            overdue,
            avgDaysToPay: 0,
        });
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const formatCurrency = (amount) => {
        return `₹${parseFloat(amount).toFixed(2)}`;
    };

    const handleRowDoubleClick = (code) => {
        router.push(`/invoices?code=${code}`);
    };

    const toggleAllCheckboxes = (e) => {
        const isChecked = e.target.checked;
        const checkboxes = document.querySelectorAll(".invoice-row .row-checkbox");
        checkboxes.forEach((cb) => (cb.checked = isChecked));
    };

    const handleRowCheckboxChange = () => {
        const checkboxes = Array.from(document.querySelectorAll(".invoice-row .row-checkbox"));
        const mainCheckbox = document.getElementById("main-checkbox");
        if (mainCheckbox) {
            mainCheckbox.checked = checkboxes.every((cb) => cb.checked) && checkboxes.length > 0;
        }
    };

    useEffect(() => {
        // Handle iframe resize logic from PHP script
        const resizeIframe = () => {
            const previewWrap = document.getElementById('previewWrap');
            const scaleWrapper = document.getElementById('previewScaleWrapper');
            if(previewWrap && scaleWrapper) {
                const availableWidth = previewWrap.clientWidth; 
                const requiredWidth = 1014.75; 
                if(availableWidth > 0 && availableWidth < requiredWidth) {
                    const scale = availableWidth / requiredWidth;
                    scaleWrapper.style.transform = `scale(${scale})`;
                    const originalHeight = 1421.35;
                    scaleWrapper.style.marginBottom = `-${originalHeight * (1 - scale)}px`;
                } else {
                    scaleWrapper.style.transform = `scale(1)`;
                    scaleWrapper.style.marginBottom = `0px`;
                }
            }
        };

        if (activeCode) {
            window.addEventListener('resize', resizeIframe);
            setTimeout(resizeIframe, 50);
        }

        return () => {
            window.removeEventListener('resize', resizeIframe);
        };
    }, [activeCode]);

    if (activeCode) {
        return (
            <>
                <link rel="stylesheet" href="/assets/css/invoices.css" />
                <div className="split-view-container">
                    <div className="split-list">
                        {invoices.map((inv, index) => {
                            const rawStatus = inv.status || 'draft';
                            const displayStatus = rawStatus === 'unpaid' ? 'pending' : rawStatus;
                            const isActive = inv.invoice_code === activeCode ? 'active' : '';
                            return (
                                <div 
                                    key={index} 
                                    className={`invoice-card ${isActive}`} 
                                    onClick={() => router.push(`/invoices?code=${inv.invoice_code}`)}
                                >
                                    <div className="card-header">
                                        <span className="customer-name">{inv.bill_to_name}</span>
                                        <span className="amount">{formatCurrency(inv.total_amount)}</span>
                                    </div>
                                    <div className="card-details">
                                        <span>{inv.invoice_code}</span><span id="dot">&middot;</span>  
                                        <span>{formatDate(inv.invoice_date)}</span> <span id="dot">&middot;</span>
                                        <span>{inv.order_code || 'ABI01'}</span>
                                    </div>
                                    <div className="card-footer">
                                        <span className={`status-badge ${displayStatus}`}>
                                            {displayStatus.charAt(0).toUpperCase() + displayStatus.slice(1)} 
                                            {(rawStatus === 'paid' || rawStatus === 'pending' || rawStatus === 'overdue') && (
                                                <img className="mail" src="/assets/icons/mail.svg" alt="Mail" onError={(e) => e.target.style.display='none'} />
                                            )}
                                            {rawStatus === 'draft' && (
                                                <img className="mail" src="/assets/icons/mail-grey.svg" alt="Mail" onError={(e) => e.target.style.display='none'} />
                                            )}
                                        </span>
                                        <span className="paperclip-icon">
                                            <img src="/assets/icons/paperclip.svg" alt="Clip" onError={(e) => e.target.style.display='none'} />
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="split-right-pane">
                        <div className="split-actions">
                            <div className="actions-group">
                                {/* Normally edit would use id, using code for now or adapt edit page later */}
                                <button className="action-btn btn-edit" onClick={() => router.push(`/invoices/edit?code=${activeCode}`)}>Edit</button>
                                <div className="separator"></div>
                                <button className="action-btn btn-send"><img src="/assets/icons/send.svg" alt="" onError={(e) => e.target.style.display='none'} /> Send</button>
                                <div className="separator"></div>
                                <button className="action-btn btn-share"><img src="/assets/icons/share.svg" alt="" onError={(e) => e.target.style.display='none'} /> Share</button>
                                <button className="action-btn btn-download">Download</button>
                            </div>
                            <button className="action-btn btn-record" onClick={() => {
                                const activeInv = invoices.find(inv => inv.invoice_code === activeCode);
                                if (activeInv) {
                                    router.push('/invoices/payment?id=' + activeInv.id);
                                } else if (invoices.length > 0) {
                                    router.push('/invoices/payment?id=' + invoices[0].id);
                                }
                            }}>Record Payment</button>
                        </div>
                        <div className="split-preview-wrap" id="previewWrap">
                            <div className="preview-scale-wrapper" id="previewScaleWrapper">
                                <div className="preview-design-wrapper">
                                    <div className="preview-inner-container">
                                        <iframe src={`/invoice_preview?code=${activeCode}`} id="preview-iframe"></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <link rel="stylesheet" href="/assets/css/invoices.css" />
            
            <div className="invoice-summary-box">
                <div className="summary-header">PAYMENT SUMMARY</div>
                <div className="summary-content">
                    <div className="summary-item primary">
                        <div className="icon-circle"><img src="/assets/icons/arrow.svg" alt="Arrow" /></div>
                        <div className="summary-text">
                            <span className="label">Total Outstanding Receivables</span>
                            <span className="value">{formatCurrency(summary.totalOutstanding)}</span>
                        </div>
                    </div>
                    <div className="summary-item due">
                        <span className="label">Due Today</span>
                        <span className="value">{formatCurrency(summary.dueToday)}</span>
                    </div>
                    <div className="summary-item due-m">
                        <span className="label">Due Within 30 Days</span>
                        <span className="value">{formatCurrency(summary.dueWithin30)}</span>
                    </div>
                    <div className="summary-item ovd">
                        <span className="label">Overdue Invoice</span>
                        <span className="value">{formatCurrency(summary.overdue)}</span>
                    </div>
                    <div className="summary-item avg">
                        <span className="label">Average No. of Days for Getting Paid</span>
                        <span className="value">{summary.avgDaysToPay === 1 ? '1 Day' : `${summary.avgDaysToPay} Days`}</span>
                    </div>
                </div>
            </div>

            <div className="invoices-table-wrap">
                <table className="invoices-table">
                    <thead>
                        <tr>
                            <th id="filter"><img src="/assets/icons/sort.svg" alt="" /></th>
                            <th id="checkbox"><input type="checkbox" className="row-checkbox" id="main-checkbox" onChange={toggleAllCheckboxes} /></th>
                            <th id="date">DATE</th>
                            <th id="invoice">INVOICE</th>
                            <th id="order">ORDER NUMBER</th>
                            <th id="customer">CUSTOMER NAME</th>
                            <th id="status">STATUS</th>
                            <th id="due">DUE DATE</th>
                            <th id="amount">AMOUNT</th>
                            <th id="balance">BALANCE DUE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr className="invoice-row">
                                <td colSpan="10" style={{ textAlign: "center" }}>Loading invoices...</td>
                            </tr>
                        ) : invoices.length === 0 ? (
                            <tr className="invoice-row">
                                <td colSpan="10" style={{ textAlign: "center" }}>No invoices found.</td>
                            </tr>
                        ) : (
                            invoices.map((inv, index) => {
                                const rawStatus = inv.status || "draft";
                                const displayStatus = rawStatus === "unpaid" ? "pending" : rawStatus;
                                const amount = parseFloat(inv.total_amount) || 0;
                                const advance = parseFloat(inv.advance_received) || 0;
                                const balance = amount - advance;

                                return (
                                    <tr 
                                        key={index} 
                                        className="invoice-row" 
                                        onDoubleClick={() => handleRowDoubleClick(inv.invoice_code)}
                                    >
                                        <td></td>
                                        <td><input type="checkbox" className="row-checkbox" onChange={handleRowCheckboxChange} /></td>
                                        <td>{formatDate(inv.invoice_date)}</td>
                                        <td>{inv.invoice_code}</td>
                                        <td>{inv.order_code || "ABI01"}</td>
                                        <td>{inv.bill_to_name}</td>
                                        <td>
                                            <span className={`status-text ${displayStatus}`}>
                                                {displayStatus.toUpperCase()}
                                            </span>
                                        </td>
                                        <td>{formatDate(inv.due_date || inv.invoice_date)}</td>
                                        <td>{formatCurrency(amount)}</td>
                                        <td>{formatCurrency(balance)}</td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default function Invoices() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <InvoicesContent />
        </Suspense>
    );
}

