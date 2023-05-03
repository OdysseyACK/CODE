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
import Event from "./pages/Event";
import { EventStore } from "./EventStore";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import AdminRoute from "./components/AdminRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VendorRoute from "./components/VendorRoute";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(EventStore);
  const { userInfo } = state;

  const logoutHandler = () => {
    ctxDispatch({ type: "USER_LOGOUT" });
    localStorage.removeItem("userInfo");
    window.location.href = "/login";
  };

  const [showNavNoTogglerSecond, setShowNavNoTogglerSecond] = useState(false);
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <MDBNavbar expand="lg" light bgColor="light" fixed="top">
            <MDBContainer fluid>
              <MDBNavbarBrand href="/">Odyssey</MDBNavbarBrand>
              <MDBNavbarToggler
                type="button"
                data-target="#navbarTogglerDemo02"
                aria-controls="navbarTogglerDemo02"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={() =>
                  setShowNavNoTogglerSecond(!showNavNoTogglerSecond)
                }
              >
                <MDBIcon icon="bars" fas />
              </MDBNavbarToggler>
              <MDBCollapse navbar show={showNavNoTogglerSecond}>
                <MDBNavbarNav
                  right
                  fullWidth={false}
                  className="mr-auto mb-2 mb-lg-0"
                >
                  <MDBNavbarItem>
                    <MDBNavbarLink href="/vendors">Vendors</MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink href="/portfolio">Portfolio</MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink href="/contact">Contact Us</MDBNavbarLink>
                  </MDBNavbarItem>
                  {userInfo ? (
                    <MDBNavbarItem>
                      <MDBDropdown>
                        <MDBDropdownToggle
                          tag="a"
                          className="nav-link"
                          role="button"
                        >
                          {userInfo.name}
                        </MDBDropdownToggle>
                        <MDBDropdownMenu>
                          <MDBDropdownItem link>
                            <Link className="nav-link" to="/profilepage">
                              Profile
                            </Link>
                          </MDBDropdownItem>
                          {userInfo && userInfo.isAdmin ? (
                            <MDBDropdownItem link href="/admin/dashboard">
                              Dashboard
                            </MDBDropdownItem>
                          ) : (
                            <></>
                          )}

                          <MDBDropdownItem divider />
                          <MDBDropdownItem link onClick={logoutHandler}>
                            Logout
                          </MDBDropdownItem>
                        </MDBDropdownMenu>
                      </MDBDropdown>
                    </MDBNavbarItem>
                  ) : (
                    <MDBNavbarItem>
                      <MDBNavbarLink href="/login">Login</MDBNavbarLink>
                    </MDBNavbarItem>
                  )}
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBContainer>
          </MDBNavbar>
        </header>
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/vendors" element={<Vendors />} />

            <Route path="/profilepage" element={<ProfilePage />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route
              path="/vcalculator"
              element={
                <ProtectedRoute>
                  <Vcalculator />
                </ProtectedRoute>
              }
            />
            <Route path="/itinerary" element={<Itinerary />} />
            <Route path="/event" element={<Event />} />
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
