import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import API_BASE_URL from "../config/api";

export default function ForgotPassword() {
  const [credentials, setCredentials] = useState({
    email: "",
    securityAnswer: "",
    newPassword: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/resetpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          securityAnswer: credentials.securityAnswer,
          newPassword: credentials.newPassword,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        alert("Password Reset Successfully. Please Login!");
        navigate("/login");
      } else {
        alert(json.message || "Failed to reset password");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server Error");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1551782450-a2132b4ba21d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80")',
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      <div>
        <Navbar />
      </div>
      <div className="container">
        <form
          className="w-50 m-auto mt-5 border bg-dark border-success rounded"
          style={{ boxShadow: "0px 0px 20px #28a745" }}
          onSubmit={handleSubmit}
        >
          <div className="m-3">
            <label htmlFor="email" className="form-label text-light">
              Email address
            </label>
            <input
              type="email"
              className="form-control bg-dark text-light"
              name="email"
              value={credentials.email}
              onChange={onChange}
              required
            />
          </div>
          <div className="m-3">
            <label htmlFor="securityAnswer" className="form-label text-light">
              Security Question: What is your favorite food?
            </label>
            <input
              type="text"
              className="form-control bg-dark text-light"
              name="securityAnswer"
              value={credentials.securityAnswer}
              onChange={onChange}
              required
            />
          </div>
          <div className="m-3">
            <label htmlFor="newPassword" className="form-label text-light">
              New Password
            </label>
            <input
              type="password"
              className="form-control bg-dark text-light"
              name="newPassword"
              value={credentials.newPassword}
              onChange={onChange}
              required
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Reset Password
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
}
