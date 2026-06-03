"use client";

import Link from 'next/link';

export default function Orders() {
    return (
        <>
            <link rel="stylesheet" href="/assets/css/dashboard.css" />
            <link rel="stylesheet" href="/assets/css/orders.css" />
            
            <header className="dashboard-topbar">
                <h1 className="dashboard-topbar-title">Orders</h1>
                <div className="dashboard-topbar-actions">
                    <span className="chip">Admin</span>
                    <Link className="logout-btn" href="/login">
                        <span>Logout</span>
                        <span>→</span>
                    </Link>
                </div>
            </header>

            <div className="dashboard-content">
                <div className="orders-actions">
                    <div className="orders-actions-left">
                        <h2 style={{ fontSize: '16px', margin: 0 }}>All orders</h2>
                        <div className="orders-count">0 shown</div>
                    </div>
                    <Link className="btn-small primary" href="/orders/create">+ Create order</Link>
                </div>

                <div className="orders-filters">
                    <Link className="filter-pill active" href="/orders?status=pending">Pending</Link>
                    <Link className="filter-pill" href="/orders?status=done">Done</Link>
                    <Link className="filter-pill" href="/orders?status=all">All</Link>
                </div>

                <div className="orders-table-wrap">
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Order code</th>
                                <th>Status</th>
                                <th>Type</th>
                                <th>Service #</th>
                                <th>User</th>
                                <th>Email</th>
                                <th>Notes</th>
                                <th>Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* No mock data as requested */}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
