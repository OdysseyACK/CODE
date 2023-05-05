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
import { EventStore } from "./EventStore";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import AdminRoute from "./components/AdminRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          <MDBNavbar expand="lg" fixed="top" className="custom-navbar">
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
                    <MDBNavbarLink href="/vendors">
                      <button className="navBtn">Explore</button>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink href="/portfolio">
                      <button className="navBtn">Portfolio</button>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink href="/contact">
                      <button className="navBtn">Contact Us</button>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  {userInfo ? (
                    <MDBNavbarItem>
                      <MDBDropdown>
                        <MDBDropdownToggle
                          split
                          tag="a"
                          className="nav-link"
                          role="button"
                        >
                          <button className="navBtn">{userInfo.name}</button>
                        </MDBDropdownToggle>
                        <MDBDropdownMenu>
                          <MDBDropdownItem link>
                            <Link
                              className="nav-link"
                              to={`/profilepage/${userInfo._id}`}
                            >
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
                      <MDBNavbarLink href="/login">
                        <button className="navBtn">Login</button>
                      </MDBNavbarLink>
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
