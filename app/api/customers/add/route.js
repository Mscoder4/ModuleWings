import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { type, salutation, firstName, lastName, currency, phoneWork, phoneMobile, lang, display_name, email, company } = await req.json();

        // Simple insert query with correctly matching placeholders and parameters
        const result = await query(
            `INSERT INTO users (first_name, last_name, salutation, email, phone, phone_secondary, display_name, company) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
            [firstName, lastName, salutation, email, phoneWork, phoneMobile, display_name, company]
        );
        
        return NextResponse.json({ id: result.insertId, message: "Customer added successfully" });
    } catch (error) {
        console.error("Error adding customer:", error);
        return NextResponse.json({ error: "Failed to add customer" }, { status: 500 });
    }
}