export default function InvoicePreview() {
    return (
        <>
        <style dangerouslySetInnerHTML={{__html: `
            html, body { margin: 0; padding: 0; overflow: hidden; }
            * { box-sizing: border-box; }
        `}} />
        <div style={{ fontFamily: "'Satoshi-regular', 'DejaVu Sans', sans-serif", fontSize: '11px', lineHeight: 1.5, color: '#000000', backgroundColor: '#E9EDF6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, padding: '82px 82px 24px 82px', background: '#E9EDF6', overflow: 'hidden' }}>
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

                <div style={{ marginTop: '70px', marginBottom: '28px', marginLeft: '30px' }}>
                    <div style={{ fontSize: '10.68px', fontFamily: "'Satoshi-medium', sans-serif", color: '#000000', marginBottom: '2px' }}>Subject:</div>
                    <div style={{ fontSize: '10.68px', fontFamily: "'Satoshi-medium', sans-serif", color: '#000000' }}>Invoice for Services</div>
                </div>

                <table style={{ fontSize: '10.68px', width: '100%', borderCollapse: 'collapse', marginBottom: 0 }}>
                    <thead>
                        <tr>
                            <th style={{ fontWeight: 400, fontFamily: "'Satoshi-regular', sans-serif", color: '#000000', textAlign: 'left', padding: '10px 0', borderBottom: '1px solid #c8ccd9', width: '70px', textAlign: 'center' }}>#</th>
                            <th style={{ fontWeight: 400, fontFamily: "'Satoshi-regular', sans-serif", color: '#000000', textAlign: 'left', padding: '10px 0', borderBottom: '1px solid #c8ccd9' }}>Description</th>
                            <th style={{ fontWeight: 400, fontFamily: "'Satoshi-regular', sans-serif", color: '#000000', padding: '10px 0', borderBottom: '1px solid #c8ccd9', textAlign: 'right', paddingRight: '15px', width: '70px' }}>Qty</th>
                            <th style={{ fontWeight: 400, fontFamily: "'Satoshi-regular', sans-serif", color: '#000000', padding: '10px 0', borderBottom: '1px solid #c8ccd9', textAlign: 'right', paddingRight: '15px', width: '90px' }}>Rate</th>
                            <th style={{ fontWeight: 400, fontFamily: "'Satoshi-regular', sans-serif", color: '#000000', padding: '10px 0', borderBottom: '1px solid #c8ccd9', textAlign: 'right', paddingRight: '15px', width: '90px' }}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ fontFamily: "'Satoshi-medium', sans-serif", color: '#000000', padding: '30px 0 13px 0', verticalAlign: 'top', borderBottom: '1px solid #eaedf4', textAlign: 'center' }}>1</td>
                            <td style={{ fontFamily: "'Satoshi-medium', sans-serif", color: '#000000', padding: '30px 0 13px 0', verticalAlign: 'top', borderBottom: '1px solid #eaedf4' }}>Title - 1</td>
                            <td style={{ fontFamily: "'Satoshi-medium', sans-serif", color: '#000000', padding: '30px 15px 13px 0', verticalAlign: 'top', borderBottom: '1px solid #eaedf4', textAlign: 'right' }}>1</td>
                            <td style={{ fontFamily: "'Satoshi-medium', sans-serif", color: '#000000', padding: '30px 15px 13px 0', verticalAlign: 'top', borderBottom: '1px solid #eaedf4', textAlign: 'right' }}>1,000.00</td>
                            <td style={{ fontFamily: "'Satoshi-medium', sans-serif", color: '#000000', padding: '30px 15px 13px 0', verticalAlign: 'top', borderBottom: '1px solid #eaedf4', textAlign: 'right' }}>1,000.00</td>
                        </tr>
                    </tbody>
                </table>

                <table style={{ fontFamily: "'Satoshi-medium', sans-serif", width: '100%', borderCollapse: 'collapse', marginTop: '10px', marginLeft: 'auto', backgroundColor: 'rgba(18, 49, 255, 0.05)', borderRadius: '10px' }}>
                    <tbody>
                        <tr>
                            <td style={{ textAlign: 'right', paddingRight: '15px', color: '#000000', fontFamily: "'Satoshi-medium', sans-serif", borderTop: 'none', paddingTop: '10px' }}>Sub Total</td>
                            <td style={{ textAlign: 'right', paddingRight: '15px', width: '90px', color: '#000000', borderTop: 'none', paddingTop: '10px' }}>1,000.00</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'right', paddingRight: '15px', color: '#000000', fontFamily: "'Satoshi-bold', sans-serif", paddingTop: '7px', paddingBottom: '10px', fontSize: '10.68px' }}>Total</td>
                            <td style={{ textAlign: 'right', paddingRight: '15px', width: '90px', color: '#000000', fontFamily: "'Satoshi-bold', sans-serif", paddingTop: '7px', paddingBottom: '10px', fontSize: '10.68px' }}>1,000.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div style={{ backgroundColor: '#1231FF', color: '#ffffff', padding: '28px 82px 24px 82px', flexShrink: 0, height: '350px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px' }}>
                <table style={{ width: '100%', marginBottom: 0, borderCollapse: 'collapse' }}>
                    <tbody>
                        <tr>
                            <td style={{ width: '38%', paddingLeft: '30px', fontSize: '10.68px', fontWeight: 400, color: 'rgba(255, 255, 255, 0.85)', verticalAlign: 'bottom' }}>Bank Information</td>
                            <td style={{ textAlign: 'left', fontSize: '10.68px', fontWeight: 400, color: 'rgba(255, 255, 255, 0.85)', verticalAlign: 'bottom' }}>Due By</td>
                            <td style={{ width: '90px', textAlign: 'right', paddingRight: '15px', fontSize: '10.68px', fontWeight: 400, color: 'rgba(255, 255, 255, 0.85)', verticalAlign: 'bottom' }}>Total Due</td>
                        </tr>
                    </tbody>
                </table>
                <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.25)', width: '100%', margin: 0 }} />
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                        <tr>
                            <td style={{ width: '38%', paddingLeft: '30px', verticalAlign: 'middle', color: '#ffffff' }}>
                                <div style={{ fontSize: '10px', marginBottom: '4px', color: '#ffffff' }}>Account Number: <span style={{ fontFamily: "'Satoshi-bold', sans-serif", fontSize: '10.68px' }}>2150132266</span></div>
                                <div style={{ fontSize: '10px', marginBottom: '4px', color: '#ffffff' }}>IFSC Code:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style={{ fontFamily: "'Satoshi-bold', sans-serif", fontSize: '10.68px' }}>KKBK0004608</span></div>
                            </td>
                            <td style={{ textAlign: 'left', verticalAlign: 'middle', color: '#ffffff' }}>
                                <div style={{ fontFamily: "'Satoshi-medium', sans-serif", fontSize: '22.69px', color: '#ffffff', textAlign: 'left' }}>15 Jan 2026</div>
                            </td>
                            <td style={{ width: '90px', textAlign: 'right', paddingRight: '15px', verticalAlign: 'middle', color: '#ffffff' }}>
                                <div style={{ fontFamily: "'Satoshi-black', sans-serif", fontSize: '22.69px', color: '#ffffff' }}>₹1,000.00</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.25)', width: '100%', margin: 0 }} />
                <table style={{ width: '100%', marginTop: 0, borderCollapse: 'collapse' }}>
                    <tbody>
                        <tr>
                            <td style={{ paddingLeft: '30px', verticalAlign: 'middle' }}>
                                <div style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff' }}>Thank You!</div>
                                <div style={{ fontSize: '9px', color: 'rgba(255, 255, 255, 0.85)', marginTop: '2px' }}>for trusting our services. Looking forward to working again.</div>
                            </td>
                            <td style={{ textAlign: 'right', paddingRight: '15px', verticalAlign: 'middle', width: '90px' }}>
                                <img src="/assets/images/danishsig.svg" alt="Signature" style={{ height: '28px', display: 'block', marginLeft: 'auto', marginRight: 0 }} />
                                <div style={{ fontSize: '8px', color: 'rgba(255, 255, 255, 0.8)', textAlign: 'center', marginTop: '2px' }}>Authorised By</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
}
