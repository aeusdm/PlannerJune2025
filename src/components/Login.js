import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const savedData = JSON.parse(localStorage.getItem("signupData") || "{}");

    if (email === savedData.email && password === savedData.password) {
      alert("Login successful!");
      window.location.href = "/";
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 position-relative bg-white overflow-hidden">
      <div
        className="position-absolute top-0 start-0 w-100"
        style={{
          height: "60vh",
          background:
            "linear-gradient(to right top, #6ec3f4, #c27bf9, #f9ce7b)",
          clipPath: "polygon(0 0, 100% 0, 100% 60%, 0 100%)",
          zIndex: 0,
        }}
      ></div>

      <div
        className="form-container position-relative bg-white p-4 rounded shadow"
        style={{ zIndex: 1, maxWidth: "400px", width: "100%" }}
      >
        <div className="text-center mb-4">
          <h2 className="form-title fw-bold">Log In to QuickPlan</h2>
          <p className="form-subtitle text-muted small">
            Quick & Simple way to Track Your Day and Events
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="nealjustice@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="***"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3 d-flex justify-content-between align-items-center">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember Me
              </label>
            </div>
            <a href="/Signup" className="text-decoration-none small">
              Create Account
            </a>
          </div>

          <button
            type="button"
            className="btn btn-dark mb-3"
            style={{ width: "100%" }}
            onClick={() => (window.location.href = "/calendar")}
          >
            PROCEED
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
