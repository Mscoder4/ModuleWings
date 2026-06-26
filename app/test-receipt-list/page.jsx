'use client';
import React from 'react';

export default function TestReceiptList() {
    return (
        <div style={{ padding: '50px', fontFamily: 'sans-serif' }}>
            <h1>Test Receipt Downloads</h1>
            <p>Click the button below to trigger the PDF generation of the new Payment Receipt layout.</p>
            
            <table style={{ width: '100%', maxWidth: '600px', borderCollapse: 'collapse', marginTop: '30px' }}>
                <thead>
                    <tr style={{ background: '#f4f4f4', textAlign: 'left' }}>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Invoice No.</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Client</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Amount</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>CN0001</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>Mr. Client Name</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>₹5000.00</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                            <a 
                                href="/api/receipts/download?id=CN0001" 
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                    display: 'inline-block',
                                    padding: '8px 16px',
                                    background: '#1231FF',
                                    color: 'white',
                                    textDecoration: 'none',
                                    borderRadius: '4px',
                                    fontWeight: 'bold',
                                    fontSize: '14px'
                                }}
                            >
                                Download Receipt
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <div style={{ marginTop: '50px' }}>
                <p><strong>Note:</strong> You can also view the HTML template directly without PDF rendering here:</p>
                <a href="/test-receipt" target="_blank" style={{ color: '#1231FF' }}>View HTML Template (/test-receipt)</a>
            </div>
        </div>
    );
}
