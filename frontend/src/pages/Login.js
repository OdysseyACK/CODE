import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane,
  MDBBtn,
  MDBIcon, // dashboard edit user
} from "mdb-react-ui-kit";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { EventStore } from "../EventStore";
import { toast } from "react-toastify";
import { getError } from "../utils";
import Footer from "../components/Footer";

function Login() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(EventStore);
  const { userInfo } = state;

  const submitLoginHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/users/login", {
        email: email.trim().toLowerCase(),
        password: password.trim(),
      });
      ctxDispatch({ type: "USER_LOGIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <div>
          <MDBTabs
            pills
            justify
            className="mb-3 d-flex flex-row justify-content-center mt-5"
          >
            <MDBTabsItem>
              <MDBTabsLink
                className="tab"
                style={{ backgroundColor: "#278b7b", color: "white" }}
              >
                Login
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                style={{ backgroundColor: "#278b7b", color: "white" }}
                className="tab"
                href="/register"
              >
                Register
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>
        </div>

        <div className="login-container">
          <MDBTabsPane show>
            <div className="content text-center mb-3">
              <p>Sign in with:</p>

              <div
                className="d-flex justify-content-between mx-auto"
                style={{ width: "40%" }}
              >
                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-1"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="facebook-f" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-1"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="twitter" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-1"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="google" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-1"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="github" size="sm" />
                </MDBBtn>
              </div>

              <p className="text-center mt-3">or:</p>

              <form onSubmit={submitLoginHandler}>
                <div className="inputbox">
                  <input
                    className="input"
                    id="form1"
                    type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span>Email</span>
                  <i></i>
                </div>
                <div className="inputbox">
                  <input
                    className="input"
                    id="form2"
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span>Password</span>
                  <i></i>
                </div>

                <div className="d-flex justify-content-between mx-4 mb-4">
                  <a href="/contact">Forgot password?</a>
                </div>

                <button className="login-button">Login</button>
              </form>
            </div>
          </MDBTabsPane>
        </div>
      </MDBContainer>
      <Footer />
    </div>
  );
}

export default Login;
