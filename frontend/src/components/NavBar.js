import { useContext } from "react";
import { EventStore } from "../EventStore";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { state } = useContext(EventStore);
  const { userInfo } = state;

  return (
    <div className="nav-full">
      <div className="navbar-left">
        <a className="brand-logo" href="/">
          odyssey
        </a>
      </div>
      <div className="navbar-right">
        <div className="vendor-btn">
          <Link>
            <button className="navBtn">Vendor</button>
          </Link>
        </div>
        <div className="portfolio-btn">
          <button className="navBtn">Portfolio</button>
        </div>
        <div className="contact-btn">
          <button className="navBtn">Contact Us</button>
        </div>
        <div className="dropdown">
          <button className="dropbtn navBtn">{userInfo.name}</button>
          <div className="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>
      </div>
    </div>
  )
};
