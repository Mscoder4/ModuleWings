"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CustomerDetails from "./CustomerDetails";

export default function CustomersPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeId = parseInt(searchParams.get("id")) || 0;
    const view = searchParams.get("view") || "table";

    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

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
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    useEffect(() => {
        const searchInput = document.querySelector('.search-bar input');
        const newBtn = document.querySelector('.new-btn');

        let handleSearch = null;

        if (searchInput) {
            searchInput.placeholder = "Search in Customers...";
            handleSearch = (e) => {
                const val = e.target.value.toLowerCase();
                const filtered = customers.filter(c => {
                    const name = (c.display_name || '').toLowerCase();
                    const company = (c.company_name || '').toLowerCase();
                    const email = (c.email || '').toLowerCase();
                    const phone = (c.phone || '').toLowerCase();
                    return name.includes(val) || company.includes(val) || email.includes(val) || phone.includes(val);
                });
                setFilteredCustomers(filtered);
            };
            searchInput.addEventListener('input', handleSearch);
        }

        if (newBtn) {
            newBtn.onclick = () => router.push('/user_edit');
        }

        return () => {
            if (searchInput && handleSearch) {
                searchInput.removeEventListener('input', handleSearch);
                searchInput.placeholder = "Search for anything...";
            }
        };
    }, [customers, router]);

    const formatCurrency = (val) => {
        return parseFloat(val).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    return (
        <>
            <link rel="stylesheet" href="/assets/css/customers.css" />
            {view === 'details' && <link rel="stylesheet" href="/assets/css/customer-details.css" />}
            <div className="split-view-container">
                <div className="split-list">
                    <div className="list-header">
                        <span className="header-title">Active Customers</span>
                        <button className="header-add-btn" onClick={() => router.push('/customers/add')}>Add</button>
                    </div>
                    <div className="split-list-content">
                        {filteredCustomers.map(c => {
                            const isActive = c.id === activeId ? 'active' : '';
                            return (
                                <div
                                    key={c.id}
                                    className={`customer-card ${isActive}`}
                                    onClick={() => router.push(`/customers?id=${c.id}${view === 'details' ? '&view=details' : ''}`)}
                                >
                                    <div className="card-header">
                                        <span className="customer-name">{c.display_name}</span>
                                    </div>
                                    <div className="card-details">
                                        <span>₹{formatCurrency(c.receivables || 0)}</span>
                                    </div>
                                </div>
                            );
                        })}
                        {filteredCustomers.length === 0 && !loading && (
                            <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>No customers found.</div>
                        )}
                        {loading && <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>}
                    </div>
                </div>

                <div className="split-right-pane">
                    {view === 'details' && activeId ? (
                        <CustomerDetails customerId={activeId} />
                    ) : (
                        <div className="customers-table-wrap">
                            <table className="customers-table">
                                <thead>
                                    <tr>
                                        <th id="filter"><img src="/assets/icons/sort.svg" alt="" /></th>
                                        <th id="checkbox"><input type="checkbox" id="main-checkbox" /></th>
                                        <th id="name">NAME</th>
                                        <th id="company">COMPANY NAME</th>
                                        <th id="email">EMAIL</th>
                                        <th id="phone">WORK PHONE</th>
                                        <th id="receivables">RECEIVABLES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCustomers.map(c => (
                                        <tr
                                            key={c.id}
                                            className={`customer-row ${c.id === activeId ? 'active-row' : ''}`}
                                            onDoubleClick={() => router.push(`/customers?id=${c.id}&view=details`)}
                                        >
                                            <td></td>
                                            <td><input type="checkbox" className="row-checkbox" /></td>
                                            <td>{c.display_name}</td>
                                            <td>{c.company_name || 'Module Wings'}</td>
                                            <td>{c.email}</td>
                                            <td>{c.phone || '+91 87430 23159'}</td>
                                            <td>₹{formatCurrency(c.receivables || 0)}</td>
                                        </tr>
                                    ))}
                                    {filteredCustomers.length === 0 && !loading && (
                                        <tr><td colSpan="7" style={{ textAlign: 'center' }}>No customers found.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
