"use client";

import Link from 'next/link';

export default function Invoices() {
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
                            <span className="value">₹0.00</span>
                        </div>
                    </div>
                    <div className="summary-item due">
                        <span className="label">Due Today</span>
                        <span className="value">₹0.00</span>
                    </div>
                    <div className="summary-item due-m">
                        <span className="label">Due Within 30 Days</span>
                        <span className="value">₹0.00</span>
                    </div>
                    <div className="summary-item ovd">
                        <span className="label">Overdue Invoice</span>
                        <span className="value">₹0.00</span>
                    </div>
                    <div className="summary-item avg">
                        <span className="label">Average No. of Days for Getting Paid</span>
                        <span className="value">0 Days</span>
                    </div>
                </div>
            </div>

            <div className="invoices-table-wrap">
                <table className="invoices-table">
                    <thead>
                        <tr>
                            <th id="filter"><img src="/assets/icons/sort.svg" alt="" /></th>
                            <th id="checkbox"><input type="checkbox" className="row-checkbox" id="main-checkbox" /></th>
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
                        {/* No mock data as requested */}
                    </tbody>
                </table>
            </div>
        </>
    );
}
