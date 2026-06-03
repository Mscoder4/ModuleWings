"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Tools from './Tools';

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <>
            <aside className="sidebar">
                <div className="sidebar-brand">
                    <img src="/assets/images/11.svg" alt="Logo" />
                </div>
                <nav className="sidebar-nav">
                    <Link href="/dashboard" className={pathname === '/dashboard' ? 'active' : ''}>
                        <span className="icon"><img src="/assets/icons/home.svg" className="home" alt="" /></span>
                        <span>Home</span>
                    </Link>
                    <Link href="/customers" className={pathname?.startsWith('/customers') ? 'active' : ''}>
                        <span className="icon"><img src="/assets/icons/client.svg" alt="" /></span>
                        <span>Customers</span>
                    </Link>
                    <Link href="/invoices" className={pathname?.startsWith('/invoices') ? 'active' : ''}>
                        <span className="icon"><img src="/assets/icons/invoice.svg" alt="" /></span>
                        <span>Invoices</span>
                    </Link>
                    <Link href="/employees" className={pathname?.startsWith('/employees') ? 'active' : ''}>
                        <span className="icon"><img src="/assets/icons/employee.svg" alt="" /></span>
                        <span>Employee</span>
                    </Link>
                    <Link href="/orders" className={pathname?.startsWith('/orders') ? 'active' : ''}>
                        <span className="icon"><img src="/assets/icons/order.svg" alt="" /></span>
                        <span>Orders</span>
                    </Link>
                </nav>
                <div className="sidebar-footer">
                    <div className="user-info">
                        <div className="user-avatar">
                            <img src="/assets/images/mscoder.jpg" alt="" />
                        </div>
                        <div className="more">
                            <span id="profile-span">Profile</span>
                            <span id="more-icon"><img src="/assets/icons/more.svg" alt="" /></span>
                        </div>
                    </div>
                    <Link href="/login" className="logout-btn">
                        <span className="icon"><img src="/assets/icons/logout.svg" alt="" /></span>
                    </Link>
                </div>
            </aside>
            <Tools />
        </>
    );
}
