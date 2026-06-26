import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('id') || 'preview';
        
        // Launch Puppeteer. In a local environment, this will use the bundled Chromium.
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        
        const page = await browser.newPage();
        
        // Inject auth token so the headless browser can bypass the login screen
        const tokenCookie = req.cookies.get('token');
        if (tokenCookie) {
            await page.setCookie({
                name: 'token',
                value: tokenCookie.value,
                domain: 'localhost',
                path: '/',
            });
        }
        
        // Set standard A4 viewport size
        await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
        
        // Wait until network is idle to ensure web fonts (Satoshi) are fully loaded
        // Using localhost:3000 because this is a local Next.js dev server endpoint
        await page.goto(`http://localhost:3000/test-receipt?id=${id}`, {
            waitUntil: 'networkidle0'
        });
        
        // Generate PDF
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
        });
        
        await browser.close();
        
        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="Receipt-${id}.pdf"`
            }
        });
    } catch (error) {
        console.error('PDF Generation Error:', error);
        return NextResponse.json({ error: 'Failed to generate PDF: ' + error.message }, { status: 500 });
    }
}
