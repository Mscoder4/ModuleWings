import React from 'react';

export default function ReceiptPreview() {
    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
            html, body { margin: 0; padding: 0; overflow: hidden; }
            * { box-sizing: border-box; }
            @import url('https://fonts.cdnfonts.com/css/satoshi');
        `}} />
            <div style={{ fontFamily: "'Satoshi', 'Satoshi-regular', 'DejaVu Sans', sans-serif", fontSize: '11px', lineHeight: 1.5, color: '#000000', backgroundColor: '#E9EDF6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1, padding: '82px 82px 24px 82px', background: '#E9EDF6', overflow: 'hidden' }}>
                    {/* Header (Same as Invoice) */}
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '60px' }}>
                        <tbody>
                            <tr>
                                <td style={{ verticalAlign: 'middle', textAlign: 'left' }}>
                                    <img src="/assets/images/invoice_logo.svg" alt="ModuleWings" style={{ height: '44px', width: 'auto', display: 'block' }} />
                                </td>
                                <td style={{ textAlign: 'right', verticalAlign: 'middle', fontSize: '40.03px', fontWeight: 600, color: '#000000', whiteSpace: 'nowrap', fontFamily: "'Manrope-semibold', sans-serif" }}>
                                    INVOICE
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '36px' }}>
                        <tbody>
                            <tr>
                                <td style={{ width: '55%', verticalAlign: 'top' }}>
                                    <div style={{ fontFamily: "'Satoshi-medium', sans-serif", fontSize: '20.02px', color: '#000000', marginBottom: '14px' }}>Client Name</div>
                                    <table style={{ fontSize: '13px', marginTop: '30px', borderCollapse: 'collapse' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ fontWeight: 400, color: '#000000', whiteSpace: 'nowrap', width: '70px' }}>Invoice Date:&nbsp;</td>
                                                <td style={{ fontFamily: "'Satoshi-bold', sans-serif", color: '#000000' }}>01 Jan 2026</td>
                                            </tr>
                                            <tr>
                                                <td style={{ fontWeight: 400, color: '#000000', whiteSpace: 'nowrap', width: '70px' }}>Invoice No.: &nbsp;</td>
                                                <td style={{ fontFamily: "'Satoshi-bold', sans-serif", color: '#000000' }}>AB001</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td style={{ width: '45%', verticalAlign: 'top', textAlign: 'right', fontSize: '13.34px', lineHeight: 1.4, fontWeight: 300, color: '#000000' }}>
                                    New Delhi Delhi 110094<br />
                                    India<br />
                                    +91 8447924973<br />
                                    billing@modulewings.com<br />
                                    <a style={{ textDecoration: 'none', color: '#000000' }} href="https://modulewings.com">www.modulewings.com</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Middle Part specific to Receipt */}
                    <div style={{
                        marginTop: '71px',
                        backgroundColor: '#1231FF',
                        color: '#ffffff',
                        width: '160px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: "'Satoshi-medium', sans-serif",
                        fontSize: '12px'
                    }}>
                        Payment Receipt
                    </div>

                    <table style={{ width: '100%', marginTop: '50px', borderCollapse: 'collapse' }}>
                        <tbody>
                            <tr>
                                <td style={{ verticalAlign: 'top' }}>
                                    <table style={{ borderCollapse: 'collapse' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ fontFamily: "'Satoshi-regular', sans-serif", fontSize: '10px', color: '#000000', paddingBottom: '17px', paddingRight: '98px' }}>Payment Date</td>
                                                <td style={{ fontFamily: "'Satoshi-medium', sans-serif", fontSize: '10px', color: '#000000', paddingBottom: '17px' }}>dd-mm-yyyy</td>
                                            </tr>
                                            <tr>
                                                <td style={{ fontFamily: "'Satoshi-regular', sans-serif", fontSize: '10px', color: '#000000', paddingBottom: '17px', paddingRight: '98px' }}>Payment Mode</td>
                                                <td style={{ fontFamily: "'Satoshi-medium', sans-serif", fontSize: '10px', color: '#000000', paddingBottom: '17px' }}>Bank Transfer</td>
                                            </tr>
                                            <tr>
                                                <td style={{ fontFamily: "'Satoshi-regular', sans-serif", fontSize: '10px', color: '#000000', paddingBottom: '17px', paddingRight: '98px' }}>Amount Received in Words</td>
                                                <td style={{ fontFamily: "'Satoshi-medium', sans-serif", fontSize: '10px', color: '#000000', paddingBottom: '17px' }}>Indian Rupee Five Thousand Dollar Only</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td style={{ verticalAlign: 'top', textAlign: 'right' }}>
                                    <div style={{
                                        display: 'inline-flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '180px',
                                        height: '80px',
                                        backgroundColor: '#1231FF',
                                        borderRadius: '5px',
                                        color: '#ffffff'
                                    }}>
                                        <div style={{ fontFamily: "'Satoshi-medium', sans-serif", fontSize: '10px' }}>Amount Received</div>
                                        <div style={{ fontFamily: "'Satoshi-black', sans-serif", fontWeight: 900, fontSize: '20px' }}>₹5000.00</div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table style={{ width: '100%', marginTop: '50px', borderCollapse: 'collapse' }}>
                        <tbody>
                            <tr>
                                <td style={{ verticalAlign: 'top' }}>
                                    <div style={{ fontFamily: "'Satoshi-regular', sans-serif", fontSize: '10px', color: '#000000', marginBottom: '7px' }}>Received From</div>
                                    <div style={{ fontFamily: "'Satoshi-medium', sans-serif", fontSize: '15px', color: '#000000' }}>Mr. Client Name</div>
                                </td>
                                <td style={{ verticalAlign: 'top', textAlign: 'right' }}>
                                    <img src="/assets/images/danishsig.svg" alt="Signature" style={{ width: '80px', display: 'block', marginLeft: 'auto', marginRight: 0, filter: 'brightness(0)' }} />
                                    <div style={{ fontSize: '10px', fontFamily: "'Satoshi-regular', sans-serif", color: '#000000', textAlign: 'right', marginRight: '10px' }}>Authorised By</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Footer Section */}
                <div style={{ backgroundColor: '#1231FF', color: '#ffffff', padding: '0 82px 24px 82px', flexShrink: 0, height: '350px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginTop: '83px', fontFamily: "'Satoshi-bold', sans-serif", fontSize: '15px', marginBottom: '20px' }}>Payment for</div>

                    <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', marginBottom: '15px', height: '30px' }}>
                        <thead>
                            <tr>
                                <th style={{ width: '25%', fontFamily: "'Satoshi-medium', sans-serif", fontSize: '10px', textAlign: 'left', paddingLeft: '15px', verticalAlign: 'middle', fontWeight: 'normal' }}>Invoice Number</th>
                                <th style={{ width: '25%', fontFamily: "'Satoshi-medium', sans-serif", fontSize: '10px', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'normal' }}>Invoice Date</th>
                                <th style={{ width: '25%', fontFamily: "'Satoshi-medium', sans-serif", fontSize: '10px', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'normal' }}>Invoice Amount</th>
                                <th style={{ width: '25%', fontFamily: "'Satoshi-medium', sans-serif", fontSize: '10px', textAlign: 'right', paddingRight: '15px', verticalAlign: 'middle', fontWeight: 'normal' }}>Payment Amount</th>
                            </tr>
                        </thead>
                    </table>

                    <table style={{ width: '100%', borderCollapse: 'collapse', height: '30px', marginBottom: '21px' }}>
                        <tbody>
                            <tr>
                                <td style={{ width: '25%', fontFamily: "'Satoshi-bold', sans-serif", fontSize: '10px', textAlign: 'left', paddingLeft: '15px', verticalAlign: 'middle' }}>CN0001</td>
                                <td style={{ width: '25%', fontFamily: "'Satoshi-bold', sans-serif", fontSize: '10px', textAlign: 'center', verticalAlign: 'middle' }}>dd mm yyyy</td>
                                <td style={{ width: '25%', fontFamily: "'Satoshi-bold', sans-serif", fontSize: '10px', textAlign: 'center', verticalAlign: 'middle' }}>₹5000.00</td>
                                <td style={{ width: '25%', fontFamily: "'Satoshi-bold', sans-serif", fontSize: '10px', textAlign: 'right', paddingRight: '15px', verticalAlign: 'middle' }}>₹5000.00</td>
                            </tr>
                        </tbody>
                    </table>

                    <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.25)', width: '100%', margin: '0 0 20px 0' }} />
                    <table style={{ width: '100%', marginTop: 0, borderCollapse: 'collapse' }}>
                        <tbody>
                            <tr>
                                <td style={{ paddingLeft: '30px', verticalAlign: 'middle' }}>
                                    <div style={{ fontSize: '26px', fontWeight: 700, color: '#ffffff' }}>Thank You!</div>
                                    <div style={{ fontSize: '12px', color: '#ffffff', marginTop: '-5px' }}>for trusting our services. Looking forward to working again.</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
