"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef(null);
  const router = useRouter();

  const handleLogin = async () => {
    const form = formRef.current;
    if (!form.reportValidity()) return;

    setErrorMessage("");
    const formData = new FormData(form);
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {e
        
        setErrorMessage(data.error || "Login failed");
        return;
      }
      if (data.token) localStorage.setItem("authToken", data.token);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setErrorMessage("Network error");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin();
    }
  };

  return (
    <>
      <link rel="stylesheet" href="/assets/css/login.css" />
      <div className="login-shell">
        <div className="card">
          <div className="logo-row">
            <img src="/assets/images/10.png" alt="Logo" className="logo-image" />
          </div>

          <div className="card-body">
            <div className="card-title">Admin Panel Login</div>
            <div className="card-sub">Welcome Back! Please enter your credentials.</div>
          </div>

          {errorMessage && (
            <div className="error-message">{errorMessage}</div>
          )}

          <form
            id="login-form"
            className="login-form"
            ref={formRef}
            autoComplete="off"
            onKeyPress={handleKeyPress}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="field-group">
              <div className="input-wrap">
                <input
                  className="input"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Username"
                  required
                />
              </div>
            </div>

            <div className="field-group">
              <div className="input-wrap">
                <input
                  className="input has-trailing"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  minLength="4"
                  placeholder="Password"
                  required
                />
                <button
                  className="eye-btn"
                  type="button"
                  id="togglePassword"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  title={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg id="eyeIconOff" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M3.2 4.6 20.8 19.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      <path d="M2.2 12s3.6-7 9.8-7c2 0 3.7.7 5.1 1.7" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                      <path d="M21.8 12s-3.6 7-9.8 7c-2.2 0-4.1-.8-5.6-1.9" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                      <path d="M9.5 9.7a3.2 3.2 0 0 0 4.6 4.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg id="eyeIconOn" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M2.2 12s3.6-7 9.8-7 9.8 7 9.8 7-3.6 7-9.8 7S2.2 12 2.2 12Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                      <path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Submit button OUTSIDE form — matches PHP layout exactly */}
          <div className="submit-wrap">
            <button
              id="login-submit"
              type="button"
              className="btn-primary"
              onClick={handleLogin}
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
