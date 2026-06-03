"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function CustomerEdit() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [salutation, setSalutation] = useState('');
    const [displayNameFormat, setDisplayNameFormat] = useState('3');

    const computeDisplayName = (format) => {
        const f = firstName.trim() || 'First';
        const lRaw = lastName.trim();
        const s = salutation.trim() || 'Mr';
        const hasLast = lRaw !== '';

        if (format === '1') return hasLast ? `${s} ${f} ${lRaw}` : `${s} ${f}`;
        if (format === '2') return hasLast ? `${lRaw}, ${f}` : '';
        if (format === '3') return hasLast ? `${f} ${lRaw}` : `${f}`;
        return '';
    };

    return (
        <>
            <link rel="stylesheet" href="/assets/css/dashboard.css" />
            <link rel="stylesheet" href="/assets/css/users.css" />

            <div className="dashboard-layout">
                <main className="dashboard-main">
                    <header className="dashboard-topbar">
                        <h1 className="dashboard-topbar-title">Add user</h1>
                        <div className="dashboard-topbar-actions">
                            <span className="chip">Admin</span>
                            <Link className="logout-btn" href="/login">
                                <span>Logout</span>
                                <span>→</span>
                            </Link>
                        </div>
                    </header>

                    <div className="dashboard-content">
                        <div className="users-form-card">
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="users-form-grid">
                                    <div>
                                        <label>First name *</label>
                                        <input id="first_name" type="text" name="first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                                    </div>
                                    <div>
                                        <label>Last name</label>
                                        <input id="last_name" type="text" name="last_name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    </div>
                                    <div>
                                        <label>Salutation</label>
                                        <select id="salutation" name="salutation" value={salutation} onChange={(e) => setSalutation(e.target.value)}>
                                            <option value="">—</option>
                                            <option value="Mr">Mr</option>
                                            <option value="Mrs">Mrs</option>
                                            <option value="Ms">Ms</option>
                                            <option value="Dr">Dr</option>
                                            <option value="Prof">Prof</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label>Display name combination</label>
                                        <select id="display_name_format" name="display_name_format" value={displayNameFormat} onChange={(e) => setDisplayNameFormat(e.target.value)}>
                                            <option value="1">{computeDisplayName('1')}</option>
                                            <option value="2" style={{ display: lastName.trim() === '' ? 'none' : '' }}>{computeDisplayName('2')}</option>
                                            <option value="3">{computeDisplayName('3')}</option>
                                        </select>
                                    </div>
                                    <div className="full">
                                        <label>Email *</label>
                                        <input type="email" name="email" required />
                                    </div>
                                    <div>
                                        <label>Phone</label>
                                        <input type="text" name="phone" />
                                    </div>
                                    <div>
                                        <label>Phone (secondary)</label>
                                        <input type="text" name="phone_secondary" />
                                    </div>
                                    <div>
                                        <label>Customer type</label>
                                        <select name="customer_type">
                                            <option value="individual">Individual</option>
                                            <option value="business">Business</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label>Company name (if applicable)</label>
                                        <input type="text" name="company_name" />
                                    </div>
                                    <div>
                                        <label>Currency</label>
                                        <select name="currency" defaultValue="INR">
                                            <option value="INR">INR</option>
                                            <option value="USD">USD</option>
                                            <option value="EUR">EUR</option>
                                            <option value="GBP">GBP</option>
                                            <option value="AUD">AUD</option>
                                            <option value="CAD">CAD</option>
                                            <option value="AED">AED</option>
                                            <option value="SAR">SAR</option>
                                            <option value="JPY">JPY</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label>Password *</label>
                                        <input type="password" name="password" required minLength="6" />
                                    </div>
                                </div>
                                <div className="users-form-actions">
                                    <button type="submit" className="btn-small primary">Add user</button>
                                    <Link href="/customers" className="btn-small">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
