import { React, useContext, useReducer, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle,
} from "mdb-react-ui-kit";
import { Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { EventStore } from "../EventStore";
import { getError } from "../utils";
import LoadingBox from "../components/LoadingBox";
import Avatar from "react-avatar-edit";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };
    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true, errorUpload: "" };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        loadingUpload: false,
        errorUpload: "",
      };
    case "UPLOAD_FAIL":
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
};

export default function EditProfileButton({ onUpdateUserData }) {
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);
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

  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });
  const { state, dispatch: ctxDispatch } = useContext(EventStore);
  const { userInfo } = state;
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [vendorDesc, setVendorDesc] = useState(userInfo.vendorDesc);
  const [vendorType, setVendorType] = useState(userInfo.vendorType);
  const [vendorPrice, setVendorPrice] = useState(userInfo.vendorPrice);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isVendor = userInfo.isVendor;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // display an error message if the password and confirm password fields don't match
      toast.error("Password does not match");
    } else {
      try {
        const data = {
          name,
          email,
          password,
          profilePic: preview,
        };

        if (isVendor) {
          data.vendorDesc = vendorDesc;
          data.vendorType = vendorType;
          data.vendorPrice = vendorPrice;
        }

        const { data: resData } = await axios.put("/api/users/account", data, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({
          type: "UPDATE_SUCCESS",
        });
        ctxDispatch({ type: "UPDATE_SUCCESS", payload: resData });
        localStorage.setItem("userInfo", JSON.stringify(resData));
        toast.success("User updated successfully");
        onUpdateUserData(resData);
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
        });
        toast.error(getError(err));
      }
    }
  };

  return (
    <div>
      <MDBModal
        staticBackdrop
        show={basicModal}
        setShow={setBasicModal}
        tabIndex="-1"
      >
        {" "}
        <MDBModalDialog className="modal-fullscreen-lg-down modal-lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Edit Profile</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <Form onSubmit={submitHandler}>
              <MDBModalBody>
                <Form.Group className="mb-3">
                  <Avatar
                    width={770}
                    height={300}
                    onClose={onClose}
                    onCrop={onCrop}
                    src={src}
                  />
                  {loadingUpload && <LoadingBox></LoadingBox>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="desc">
                  {userInfo.isVendor && (
                    <>
                      <Form.Label>About the Company</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={vendorDesc}
                        onChange={(e) => setVendorDesc(e.target.value)}
                        rows={4}
                      />
                    </>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="vendorType">
                  {userInfo.isVendor && (
                    <>
                      <Form.Label>Vendor Type</Form.Label>
                      <Form.Select
                        required
                        value={vendorType}
                        aria-label="Default select example"
                        onChange={(e) => setVendorType(e.target.value)}
                      >
                        <option>Type of Vendor</option>
                        <option value="Artiste">Artiste</option>
                        <option value="Catering">Caterer</option>
                        <option value="Decor">Decor</option>
                        <option value="Florist">Florist</option>
                        <option value="Photography">
                          Photography / Videography
                        </option>
                        <option value="Organiser">Organiser</option>
                        <option value="Venue">Venue</option>
                        <option value="Others">Others</option>
                      </Form.Select>
                    </>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  {userInfo.isVendor && (
                    <>
                      <Form.Label>Pricing</Form.Label>
                      <Form.Control
                        value={vendorPrice}
                        onChange={(e) => setVendorPrice(e.target.value)}
                      />
                    </>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Change Password</Form.Label>
                  <Form.Control
                    label="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    label="confirmPassword"
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn type="submit" onClick={onSaveChanges}>
                  Update
                </MDBBtn>
              </MDBModalFooter>
            </Form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <button className="edit-button" onClick={toggleShow}>
        Edit{" "}
        <svg class="edit-svg" viewBox="0 0 512 512">
          <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
        </svg>
      </button>
    </div>
  );
}
