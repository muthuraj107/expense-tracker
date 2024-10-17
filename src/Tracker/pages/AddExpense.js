import React, { useState } from "react";
import "./AddExpense.css";
import Nav from "../components/Nav";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoReturnUpBackSharp } from "react-icons/io5";
import { useSelector } from "react-redux";

export default function AddExpense() {
  const userId = useSelector((state) => state.user.userId); // Get the userId from Redux
  const url = "https://expense-backend-api-80v6.onrender.com";

  const [data, setData] = useState({
    date: "",
    category: "",
    amount: "",
    description: "",
    userId:userId
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!data?.date || !data?.category || !data.amount) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Ensure the amount is a valid number
      if (isNaN(data?.amount) || Number(data?.amount) <= 0) {
        alert("Please enter a valid amount.");
        return;
      }

      // Post the expense data
      await axios.post(url+"/api/post", data);
      alert("Expense added successfully!");
      navigate("/History"); // Redirect to history after adding expense
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Failed to add expense. Please try again.");
    }
  };

  return (
    <>
      <Nav />
      <div className="container">
        <div className="AddExpense">
          <div className="back-btn">
            <Link to="/History">
              <IoReturnUpBackSharp size="35" />
            </Link>
          </div>
          <div className="section-body">
            <h3>Add Expense</h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                name="date"
                id="date"
                value={data.date}
                onChange={handleChange}
                required
              />
              <br />
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                name="category"
                value={data.category}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="food">Food</option>
                <option value="travel">Travel</option>
                <option value="mobile">Mobile</option>
                <option value="family">Family</option>
                <option value="transfer">Transfer</option>
                <option value="other">Other</option>
              </select>
              <br />
              <label htmlFor="amount">Amount:</label>
              <input
                type="text"
                name="amount"
                id="amount"
                placeholder="Amount"
                value={data.amount}
                onChange={handleChange}
                required
              />
              <br />
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                name="description"
                placeholder="Add description"
                value={data.description}
                onChange={handleChange}
              />
              <br />
              <button type="submit">Add Expense</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
