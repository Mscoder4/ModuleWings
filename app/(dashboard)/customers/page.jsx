"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Customers() {
    return (
        <>
            <link rel="stylesheet" href="/assets/css/customers.css" />
            
            <div className="split-view-container">
                <div className="split-list">
                    <div className="list-header">
                        <span className="header-title">Active Customers</span>
                        <Link href="/customers/edit">
                            <button className="header-add-btn">Add</button>
                        </Link>
                    </div>
                    <div className="split-list-content">
                        {/* No mock data as requested */}
                    </div>
                </div>
                
                <div className="split-right-pane">
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
                                {/* No mock data as requested */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
