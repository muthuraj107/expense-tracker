import React, { useState, useEffect, useCallback } from "react";
import "./Dashboard.css";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { IoToday } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5"; // Importing a calendar icon
import Nav from "../components/Nav";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [todayMoney, setTodayMoney] = useState([]);
  const [todaySpend, setTodaySpend] = useState(0);
  const [currentMonthSpend, setCurrentMonthSpend] = useState(0);
  const [currentWeekSpend, setCurrentWeekSpend] = useState(0); // State for current week's spending
  const [tableVisible, setTableVisible] = useState(false); // State to track table visibility
  const url = "https://expense-backend-api-80v6.onrender.com";

  const userId = useSelector((state) => state.user?.userId);
  const userName = useSelector((state) => state.user?.userName); // Get the userId from Redux
  const currentDate = new Date().toISOString().split("T")[0];
  const currentMonth = new Date().getMonth();

  const getData = useCallback(async () => {
    if (userId) {
      try {
        const response = await axios.get(
          url + `/api/data/${userId}` // Pass userId as a parameter
        );
        setData(response.data); // Set the data
      } catch (error) {
        console.log(error);
      }
    }
  }, [userId, url]);

  useEffect(() => {
    getData(); // Fetch data on component mount or when userId changes
  }, [getData]);

  useEffect(() => {
    // Calculate expenses
    if (data.length) {
      const filteredTodayMoney = data?.filter(
        (item) => item?.date === currentDate
      );
      setTodayMoney(filteredTodayMoney);

      const totalTodaySpend = filteredTodayMoney?.reduce(
        (acc, current) => acc + parseInt(current.amount || 0),
        0
      );
      setTodaySpend(totalTodaySpend);

      const filteredCurrentMonth = data?.filter(
        (item) => new Date(item.date).getMonth() === currentMonth
      );
      const totalCurrentMonthSpend = filteredCurrentMonth?.reduce(
        (acc, current) => acc + parseInt(current.amount || 0),
        0
      );
      setCurrentMonthSpend(totalCurrentMonthSpend);

      // Calculate current week's spending
      const startOfWeek = new Date();
      startOfWeek?.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Set to the start of the week (Sunday)
      const filteredCurrentWeek = data?.filter(
        (item) => new Date(item.date) >= startOfWeek
      );
      const totalCurrentWeekSpend = filteredCurrentWeek?.reduce(
        (acc, current) => acc + parseInt(current.amount || 0),
        0
      );
      setCurrentWeekSpend(totalCurrentWeekSpend);
    }
  }, [data, currentDate, currentMonth]);

  // Set table visible when component mounts
  useEffect(() => {
    const handleScroll = () => {
      const tableElement = document?.querySelector(".today-table");
      if (
        tableElement &&
        tableElement.getBoundingClientRect().top < window.innerHeight
      ) {
        setTableVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <Nav />
      <section className="dashboard-body">
        <div className="dashboard-lead">
          <p className="greeting">Welcome Back ! {userName}</p>
          <h2>Dashboard</h2>
        </div>
        <section className="expense-card">
          <div className="card card2">
            <div className="icon">
              <IoToday size="40" />
            </div>
            <div className="card-data">
              <p>Today</p>
              &#8377;{todaySpend}
            </div>
          </div>
          <div className="card card3">
            <div className="icon">
              <IoCalendarOutline size={40} /> {/* Calendar icon */}
            </div>
            <div className="card-data">
              <p>This Week</p>
              &#8377;{currentWeekSpend}
            </div>
          </div>
          <div className="card card1">
            <div className="icon">
              <RiMoneyRupeeCircleFill size={40} />
            </div>
            <div className="card-data">
              <p>Total This Month</p>
              &#8377;{currentMonthSpend}
            </div>
          </div>
        </section>
        <section className="today">
          <h3>Today's Expense</h3>
          <div className={`today-table ${tableVisible ? "slideIn" : ""}`}>
            <table>
              <tbody>
                {todayMoney.map((item, index) => (
                  <tr key={index} className="table-row">
                    <td>{index + 1}</td>
                    <td>{item.category}</td>
                    <td>&#8377;{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </div>
  );
}
