import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle,
} from "mdb-react-ui-kit";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { EventStore } from "../EventStore";
import { toast } from "react-toastify";
import { getError } from "../utils";
import Avatar from "react-avatar-edit";

function Register() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  // initialize state variables for user information
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isVendor, setIsVendor] = useState(false);
  const [isActive] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [uploadModal, setUploadModal] = useState(false);
  const toggleShow = () => setUploadModal(!uploadModal);
  const [src, setSrc] = useState(null);
  const [preview, setPreview] = useState(null);

  const onSaveChanges = () => {
    setSrc(preview);
    toggleShow();
  };
  const onClose = () => {
    setPreview(null);
  };
  const onCrop = (view) => {
    setPreview(view);
  };

  // initialize context from store for user information
  const { state, dispatch: ctxDispatch } = useContext(EventStore);
  const { userInfo } = state;

  // handle form submission
  const submitRegisterHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // display an error message if the password and confirm password fields don't match
      toast.error("Password does not match");
    } else {
      try {
        // send a request to the server to register the user
        const { data } = await axios.post("/api/users/register", {
          name,
          email: email.trim().toLowerCase(),
          password: password.trim(),
          isActive,
          isVendor,
          profilePic: preview,
        });
        // update the user information in the store and save it in local storage
        ctxDispatch({ type: "USER_LOGIN", payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
        // navigate to the redirect URL (or home page)
        navigate(redirect || "/");
      } catch (err) {
        // display an error message if the registration fails
        toast.error(getError(err));
      }
    }
  };

  // check if the user is already logged in and redirect them to the redirect URL (or home page)
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <Helmet>
        <title>Login/Register</title>
      </Helmet>
      <MDBTabs
        pills
        justify
        className="mb-3 d-flex flex-row justify-content-between mt-5"
      >
        <MDBTabsItem>
          <MDBTabsLink href="/login">Login</MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink href="/register">Register</MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show>
          <div className="text-center mb-3">
            <p>Sign up with:</p>

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
          </div>

          <div className="d-flex align-items-center justify-content-center mb-4">
            <img
              id="imgId"
              className="registerProfile"
              src={src ? src : "./images/default.jpg"}
              onClick={toggleShow}
              alt=""
            />
          </div>
          <MDBModal tabIndex="-1" show={uploadModal} setShow={setUploadModal}>
            <MDBModalDialog centered size="lg">
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>Upload Profile Picture</MDBModalTitle>
                  <MDBBtn
                    className="btn-close"
                    color="none"
                    onClick={toggleShow}
                  ></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                  <Avatar
                    width={770}
                    height={300}
                    onClose={onClose}
                    onCrop={onCrop}
                    src={src}
                  />
                </MDBModalBody>
                <MDBModalFooter>
                  <MDBBtn onClick={onSaveChanges}>Save Changes</MDBBtn>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>

          <form onSubmit={submitRegisterHandler}>
            <MDBInput
              wrapperClass="mb-4"
              label="Name"
              id="form1"
              type="text"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Email"
              id="form1"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="form1"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Confirm Password"
              id="form1"
              type="Password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div className="d-flex justify-content-center mb-4">
              <MDBCheckbox
                name="isVendor"
                id="flexCheck"
                label="I am registering as a vendor"
                onChange={(e) => setIsVendor(e.target.checked)}
                checked={isVendor}
              />
            </div>

            <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>
          </form>
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
  );
}

export default Register;
