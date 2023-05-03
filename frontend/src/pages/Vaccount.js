import { React, useContext, useReducer, useState } from "react";
import { Card, Form, Tab, Tabs, Button, Col, Image } from "react-bootstrap";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle,
  MDBTextArea,
} from "mdb-react-ui-kit";
import axios from "axios";
import { toast } from "react-toastify";
import { EventStore } from "../EventStore";
import { useNavigate, useParams } from "react-router-dom";
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

function Vaccount() {
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
  const params = useParams(); // /user/:id
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

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // display an error message if the password and confirm password fields don't match
      toast.error("Password does not match");
    } else {
      try {
        const { data } = await axios.put(
          "/api/users/vaccount",
          {
            name,
            email,
            password,
            vendorDesc,
            vendorType,
            vendorPrice,
            profilePic: preview,
          },
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({
          type: "UPDATE_SUCCESS",
        });
        ctxDispatch({ type: "USER_LOGIN", payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
        toast.success("User updated successfully");
        navigate(`/vaccount`, { replace: true });
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
      <div
        style={{
          width: "75%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "row",
          marginTop: "75px",
          marginBottom: "50px",
        }}
      >
        <div style={{ width: "40%" }}>
          <div
            className="avatar col-1"
            style={{ width: "150px", position: "relative", left: "50%" }}
          >
            <Image
              src={
                userInfo.profilePic !== ""
                  ? userInfo.profilePic
                  : "./images/default.jpg"
              }
              style={{ width: "19vw", height: "19vw", marginTop: "10%" }}
              roundedCircle
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "10%",
            marginTop: "10%",
          }}
        >
          <div
            style={{
              marginLeft: "10%",
              marginTop: "10%",
              marginBottom: "50%",
              width: "100%",
            }}
          >
            <div>
              <p style={{ fontSize: "1rem", width: "100%", textAlign: "left" }}>
                Name: {name}
              </p>
              <p style={{ fontSize: "1rem", width: "100%" }}>Email: {email}</p>
              <p style={{ fontSize: "1rem", width: "100%" }}>
                Vendor Catergory: {vendorType}
              </p>
            </div>
          </div>
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
                    <Form.Group className="mb-3" controlId="vendorType">
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
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Pricing</Form.Label>
                      <Form.Control
                        required
                        value={userInfo.vendorPrice}
                        onChange={(e) => setVendorPrice(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="desc">
                      <Form.Label>About the Company</Form.Label>
                      <MDBTextArea
                        label="Description of company"
                        rows={4}
                        onChange={(e) => setVendorDesc(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label>Change Password</Form.Label>
                      <Form.Control
                        label="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="confirmPassword">
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
      </div>

      <div className="account-content">
        <section>
          <Tabs
            defaultActiveKey="About"
            id="fill-tab"
            className="mb-3"
            fill
            justify
          >
            <Tab eventKey="About" title="About">
              <div className="about-co">
                <h3>{name}</h3>
                <p>
                  {userInfo.vendorDesc ? (
                    userInfo.vendorDesc
                  ) : (
                    <span style={{ fontStyle: "italic" }}>
                      Update Company Description via "Edit" button
                    </span>
                  )}
                </p>
              </div>
            </Tab>
            <Tab eventKey="Gallery" title="Gallery">
              <Col className="d-flex justify-content-center">
                <div className="gallery">
                  <div className="gallery-item" tabIndex={0}>
                    <Image
                      className="gallery-image"
                      src="./images/birthday.jpg"
                    ></Image>
                    <Image
                      className="gallery-image"
                      src="./images/birthday.jpg"
                    ></Image>
                    <Image
                      className="gallery-image"
                      src="./images/birthday.jpg"
                    ></Image>
                    <Image
                      className="gallery-image"
                      src="./images/birthday.jpg"
                    ></Image>
                    <Image
                      className="gallery-image"
                      src="./images/birthday.jpg"
                    ></Image>
                    <Image
                      className="gallery-image"
                      src="./images/birthday.jpg"
                    ></Image>
                  </div>
                </div>
              </Col>
            </Tab>
            {/* <Tab eventKey="Past Events" title="Past Events">
              <Col className="d-flex">
                <Card className="vaccount-cards">
                  <Card.Img variant="top" src="" />
                  <Card.Body>
                    <Card.Title>Event Name</Card.Title>
                    <Card.Text>
                      <p>Date</p>
                      <p>Time</p>
                      <p>Venue</p>
                      <p>Des</p>
                      <p>Status: Past</p>
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
                <Card className="vaccount-cards">
                  <Card.Img variant="top" src="" />
                  <Card.Body>
                    <Card.Title>Event Name</Card.Title>
                    <Card.Text>
                      <p>Date</p>
                      <p>Time</p>
                      <p>Venue</p>
                      <p>Des</p>
                      <p>Status: Past</p>
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Tab> */}
          </Tabs>
        </section>
      </div>
    </div>
  );
}
export default Vaccount;
