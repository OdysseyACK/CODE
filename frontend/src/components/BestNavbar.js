import { useContext, useState } from "react";
import { EventStore } from "../EventStore";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Navbar() {
  const { state, dispatch: ctxDispatch } = useContext(EventStore);
  const { userInfo } = state;
  const showDiv = useMediaQuery("(max-width:950px)");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const logoutHandler = () => {
    ctxDispatch({ type: "USER_LOGOUT" });
    localStorage.removeItem("userInfo");
    window.location.href = "/login";
  };

  return (
    <div className="nav-full">
      <div className="navbar-left">
        <div className="brand-logo">
          <a href="/">Odyssey</a>
        </div>
      </div>
      <div className="navbar-right">
        <div className="vendor-btn">
          <Link to={"/vendors"}>
            <button className="navBtn">Vendor</button>
          </Link>
        </div>
        <div className="portfolio-btn">
          <Link to={"/portfolio"}>
            <button className="navBtn">Portfolio</button>
          </Link>
        </div>
        <div className="contact-btn">
          <Link to={"/contact"}>
            <button className="navBtn">Contact Us</button>
          </Link>
        </div>
        {userInfo ? (
          <div className="dropdown">
            <button className="dropbtn navBtn">{userInfo.name}</button>
            <div className="dropdown-content">
              <Link className="nav-link" to={`/profilepage/${userInfo._id}`}>
                Profile
              </Link>
              {userInfo && userInfo.isAdmin ? (
                <Link to={"/admin/dashboard"}>Dashboard</Link>
              ) : (
                <></>
              )}
              <Link onClick={logoutHandler}>Logout</Link>
            </div>
          </div>
        ) : (
          <Link to={"/login"}>
            <button className="navBtn">Login</button>
          </Link>
        )}
        {showDiv ? (
          <div>
            <div className="ham">
              <input
                className="label-check"
                id="label-check"
                type="checkbox"
                checked={isSidebarOpen}
                onChange={toggleSidebar}
              />
              <label htmlFor="label-check" className="hamburger-label">
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
                <label></label>
              </label>
            </div>
            <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
              <div className="res-nav-blank"></div>
              <Link to={"/"}>
                <div className="res-nav-logo">Odyssey</div>
              </Link>
              <Link to={"vendors"}>
                <div className="res-nav">Vendors</div>
              </Link>
              <Link to={"Portfolio"}>
                <div className="res-nav">Portfolio</div>
              </Link>
              <Link to={"contact"}>
                <div className="res-nav">Contact Us</div>
              </Link>
              {userInfo ? (
                <div>
                  <Link to={`/profilepage/${userInfo._id}`}>
                    <div className="res-nav">User Profile</div>
                  </Link>
                  {userInfo && userInfo.isAdmin ? (
                    <Link to={"/admin/dashboard"}>
                      <div className="res-nav">Dashboard</div>
                    </Link>
                  ) : (
                    <></>
                  )}
                  <div className="res-nav" onClick={logoutHandler}>
                    Logout
                  </div>
                </div>
              ) : (
                <Link to={"/login"}>
                  <div className="res-nav">Login</div>
                </Link>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
