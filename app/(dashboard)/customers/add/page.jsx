"use client";

import { useRouter } from "next/navigation";

export default function AddCustomerPage() {
    const router = useRouter();

    return (
        <>
            <link rel="stylesheet" href="/assets/css/customer-add.css" />
            
            <div className="add-customer-container">
                <div className="add-customer-card">
                    <h1 className="add-customer-header">New Customer</h1>
                    
                    <form onSubmit={(e) => e.preventDefault()}>
                        
                        {/* Customer Type */}
                        <div className="form-row">
                            <div className="form-label">Customer Type</div>
                            <div className="form-inputs radio-group">
                                <label>
                                    <input type="radio" name="customerType" defaultChecked />
                                    Business
                                </label>
                                <label>
                                    <input type="radio" name="customerType" />
                                    Individual
                                </label>
                            </div>
                        </div>

                        {/* Primary Contact */}
                        <div className="form-row">
                            <div className="form-label">Primary Contact</div>
                            <div className="form-inputs">
                                <select className="select-field" style={{ width: '140px' }} defaultValue="">
                                    <option value="" disabled hidden>Salutation</option>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Mrs.">Mrs.</option>
                                    <option value="Ms.">Ms.</option>
                                    <option value="Dr.">Dr.</option>
                                </select>
                                <input type="text" className="input-field" placeholder="First Name" />
                                <input type="text" className="input-field" placeholder="Last Name" />
                            </div>
                        </div>

                        {/* Company Name */}
                        <div className="form-row">
                            <div className="form-label">Company Name</div>
                            <div className="form-inputs">
                                <input type="text" className="input-field full" placeholder="Company Name" />
                            </div>
                        </div>

                        {/* Display Name */}
                        <div className="form-row">
                            <div className="form-label">Display Name</div>
                            <div className="form-inputs">
                                <input type="text" className="input-field full" placeholder="Select or type to add" />
                            </div>
                        </div>

                        {/* Currency */}
                        <div className="form-row">
                            <div className="form-label">Currency</div>
                            <div className="form-inputs">
                                <select className="select-field currency">
                                    <option value="INR">INR- Indian Rupee</option>
                                    <option value="USD">USD- US Dollar</option>
                                    <option value="EUR">EUR- Euro</option>
                                    <option value="GBP">GBP- British Pound</option>
                                </select>
                            </div>
                        </div>

                        {/* Email Address */}
                        <div className="form-row">
                            <div className="form-label">Email Address</div>
                            <div className="form-inputs">
                                <div className="email-wrapper full">
                                    <img src="/assets/icons/mail_grey.svg" alt="Email" className="email-icon" />
                                    <input type="email" className="input-field email" placeholder="Email Address" />
                                </div>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="form-row">
                            <div className="form-label">Phone</div>
                            <div className="form-inputs ph">
                                <div className="phone-group">
                                    <select className="select-field">
                                        <option value="+91">+91</option>
                                        <option value="+1">+1</option>
                                        <option value="+44">+44</option>
                                    </select>
                                    <input type="text" className="input-field" placeholder="Work" />
                                </div>
                                <div className="phone-group">
                                    <select className="select-field">
                                        <option value="+91">+91</option>
                                        <option value="+1">+1</option>
                                        <option value="+44">+44</option>
                                    </select>
                                    <input type="text" className="input-field" placeholder="Mobile" />
                                </div>
                            </div>
                        </div>

                        {/* Customer Language */}
                        <div className="form-row">
                            <div className="form-label">Customer Language</div>
                            <div className="form-inputs">
                                <select className="select-field language">
                                    <option value="English">English</option>
                                    <option value="Hindi">Hindi</option>
                                    <option value="Spanish">Spanish</option>
                                </select>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="form-actions">
                            <button type="button" className="btn-save">Save</button>
                            <button type="button" className="btn-cancel" onClick={() => router.back()}>Cancel</button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}
