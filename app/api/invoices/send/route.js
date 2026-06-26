import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { generateInvoiceEmailHtml } from '@/lib/emailTemplate';

export async function POST(req) {
    try {
        // Destructure invoice details directly from request
        const {
            toEmail,
            clientName,
            invoiceAmount,
            invoiceNo,
            invoiceDate,
            dueDate,
            downloadLink
        } = await req.json();

        if (!toEmail) {
            return NextResponse.json({ success: false, message: 'Recipient email is required' }, { status: 400 });
        }

        // Configure Nodemailer transporter using credentials from .env.local
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465, // Use secure port
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });

        // Generate the HTML content from our reusable template function
        const htmlContent = generateInvoiceEmailHtml({
            clientName,
            invoiceAmount,
            invoiceNo,
            invoiceDate,
            dueDate,
            downloadLink
        });

        // Set up email data
        const mailOptions = {
            from: `"Module Wings" <${process.env.SMTP_USER}>`,
            to: toEmail,
            subject: `Invoice ${invoiceNo || ''} from Module Wings`,
            html: htmlContent,
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);

        return NextResponse.json({ success: true, message: 'Email sent successfully', messageId: info.messageId }, { status: 200 });

    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ success: false, message: 'Failed to send email', error: error.message }, { status: 500 });
    }
}
