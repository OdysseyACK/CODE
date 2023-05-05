import React, { useState, useContext } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon,
  MDBNavbarNav,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownToggle,
  MDBDropdownMenu,
} from "mdb-react-ui-kit";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Vendors from "./pages/Vendors";
import ProfilePage from "./pages/ProfilePage";
import Calendar from "./pages/Calendar";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Portfolio";
import Vcalculator from "./pages/Vcalculator";
import Itinerary from "./pages/Itinerary";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import AdminRoute from "./components/AdminRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BestNavbar from "./components/BestNavbar";
import { EventStore } from "./EventStore";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(EventStore);
  const { userInfo } = state;
  const logoutHandler = () => {
    ctxDispatch({ type: "USER_LOGOUT" });
    localStorage.removeItem("userInfo");
    window.location.href = "/login";
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <BestNavbar />
        </header>
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/vendors" element={<Vendors />} />

            <Route path="/profilepage/:id" element={<ProfilePage />} />
            <Route path="/calendar/:id" element={<Calendar />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route
              path="/vcalculator/:id"
              element={
                <ProtectedRoute>
                  <Vcalculator />
                </ProtectedRoute>
              }
            />
            <Route path="/itinerary/:id" element={<Itinerary />} />

            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
