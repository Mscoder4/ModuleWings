import {query} from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try{
        const body = await req.json();
        const {invoice_id, user_id,order_id,invoice_code,invoice_sequence,order_code,invoice_date,due_date,bill_to_name,subject,subtotal,status,remark,advance_received,discount,total_amount,invoice_items} = body;

        if (!invoice_id) {
            return NextResponse.json({error: "Invoice ID is missing"}, {status: 400});
        }

        await query("UPDATE invoices SET user_id = ?, order_id = ?, invoice_code = ?, invoice_sequence = ?, order_code = ?, invoice_date = ?, due_date = ?, bill_to_name = ?, subject = ?, subtotal = ?, status = ?, remark = ?, advance_received = ?, discount = ?, total_amount = ?, tax_amount = ? WHERE id = ?", [user_id,order_id,invoice_code,invoice_sequence,order_code,invoice_date,due_date,bill_to_name,subject,subtotal,status,remark,advance_received,discount,total_amount,0,invoice_id]);
        
        // Delete all existing items
        await query("DELETE FROM invoice_items WHERE invoice_id = ?", [invoice_id]);
        
        // Re-insert new items
        if(invoice_items && invoice_items.length > 0){
            for(const item of invoice_items){
                await query("INSERT INTO invoice_items (invoice_id, description, quantity, unit_price, line_total, service_name) VALUES (?, ?, ?, ?, ?, '')", [invoice_id, item.description, item.quantity, item.unit_price, item.line_total]);
            }
        }
        return NextResponse.json({message:"Invoice updated successfully"});
    }catch(err){
        console.error(err);
        return NextResponse.json({error:"Server error"},{status:500});
    }
}