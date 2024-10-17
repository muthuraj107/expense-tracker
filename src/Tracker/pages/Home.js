import React from "react";
import "./Home.css";
import { MdAccountBalanceWallet } from "react-icons/md";
import { MdAnalytics } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import logo from "../img/icon.png";
import { useDispatch } from "react-redux";
import { setAuth } from "../Slice/Slice";
import logo1 from "../img/9391705.png";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  dispatch(setAuth(false));

  return (
    <div className="home-body">
      <div className="home-head">
        <img src={logo} alt="logo" className="head-logo" />
        <Link to="/signup" className="btn btn1">
          Signup
        </Link>
      </div>

      <div className="home-content">
        <div className="content-logo">
          <img src={logo1} alt="logo" />
        </div>
        <h1>
          Know where your money <br /> is going.
        </h1>
        <p>
          Track how you're spending every rupee, identify unwanted <br />
          subscriptions, and discover trends in your <br /> spending to figure
          out how to improve.
        </p>
        <Link to="/login" className="btn btn2">
          Get Started
        </Link>
      </div>

      <div className="home-card">
        <div className="card1">
          <span>
            <MdAccountBalanceWallet />
          </span>
          <h4>Manage Your Budget</h4>
          <p>
            Easily create and customize budget to stay on top of your spending.
          </p>
        </div>
        <div className="card1">
          <span>
            <MdAnalytics />
          </span>
          <h4>Analyze Your Expenses</h4>
          <p>
            Visualize your expenses with interactive charts and insightful
            reports.
          </p>
        </div>
        <div className="card1">
          <span>
            <FaMobileAlt />
          </span>
          <h4>Access Anywhere</h4>
          <p>Track your expenses on the go with a mobile-friendly app.</p>
        </div>
      </div>
    </div>
  );
}
