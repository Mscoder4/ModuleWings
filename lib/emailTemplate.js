export function generateInvoiceEmailHtml(data) {
    const {
        clientName = "Client Name",
        invoiceAmount = "0.00",
        invoiceNo = "CN0001",
        invoiceDate = "dd mm yyyy",
        dueDate = "dd mm yyyy",
        downloadLink = "#"
    } = data;

    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        @import url('https://fonts.cdnfonts.com/css/satoshi');
        
        body {
            background-color: #E9EDF6;
            background: linear-gradient(180deg, #FFFFFF 0%, #E9EDF6 100%);
            margin: 0;
            padding: 0;
            font-family: 'Satoshi', Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
        }
        
        /* Fallbacks for older clients */
        table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        td { font-family: 'Satoshi', Arial, sans-serif; }

        /* Responsive Styles */
        @media only screen and (max-width: 540px) {
            .main-wrapper { width: 100% !important; max-width: 100% !important; }
            .blue-container { width: 100% !important; max-width: 100% !important; height: auto !important; }
            .top-blue-section { height: 120px !important; }
            .white-box { width: 100% !important; max-width: 100% !important; height: auto !important; }
            .content-padding { padding: 25px 20px !important; }
            .spacer { width: 60px !important; }
            .download-btn { width: 100% !important; }
            .download-link { width: 100% !important; }
            
            .footer-cell { padding-top: 40px !important; }
            .footer-line { margin-bottom: 8px !important; line-height: 1 !important; display: block !important; }
        }
    </style>
</head>
<body style="background-color: #E9EDF6; background: linear-gradient(180deg, #FFFFFF 0%, #E9EDF6 100%); margin: 0; padding: 0;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #E9EDF6; background: linear-gradient(180deg, #FFFFFF 0%, #E9EDF6 100%); width: 100%;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                
                <!-- Main Wrapper -->
                <table class="main-wrapper" width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 500px; margin: 0 auto; text-align: left;">
                    
                    <!-- Top Greeting -->
                    <tr>
                        <td style="padding-bottom: 15px;">
                            <span style="font-family: 'Satoshi', Arial, sans-serif; font-size: 15px; font-weight: 500; color: #111111;">
                                Dear Mr. ${clientName}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-bottom: 40px;">
                            <p style="margin: 0; font-family: 'Satoshi', Arial, sans-serif; font-size: 12px; font-weight: 400; color: #686868; line-height: 1.5;">
                                Thank you for your business. Your invoice can be viewed, printed and downloaded as PDF from the link below. You can also choose to pay it online.
                            </p>
                        </td>
                    </tr>

                    <!-- Main Blue Container -->
                    <tr>
                        <td>
                            <table class="blue-container" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #1231FF; border-radius: 20px; width: 100%; max-width: 500px;">
                                <!-- Top Blue Section (Invoice Amount) -->
                                <tr>
                                    <td class="top-blue-section" align="center" valign="middle" style="height: 156px; padding: 20px 0;">
                                        <div style="font-family: 'Satoshi', Arial, sans-serif; font-size: 15px; color: #FFFFFF; margin-bottom: 0px; font-weight: 500;">
                                            Invoice Amount
                                        </div>
                                        <div style="font-family: 'Satoshi', Arial, sans-serif; font-size: 30px; font-weight: 900; color: #FFFFFF;">
                                            ₹${invoiceAmount}
                                        </div>
                                    </td>
                                </tr>
                                
                                <!-- Bottom White Section -->
                                <tr>
                                    <td align="center" valign="bottom" style="padding: 0 7px 7px 7px;">
                                        <table class="white-box" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #FFFFFF; border-bottom-left-radius: 17px; border-bottom-right-radius: 17px; width: 100%; max-width: 486px;">
                                            <tr>
                                                <td class="content-padding" align="center" valign="middle" style="padding: 25px 45px;">
                                                    
                                                    <!-- Invoice Details Table -->
                                                    <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin-bottom: 25px;">
                                                        <tr>
                                                            <td style="font-family: 'Satoshi', Arial, sans-serif; font-size: 14px; color: #686868; padding-bottom: 15px; white-space: nowrap;">Invoice No.</td>
                                                            <td class="spacer" width="130" style="width: 130px;"></td>
                                                            <td style="font-family: 'Satoshi', Arial, sans-serif; font-size: 14px; color: #111111; padding-bottom: 15px; font-weight: 500; white-space: nowrap;">${invoiceNo}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-family: 'Satoshi', Arial, sans-serif; font-size: 14px; color: #686868; padding-bottom: 15px; white-space: nowrap;">Invoice Date</td>
                                                            <td class="spacer" width="130" style="width: 130px;"></td>
                                                            <td style="font-family: 'Satoshi', Arial, sans-serif; font-size: 14px; color: #111111; padding-bottom: 15px; font-weight: 500; white-space: nowrap;">${invoiceDate}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-family: 'Satoshi', Arial, sans-serif; font-size: 14px; color: #686868; white-space: nowrap;">Due Date</td>
                                                            <td class="spacer" width="130" style="width: 130px;"></td>
                                                            <td style="font-family: 'Satoshi', Arial, sans-serif; font-size: 14px; color: #111111; font-weight: 500; white-space: nowrap;">${dueDate}</td>
                                                        </tr>
                                                    </table>

                                                    <!-- Download Button -->
                                                    <table cellpadding="0" cellspacing="0" border="0" align="center" class="download-btn" style="width: 214px;">
                                                        <tr>
                                                            <td align="center" style="background-color: #1231FF; border-radius: 4px; height: 30px;">
                                                                <a class="download-link" href="${downloadLink}" style="display: block; width: 100%; line-height: 30px; font-family: 'Satoshi', Arial, sans-serif; font-size: 12px; font-weight: 500; color: #FFFFFF; text-decoration: none; text-align: center;">
                                                                    Download Invoice 
                                                                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNi42NjY2NyAxMEwyLjUgNS44MzMzM0wzLjY2NjY3IDQuNjI1TDUuODMzMzMgNi43OTE2N1YwSDcuNVY2Ljc5MTY3TDkuNjY2NjcgNC42MjVMMTAuODMzMyA1LjgzMzMzTDYuNjY2NjcgMTBaTTAgMTMuMzMzM1Y5LjE2NjY3SDEuNjY2NjdWMTEuNjY2N0gxMS42NjY3VjkuMTY2NjdIMTMuMzMzM1YxMy4zMzMzSDBaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==" alt="Download" style="vertical-align: middle; margin-left: 6px; width: 14px; height: 14px; border: 0;" />
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </table>

                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td class="footer-cell" style="padding-top: 20px;">
                            <div style="font-family: 'Satoshi', Arial, sans-serif; font-size: 12px; font-weight: 500; color: #686868; line-height: 1.5;">
                                <div class="footer-line" style="color: #000000;">Regards</div>
                                <div class="footer-line">Danish A.</div>
                                <div class="footer-line">Module Wings</div>
                            </div>
                        </td>
                    </tr>

                </table>
                
            </td>
        </tr>
    </table>
</body>
</html>`;
}

export function generateReceiptEmailHtml(data) {
    const {
        clientName = "Client Name",
        invoiceAmount = "0.00",
        invoiceNo = "CN0001",
        invoiceDate = "dd mm yyyy"
    } = data;

    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        @import url('https://fonts.cdnfonts.com/css/satoshi');
        
        body {
            background-color: #E9EDF6;
            background: linear-gradient(180deg, #FFFFFF 0%, #E9EDF6 100%);
            margin: 0;
            padding: 0;
            font-family: 'Satoshi', Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
        }
        
        /* Fallbacks for older clients */
        table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        td { font-family: 'Satoshi', Arial, sans-serif; }

        /* Responsive Styles */
        @media only screen and (max-width: 540px) {
            .main-wrapper { width: 100% !important; max-width: 100% !important; }
            .blue-container { width: 100% !important; max-width: 100% !important; height: auto !important; }
            .top-blue-section { height: 120px !important; }
            .white-box { width: 100% !important; max-width: 100% !important; height: auto !important; }
            .content-padding { padding: 25px 20px !important; }
            .spacer { width: 60px !important; }
            
            .footer-cell { padding-top: 40px !important; }
            .footer-line { margin-bottom: 8px !important; line-height: 1 !important; display: block !important; }
        }
    </style>
</head>
<body style="background-color: #E9EDF6; background: linear-gradient(180deg, #FFFFFF 0%, #E9EDF6 100%); margin: 0; padding: 0;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #E9EDF6; background: linear-gradient(180deg, #FFFFFF 0%, #E9EDF6 100%); width: 100%;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                
                <!-- Main Wrapper -->
                <table class="main-wrapper" width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 500px; margin: 0 auto; text-align: left;">
                    
                    <!-- Top Greeting -->
                    <tr>
                        <td style="padding-bottom: 15px;">
                            <span style="font-family: 'Satoshi', Arial, sans-serif; font-size: 15px; font-weight: 500; color: #111111;">
                                Dear Mr. ${clientName}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-bottom: 40px;">
                            <p style="margin: 0; font-family: 'Satoshi', Arial, sans-serif; font-size: 12px; font-weight: 400; color: #686868; line-height: 1.5;">
                                Thank you for your payment. It was a pleasure doing business with you. We look forward to work together again!
                            </p>
                        </td>
                    </tr>

                    <!-- Main Blue Container -->
                    <tr>
                        <td>
                            <table class="blue-container" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #1231FF; border-radius: 20px; width: 100%; max-width: 500px;">
                                <!-- Top Blue Section (Invoice Amount) -->
                                <tr>
                                    <td class="top-blue-section" align="center" valign="middle" style="height: 155px; padding: 20px 0;">
                                        <div style="font-family: 'Satoshi', Arial, sans-serif; font-size: 15px; color: #FFFFFF; margin-bottom: 0px; font-weight: 500;">
                                            Payment Received
                                        </div>
                                        <div style="font-family: 'Satoshi', Arial, sans-serif; font-size: 30px; font-weight: 900; color: #FFFFFF;">
                                            ₹${invoiceAmount} <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzY5OF80MCkiPgo8cGF0aCBkPSJNMjguOTY1IDE2LjUxNjdMMjcuMTMzMyAxMy41MTgzTDI4LjA0MzMgMTAuMTIzM0MyOC4xODMzIDkuNTg2NjUgMjcuOTI2NiA5LjAxNDk5IDI3LjQyNSA4Ljc4MTY2TDI0LjI2MzMgNy4yNDE2NkwyMy4xOSAzLjg5MzMyQzIzLjAyNjYgMy4zNTY2NSAyMi40OSAzLjAyOTk5IDIxLjk0MTYgMy4wODgzMkwxOC40NTMzIDMuNTA4MzJMMTUuNzQ2NiAxLjI2ODMyQzE1LjMxNSAwLjkwNjY1NCAxNC42ODUgMC45MDY2NTQgMTQuMjUzMyAxLjI2ODMyTDExLjU0NjYgMy41MDgzMkw4LjA1ODMgMy4wODgzMkM3LjUwOTk3IDMuMDI5OTkgNi45NzMzIDMuMzU2NjUgNi44MDk5NyAzLjg5MzMyTDUuNzM2NjQgNy4yNDE2NkwyLjU3NDk3IDguNzgxNjZDMi4wNzMzIDkuMDE0OTkgMS44MTY2NCA5LjU4NjY1IDEuOTU2NjQgMTAuMTIzM0wyLjg2NjY0IDEzLjUxODNMMS4wMzQ5NyAxNi41MTY3QzAuNzQzMzAzIDE2Ljk5NSAwLjgzNjYzNiAxNy42MTMzIDEuMjQ0OTcgMTcuOTk4M0wzLjg0NjY0IDIwLjM1NUwzLjkyODMgMjMuODY2N0MzLjk1MTY0IDI0LjQyNjcgNC4zNTk5NyAyNC45MDUgNC45MDgzIDI0Ljk5ODNMOC4zNzMzIDI1LjU3TDEwLjM0NSAyOC40ODY3QzEwLjY2IDI4Ljk1MzMgMTEuMjU1IDI5LjEyODMgMTEuNzY4MyAyOC45MDY3TDE1IDI3LjUxODNMMTguMjMxNiAyOC45MDY3QzE4LjM4MzMgMjguOTY1IDE4LjUzNSAyOSAxOC42ODY2IDI5QzE5LjA3MTYgMjkgMTkuNDMzMyAyOC44MTMzIDE5LjY1NSAyOC40ODY3TDIxLjYyNjYgMjUuNTdMMjUuMDkxNiAyNC45OTgzQzI1LjY0IDI0LjkwNSAyNi4wNDgzIDI0LjQyNjcgMjYuMDcxNiAyMy44NjY3TDI2LjE1MzMgMjAuMzU1TDI4Ljc1NSAxNy45OTgzQzI:26LjA3MTYgMjMuODY2N0wyNi4xNTMzIDIwLjM1NUwyOC43NTUgMTcuOTk4M0MyOS4xNjMzIDE3LjYxMzMgMjkuMjU2NiAxNi45OTUgMjguOTY1IDE2LjUxNjdabTIwLjA2NTYgMTMuMTgzNUwxNC44ODggMTkuMTgyNUMxNC42NTgxIDE5LjQ0OTcgMTQuMzMyNiAxOS41ODczIDE0LjAwMzYgMTkuNTg3M0MxMy43NTI4IDE5LjU4NzMgMTMuNTAwOCAxOS41MDY4IDEzLjI4ODUgMTkuMzQxMkw5LjY3NzY0IDE2LjUzM0M5LjE2ODk3IDE2LjEzNzUgOS4wNzc5NyAxNS40MDQ4IDkuNDczNDcgMTQuODk2MkM5Ljg2ODk3IDE0LjM4OTggMTAuNjAxNiAxNC4yOTQyIDExLjExMDMgMTQuNjkyTDEzLjg0NjEgMTYuODE4OEwxOC4yOTgxIDExLjY1OThDMTguNzE3IDExLjE2OTggMTkuNDU2NiAxMS4xMTczIDE5Ljk0MzEgMTEuNTM4NUMyMC40MzIgMTEuOTU5NyAyMC40ODY4IDEyLjY5NTggMjAuMDY1NiAxMy4xODM1WiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF82OThfNDAiPgo8cmVjdCB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==" alt="Verified" style="vertical-align: middle; margin-bottom: 4px; margin-left: 8px; width: 30px; height: 30px; border: 0;" />
                                        </div>
                                    </td>
                                </tr>
                                
                                <!-- Bottom White Section -->
                                <tr>
                                    <td align="center" valign="bottom" style="padding: 0 7px 7px 7px;">
                                        <table class="white-box" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #FFFFFF; border-bottom-left-radius: 17px; border-bottom-right-radius: 17px; width: 100%; max-width: 486px;">
                                            <tr>
                                                <td class="content-padding" align="center" valign="middle" style="padding: 25px 45px;">
                                                    
                                                    <!-- Invoice Details Table -->
                                                    <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin-bottom: 0px;">
                                                        <tr>
                                                            <td style="font-family: 'Satoshi', Arial, sans-serif; font-size: 14px; color: #686868; padding-bottom: 30px; white-space: nowrap;">Invoice No.</td>
                                                            <td class="spacer" width="130" style="width: 130px;"></td>
                                                            <td style="font-family: 'Satoshi', Arial, sans-serif; font-size: 14px; color: #111111; padding-bottom: 30px; font-weight: 500; white-space: nowrap;">${invoiceNo}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-family: 'Satoshi', Arial, sans-serif; font-size: 14px; color: #686868; white-space: nowrap;">Payment Date</td>
                                                            <td class="spacer" width="130" style="width: 130px;"></td>
                                                            <td style="font-family: 'Satoshi', Arial, sans-serif; font-size: 14px; color: #111111; font-weight: 500; white-space: nowrap;">${invoiceDate}</td>
                                                        </tr>
                                                    </table>

                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td class="footer-cell" style="padding-top: 20px;">
                            <div style="font-family: 'Satoshi', Arial, sans-serif; font-size: 12px; font-weight: 500; color: #686868; line-height: 1.5;">
                                <div class="footer-line" style="color: #000000;">Regards</div>
                                <div class="footer-line">Danish A.</div>
                                <div class="footer-line">Module Wings</div>
                            </div>
                        </td>
                    </tr>

                </table>
                
            </td>
        </tr>
    </table>
</body>
</html>`;
}
