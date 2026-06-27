"use client";

import { useEffect, useState } from "react";

export default function CustomerDetails({ customerId }) {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [invoices, setInvoices] = useState([]);

    const staticMails = [
        { id: 1, to: "abc@gmail.com", subject: "Invoice Notification - Invoice - NR0001 from Module Wings", date: "01-02-2026 08:44 PM" },
        { id: 2, to: "abc@gmail.com", subject: "Payment Acknowledgment - Thank You for Your Payment to Module Wings", date: "01-02-2026 08:44 PM" },
        { id: 3, to: "abc@gmail.com", subject: "Invoice Notification - Invoice - NR0001 from Module Wings", date: "01-02-2026 08:44 PM" },
        { id: 4, to: "abc@gmail.com", subject: "Payment Acknowledgment - Thank You for Your Payment to Module Wings", date: "01-02-2026 08:44 PM" },
        { id: 5, to: "abc@gmail.com", subject: "Invoice Notification - Invoice - NR0002 from Module Wings", date: "01-02-2026 08:44 PM" },
    ];

    useEffect(() => {
        if (!customerId) return;
        
        const fetchData = async () => {
            setLoading(true);
            try {
                const [statsRes, invoicesRes] = await Promise.all([
                    fetch(`/api/customers/${customerId}/stats`),
                    fetch(`/api/customers/${customerId}/invoices`)
                ]);
                
                if (statsRes.ok) {
                    setStats(await statsRes.json());
                }
                if (invoicesRes.ok) {
                    setInvoices(await invoicesRes.json());
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [customerId]);

    if (!customerId) {
        return <div style={{ padding: "20px", color: "#888" }}>Select a customer to view details.</div>;
    }

    if (loading) {
        return <div style={{ padding: "20px" }}>Loading details...</div>;
    }

    if (!stats || !stats.customer) {
        return <div style={{ padding: "20px", color: "red" }}>Failed to load customer details.</div>;
    }

    const { customer, stats: monthlyStats } = stats;
    
    // Process chart data
    // Find max value to scale the chart dynamically
    let maxIncome = 0;
    monthlyStats.forEach(m => {
        if (m.income > maxIncome) maxIncome = m.income;
    });
    
    let yMax = 60000; // fallback default
    if (maxIncome > 0) {
        const rawStep = maxIncome / 6;
        const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
        const stepFraction = rawStep / magnitude;
        
        let niceStepFraction;
        if (stepFraction <= 1) niceStepFraction = 1;
        else if (stepFraction <= 1.5) niceStepFraction = 1.5;
        else if (stepFraction <= 2) niceStepFraction = 2;
        else if (stepFraction <= 2.5) niceStepFraction = 2.5;
        else if (stepFraction <= 3) niceStepFraction = 3;
        else if (stepFraction <= 4) niceStepFraction = 4;
        else if (stepFraction <= 5) niceStepFraction = 5;
        else if (stepFraction <= 6) niceStepFraction = 6;
        else if (stepFraction <= 8) niceStepFraction = 8;
        else niceStepFraction = 10;
        
        const stepSize = niceStepFraction * magnitude;
        yMax = stepSize * 6;
    }
    
    const yAxisLabels = [];
    for (let i = yMax; i >= 0; i -= (yMax / 6)) {
        if (i === 0) {
            yAxisLabels.push("0");
        } else if (i >= 1000000) {
            yAxisLabels.push((i / 1000000) + 'm');
        } else if (i >= 1000) {
            yAxisLabels.push((i / 1000) + 'k');
        } else {
            yAxisLabels.push(i.toString());
        }
    }

    const initials = (customer.display_name || "?").substring(0, 1).toUpperCase();

    return (
        <div className="customer-details-container">
            <h2 className="details-header">{customer.display_name}</h2>
            
            <div className="details-grid">
                {/* Left Card: Overview */}
                <div className="overview-card">
                    <div className="tabs-header">
                        <button 
                            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                            onClick={() => setActiveTab('overview')}
                        >Overview</button>
                        <button 
                            className={`tab-btn ${activeTab === 'transactions' ? 'active' : ''}`}
                            onClick={() => setActiveTab('transactions')}
                        >Transactions</button>
                        <button 
                            className={`tab-btn ${activeTab === 'mails' ? 'active' : ''}`}
                            onClick={() => setActiveTab('mails')}
                        >Mails</button>
                        
                        <div className="tab-underline" style={{
                            width: activeTab === 'overview' ? '63px' : activeTab === 'transactions' ? '90px' : '36px',
                            transform: `translateX(${activeTab === 'overview' ? '4px' : activeTab === 'transactions' ? '130px' : '282px'})`
                        }}></div>
                    </div>

                    <div className="tab-slider-wrapper">
                        <div className="tab-slider-content" style={{ transform: `translateX(${activeTab === 'overview' ? '0' : activeTab === 'transactions' ? '-380px' : '-760px'})` }}>
                            
                            {/* Overview Tab */}
                            <div className="tab-pane">
                                <div className="details-inner-container">
                                    <div className="details-top-part">
                                        <div className="avatar-circle">{initials}</div>
                                        <div className="profile-info">
                                            <div className="profile-name">{customer.display_name}</div>
                                            <div className="profile-email">{customer.email}</div>
                                            <div className="profile-phone">{customer.phone || 'No phone provided'}</div>
                                        </div>
                                        <div className="edit-btn top-edit-btn">Edit</div>
                                    </div>

                                    <div className="details-bottom-part">
                                        <div className="details-bottom-top">
                                            <span className="section-title">OTHER DETAILS</span>
                                        </div>
                                        <div className="details-bottom-bottom">
                                            <div className="detail-row">
                                                <div className="detail-label">Customer Type</div>
                                                <div className="detail-value">Individual</div>
                                                <div className="edit-btn">Edit</div>
                                            </div>
                                            <div className="detail-row">
                                                <div className="detail-label">Default Currency</div>
                                                <div className="detail-value">INR</div>
                                            </div>
                                            <div className="detail-row">
                                                <div className="detail-label">Country</div>
                                                <div className="detail-value">INDIA</div>
                                            </div>
                                            <div className="detail-row">
                                                <div className="detail-label">Language</div>
                                                <div className="detail-value">English</div>
                                            </div>
                                            <div className="detail-row">
                                                <div className="detail-label">Company Name</div>
                                                <div className="detail-value">{customer.company_name || 'if any*'}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Transactions Tab */}
                            <div className="tab-pane transactions-pane">
                                {invoices.length > 0 ? (
                                    <>
                                        <div className="transactions-header">
                                            <button className="add-transaction-btn">
                                                <img src="/assets/icons/add-whitebg.svg" alt="add" width="10" height="10" />
                                                Add
                                            </button>
                                        </div>
                                        <div className="transactions-list">
                                            {invoices.map(inv => {
                                                const rawStatus = (inv.status || 'draft').toLowerCase();
                                                return (
                                                    <div key={inv.id} className="t-card">
                                                        <div className="t-top">
                                                            <div className="t-inv-no">{inv.invoice_code || 'AB0001'}</div>
                                                            <div className="t-amount">₹{inv.total_amount || '0.00'}</div>
                                                        </div>
                                                        <div className="t-date">
                                                            {new Date(inv.invoice_date).toLocaleDateString('en-GB').replace(/\//g, '-')} • {inv.order_code || 'AB001'}
                                                        </div>
                                                        <div className="t-bot">
                                                            <div className={`t-status ${rawStatus}`}>
                                                                {inv.status ? inv.status.charAt(0).toUpperCase() + inv.status.slice(1) : 'Draft'}
                                                                <img src={rawStatus === 'draft' ? "/assets/icons/mail-grey.svg" : "/assets/icons/mail.svg"} alt="mail" />
                                                            </div>
                                                            <div className="t-attach">
                                                                <img src="/assets/icons/paperclip.svg" alt="attach" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </>
                                ) : (
                                    <div className="empty-transactions">
                                        <button className="add-transaction-btn-big">
                                            <img src="/assets/icons/add-whitebg.svg" alt="add" width="14" height="14" />
                                            Add Transaction
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Mails Tab */}
                            <div className="tab-pane mails-pane">
                                <div className="mails-list">
                                    {staticMails.map(mail => (
                                        <div key={mail.id} className="m-card">
                                            <div className="m-to">To {mail.to}</div>
                                            <div className="m-subject">{mail.subject}</div>
                                            <div className="m-date">{mail.date}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

                {/* Right Card: Chart */}
                <div className="chart-card">
                    <div className="chart-header">
                        <div className="chart-title-group">
                            <div className="chart-title">Income and Expense</div>
                            <div className="chart-subtitle">*this chart is displayed in the organization base currency.</div>
                        </div>
                        <div className="chart-dropdown">
                            Last 6 Months
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L5 5L9 1" stroke="#1231FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>

                    <div className="main-graph-area">
                        <div className="bar-chart-container">
                            <div className="y-axis">
                                {yAxisLabels.map((label, idx) => (
                                    <div key={idx}>{label}</div>
                                ))}
                            </div>
                            
                            <div className="grid-lines">
                                {yAxisLabels.map((_, idx) => (
                                    <div key={idx} className="grid-line"></div>
                                ))}
                            </div>

                            <div className="chart-bars">
                                {monthlyStats.map((stat, idx) => {
                                    const heightPercentage = stat.income > 0 ? (stat.income / yMax) * 100 : 0;
                                    const [month, year] = stat.label.split(' ');
                                    return (
                                        <div key={idx} className="bar-wrapper">
                                            <div 
                                                className="bar" 
                                                style={{ height: `${heightPercentage}%` }}
                                            ></div>
                                            <div className="x-axis-label">
                                                <span className="x-month">{month}</span>
                                                <span className="x-year">{year}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Card: Activity */}
            <div className="details-card" style={{ minHeight: '300px' }}>
                <div className="activity-title">Activity</div>
            </div>
        </div>
    );
}
