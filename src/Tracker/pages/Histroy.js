import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./Histroy.css";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";

export default function Histroy() {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Start with the current month
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Start with the current year
  const [selectedDate, setSelectedDate] = useState(""); // Set as empty to indicate no date selected
  const [totalSpent, setTotalSpent] = useState(0); // State for total spent
  const userId = useSelector((state) => state.user.userId); // Get userId from Redux
  const url = "https://expense-backend-api-80v6.onrender.com";
const token = useSelector((state) => state.user.token);
  // Generate years from 2020 to the current year
  const generateYears = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let year = 2023; year <= currentYear; year++) {
      years.push(year);
    }
    return years;
  };

  const getData = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/api/data/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }, // Include the token in the headers
      });
      const filteredData = response.data.filter((item) => {
        const expenseDate = new Date(item.date);
        const matchesMonth = expenseDate.getMonth() + 1 === selectedMonth;
        const matchesYear = expenseDate.getFullYear() === selectedYear;
        const matchesDate = selectedDate ? expenseDate.getDate() === Number(selectedDate) : true;

        return matchesMonth && matchesYear && matchesDate;
      });
      setData(filteredData);

      const total = filteredData.reduce((acc, item) => acc + parseInt(item.amount, 10), 0);
      setTotalSpent(total);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [userId, url, selectedMonth, selectedYear, selectedDate, token]);

  useEffect(() => {
    getData(); // Fetch data on component mount or when filters change
  }, [getData]);

  const deleteExpense = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`${url}/api/delete/${id}`);
        getData(); // Refresh the data after deletion
      } catch (error) {
        console.error("Error deleting expense:", error);
      }
    }
  };

  // Function to get the number of days in a month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  return (
    <>
      <Nav />
      <section>
        <h2 className="leadhistory">Your Expenses</h2>
      </section>
      <section className="addexpense">
        <Link to="/add-expense">Add New Expense</Link>
      </section>

      {/* Year, Month, and Date Filter Section */}
      <div className="month-filter">
        <label htmlFor="month">Filter by Month:</label>
        <select
          id="month"
          value={selectedMonth}
          onChange={(e) => {
            setSelectedMonth(Number(e.target.value));
            setSelectedDate(""); // Reset date selection when month changes
          }}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>

        <label htmlFor="year">Filter by Year:</label>
        <select
          id="year"
          value={selectedYear}
          onChange={(e) => {
            setSelectedYear(Number(e.target.value));
            setSelectedDate(""); // Reset date selection when year changes
          }}
        >
          {generateYears().map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <label htmlFor="date">Filter by Date (Optional):</label>
        <select
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)} // Use string value for clarity
        >
          <option value="">All Dates</option> {/* Allow all dates by default */}
          {/* Generate days based on selected month and year */}
          {Array.from(
            { length: getDaysInMonth(selectedMonth, selectedYear) },
            (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            )
          )}
        </select>

        <span className="total-spent">Total Spent: &#8377; {totalSpent}</span>
      </div>

      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item._id}>
                  <td>{item.category}</td>
                  <td>&#8377; {item.amount}</td>
                  <td>{item.description}</td>
                  <td>{item.date}</td>
                  <td>
                    <button
                      onClick={() => deleteExpense(item._id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No expenses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
