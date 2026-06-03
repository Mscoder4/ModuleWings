"use client";

import Link from 'next/link';

export default function Employees() {
    return (
        <>
            <link rel="stylesheet" href="/assets/css/dashboard.css" />
            <link rel="stylesheet" href="/assets/css/users.css" />
            
            <header className="dashboard-topbar">
                <h1 className="dashboard-topbar-title">Users</h1>
                <div className="dashboard-topbar-actions">
                    <span className="chip">Admin</span>
                    <Link className="logout-btn" href="/login">
                        <span>Logout</span>
                        <span>→</span>
                    </Link>
                </div>
            </header>

            <div className="dashboard-content">
                <div className="users-actions">
                    <h2 style={{ fontSize: '16px', margin: 0 }}>All users</h2>
                    <Link href="/customers/edit" className="btn-small primary">+ Add user</Link>
                </div>
                <div className="users-table-wrap">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>Display name</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th>Company</th>
                                <th>Currency</th>
                                <th>Phone</th>
                                <th>Phone 2</th>
                                <th></th>
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
