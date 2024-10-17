import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import Logo from "./img/logo.png";
import axios from "axios";

export default function Signup() {
  const url = "https://expense-backend-api-80v6.onrender.com";
  const navigate = useNavigate();

  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // Loading state

  const handleSignup = async (event) => {
    event.preventDefault();

    if (data?.userName === "" || data?.email === "" || data?.password === "") {
      alert("Please enter all fields");
      return;
    }

    setLoading(true); // Set loading to true

    try {
      await axios.post(url + "/api/user/post", data);
      navigate("/Login");
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="signup-container">
      <div className="signup-sub-div">
        <img src={Logo} alt="Logo" className="logo" />
        <h2 className="signup-title">Signup</h2>
        <form className="signup-form" onSubmit={handleSignup}>
          <input
            type="text"
            name="userName"
            value={data.userName}
            onChange={handleChange}
            className="signup-input"
            placeholder="Username"
            required
          />
          <br />
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className="signup-input"
            placeholder="Email"
            required
          />
          <br />
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            className="signup-input"
            placeholder="Password"
            required
          />
          <br />
          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        {loading && <div className="loading-spinner"></div>}{" "}
        {/* Loading spinner */}
      </div>
    </div>
  );
}
