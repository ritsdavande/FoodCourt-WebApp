import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API_BASE_URL from "../config/api";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
    securityAnswer: "",
  });
  let navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    let navLocation = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    };
    let lat = "";
    let long = "";
    let { coords } = await navLocation();
    lat = coords.latitude;
    long = coords.longitude;
    console.log(lat, long);
    let response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`
    );
    let data = await response.json();
    console.log(data);
    setCredentials({ ...credentials, geolocation: data.display_name });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_BASE_URL}/api/createuser`, {
      method: "POST", // corrected casing
      headers: {
        // corrected key
        "Content-Type": "application/json", // corrected casing
      },
      body: JSON.stringify({
        name: credentials.name,
        password: credentials.password,
        email: credentials.email,
        geolocation: credentials.geolocation,
        securityAnswer: credentials.securityAnswer,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials");
    }
    if (json.success) {
      alert("User Created Successfully. Please Login!");
      navigate("/login");
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
            <label htmlFor="name" className="form-label text-light">
              Name
            </label>
            <input
              type="text"
              className="form-control bg-dark text-light"
              name="name"
              value={credentials.name}
              onChange={onChange}
            />
          </div>
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
            />
            <div id="emailHelp" className="form-text text-light">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="m-3">
            <label htmlFor="address" className="form-label text-light">
              Address
            </label>
            <fieldset>
              <input
                type="text"
                className="form-control bg-dark text-light"
                name="geolocation"
                value={credentials.geolocation}
                onChange={onChange}
                aria-describedby="emailHelp"
              />
            </fieldset>
          </div>
          <div className="m-3">
            <button
              type="button"
              onClick={handleClick}
              name="geolocation"
              className=" btn btn-success"
            >
              Click for current Location
            </button>
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
            <label htmlFor="password" className="form-label text-light">
              Password
            </label>
            <input
              type="password"
              className="form-control bg-dark text-light"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already a user
          </Link>
        </form>
      </div>
    </div>
  );
}
