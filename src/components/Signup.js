import React, { useState } from "react";

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      alert("Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    const signupData = {
      firstName,
      email,
      password,
    };

    localStorage.setItem("signupData", JSON.stringify(signupData));
    alert("Signup data saved.");
    window.location.href = "index.html";
  };

  return (
    <div
      style={{
        margin: 0,
        fontFamily: "'Segoe UI', sans-serif",
        background: "white",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "60vh",
          background:
            "linear-gradient(to right top, #6ec3f4, #c27bf9, #f9ce7b)",
          clipPath: "polygon(0 0, 100% 0, 100% 60%, 0 100%)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 400,
          width: "100%",
          background: "white",
          padding: 30,
          borderRadius: 10,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
        }}
      >
        <div className="text-center mb-4">
          <h2 style={{ fontWeight: 600, fontSize: 24 }}>
            Sign up to QuickPlan
          </h2>
          <p style={{ fontSize: 14, color: "#6c757d" }}>
            Quick &amp; Simple way to Track Your Day and Events
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="Neal"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
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
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="terms"
              required
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="terms">
              I agree to the{" "}
              <a href="#" style={{ textDecoration: "underline" }}>
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" style={{ textDecoration: "underline" }}>
                Privacy Policy
              </a>
              .
            </label>
          </div>
          <button
            type="button"
            className="btn btn-dark mb-3"
            style={{ width: "100%" }}
            onClick={() => (window.location.href = "/login")}
          >
            Create an Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
