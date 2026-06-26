import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        
        if (!id) {
            return NextResponse.json({ error: "Customer ID is required" }, { status: 400 });
        }

        // Fetch user data
        const users = await query(
            "SELECT id, display_name, email, phone, company_name FROM users WHERE id = ?",
            [id]
        );

        if (!users || users.length === 0) {
            return NextResponse.json({ error: "Customer not found" }, { status: 404 });
        }

        // Fetch invoices for this user
        const invoices = await query(
            "SELECT invoice_date, total_amount, status FROM invoices WHERE user_id = ?",
            [id]
        );

        // Simple aggregation for the last 6 months (including current month)
        const months = [];
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        const currentDate = new Date();
        
        // Initialize last 6 months with 0
        for (let i = 5; i >= 0; i--) {
            const d = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
            const label = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
            months.push({
                label: label,
                monthIndex: d.getMonth(),
                year: d.getFullYear(),
                income: 0,
                expense: 0
            });
        }

        // Aggregate income
        invoices.forEach(inv => {
            // Check if status is paid or verified or partially paid (we'll count total_amount or just simplify and count all for now)
            if (inv.status !== 'draft' && inv.status !== 'cancelled') {
                const invDate = new Date(inv.invoice_date);
                if (!isNaN(invDate.getTime())) {
                    // Find if this invoice belongs to one of our last 6 months
                    const targetMonth = months.find(m => m.monthIndex === invDate.getMonth() && m.year === invDate.getFullYear());
                    if (targetMonth) {
                        targetMonth.income += parseFloat(inv.total_amount || 0);
                    }
                }
            }
        });

        return NextResponse.json({
            customer: users[0],
            stats: months
        });
        
    } catch (error) {
        console.error("Error fetching customer stats:", error);
        return NextResponse.json({ error: "Server error", details: error.message }, { status: 500 });
    }
}
