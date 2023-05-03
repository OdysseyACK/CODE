import { Tab, Tabs, Col } from "react-bootstrap";
import Vendor from "../components/Vendor";
import { useReducer, useEffect, useState } from "react";
import axios from "axios";
import { Row } from "react-bootstrap";
import { getError } from "../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, users: action.payload, loading: false };
    case "FETCH_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function Vendors() {
  const [{ loading, error, users }, dispatch] = useReducer(reducer, {
    users: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    axios
      .get("/api/users/vendors")
      .then((response) => {
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: "FETCH_FAILURE", payload: getError(error) });
      });
  }, []);

  return (
    <div>
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-slideshow">
          <div class="slide"></div>
          <div class="slide"></div>
        </div>
        <div className="hero-content text-center sliding-text-container"></div>
      </section>
      <div className="container mt-5">
        <section className="vendors">
          <div>
            {users.map((user) => (
              <Vendor user={user}></Vendor>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Vendors;
