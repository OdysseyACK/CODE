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
import { useNavigate, useParams } from "react-router-dom";
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

export default function EditProfileButton() {
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

  const navigate = useNavigate();
  const params = useParams();
  const { id: userId } = params;
  const { state, dispatch: ctxDispatch } = useContext(EventStore);
  const { userInfo } = state;

  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

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
                        required
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

      <MDBBtn onClick={toggleShow}>
        Edit <i class="fa-solid fa-xs fa-gear"></i>
      </MDBBtn>
    </div>
  );
}
