import React from "react";
import Home from "./pages/Home";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import AddExpense from "./pages/AddExpense";
import History from "./pages/Histroy";
import Login from "./Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./Signup";
import NotFound from "./Notfound" // Importing a 404 component
import { useSelector } from "react-redux";

export default function App() {
  const auth = useSelector((state) => state.user?.auth);

  const ProtectedRoute = () => {
    if (!auth) {
      return <Navigate to="/" />;
    }
    return <Outlet />;
  };

  console.log("Auth state:", auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/history" element={<History />} />
        </Route>
        <Route path="*" element={<NotFound />} /> {/* Catch-all for 404 */}
      </Routes>
    </BrowserRouter>
  );
}
