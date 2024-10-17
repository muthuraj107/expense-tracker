import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useDispatch } from "react-redux";
import Logo from "./img/logo.png";
import axios from "axios";
import { setAuth, setUserData ,setUserName} from "./Slice/Slice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [Pass, setPass] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url = "https://expense-backend-api-80v6.onrender.com";

  const check = async (event) => {
    event.preventDefault();

    if (email === "" || Pass === "") {
      alert("Please enter your email and password");
      return;
    }

    setLoading(true); // Set loading to true when the API call starts

    try {
      const response = await axios.post(`${url}/api/user/login`, {
        email,
        password: Pass,
      });

      // Dispatch user data to Redux store
      dispatch(setAuth(true));
      dispatch(setUserData(response.data.id));
      dispatch(setUserName(response.data.userName)) // Assuming you're saving the user's ID

      // Navigate to Dashboard after successful login
      navigate("/Dashboard", { replace: true });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message); // Show error message from the backend
      } else {
        alert("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Set loading to false when the API call ends
    }
  };

  return (
    <div id="div">
      <div className="sub-div">
        <img src={Logo} alt="Logo" className="logo" />
        <h2 className="header">Expense Tracker</h2>
        <form onSubmit={check}>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <br />
          <input
            type="password"
            value={Pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Password"
          />
          <br />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"} {/* Show loading text */}
          </button>
        </form>
        {loading && <div className="loading-spinner"></div>} {/* Loading spinner */}
        <p className="register-prompt">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")} className="register-link">
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
