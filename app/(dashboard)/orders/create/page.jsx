"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function OrderCreate() {
    const [orderType, setOrderType] = useState('V');
    const [serviceNumber, setServiceNumber] = useState('');
    const [status, setStatus] = useState('pending');

    return (
        <>
            <link rel="stylesheet" href="/assets/css/dashboard.css" />
            <link rel="stylesheet" href="/assets/css/orders.css" />

            <header className="dashboard-topbar">
                <h1 className="dashboard-topbar-title">Create order</h1>
                <div className="dashboard-topbar-actions">
                    <span className="chip">Admin</span>
                    <Link className="logout-btn" href="/login"><span>Logout</span><span>→</span></Link>
                </div>
            </header>

            <div className="dashboard-content">
                <div className="order-create-layout">
                    <div className="orders-form-card">
                        <div className="card-head">
                            <div>
                                <h2>Order details</h2>
                                <div className="card-sub">Create an order linked to a user. Service number is automatic.</div>
                            </div>
                            <Link className="btn-small" href="/orders">Back</Link>
                        </div>

                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="orders-form-grid">
                                <div className="full">
                                    <label>User *</label>
                                    <select id="order_user_id" name="user_id" required>
                                        <option value="">Select user</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Type *</label>
                                    <select id="order_type" name="order_type" value={orderType} onChange={(e) => setOrderType(e.target.value)} required>
                                        <option value="V">Video (V)</option>
                                        <option value="T">Thumbnail (T)</option>
                                        <option value="I">Both (I)</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Service number</label>
                                    <input id="service_number" type="number" name="service_number" value={serviceNumber} onChange={(e) => setServiceNumber(e.target.value)} min="1" step="1" placeholder="Auto" readOnly />
                                </div>
                                <div>
                                    <label>Status</label>
                                    <select id="order_status" name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                                        <option value="pending">Pending</option>
                                        <option value="done">Done</option>
                                    </select>
                                </div>
                                <div className="full">
                                    <label>Notes</label>
                                    <textarea name="notes" placeholder="Short remark (optional)"></textarea>
                                </div>
                            </div>
                            <div className="orders-form-actions">
                                <button type="submit" className="btn-small primary">Create</button>
                                <button type="reset" className="btn-small">Reset</button>
                            </div>
                        </form>
                    </div>

                    <aside className="preview-card">
                        <div className="preview-title">Preview</div>
                        <div className="preview-row">
                            <div className="preview-key">Order code</div>
                            <div id="preview_code" className="preview-val">
                                {orderType}{serviceNumber ? String(serviceNumber).padStart(3, '0') : '—'}
                            </div>
                        </div>
                        <div className="preview-row">
                            <div className="preview-key">Status</div>
                            <div id="preview_status" className="preview-val">{status === 'done' ? 'Done' : 'Pending'}</div>
                        </div>
                        <div className="hint">
                            Code format: Type + service number (e.g. V003). Service number is incremented from the last order for this user + type.
                        </div>
                    </aside>
                </div>
            </div>
        </>
    );
}
