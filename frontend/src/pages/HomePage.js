import React, { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
} from "mdb-react-ui-kit";
import { Card, Form } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getError } from "../utils";

export default function HomePage() {
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);

  const navigate = useNavigate();

  const createHandler = async () => {
    const name = document.getElementById("form1").value;
    const type = document.getElementById("eventpicker").value;
    const startDate = document.getElementsByName("startdate")[0].value;
    const endDate = document.getElementsByName("enddate")[0].value;
    const startTime = document.getElementsByName("starttime")[0].value;
    const endTime = document.getElementsByName("endtime")[0].value;

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            localStorage.getItem("userInfo")
              ? JSON.parse(localStorage.getItem("userInfo")).token
              : null
          }`,
        },
        body: JSON.stringify({
          name,
          type,
          startDate,
          endDate,
          startTime,
          endTime,
          createdBy: JSON.parse(localStorage.getItem("userInfo"))._id,
        }),
      });

      if (!response.ok) {
        throw new Error("Form cannot be empty");
      }

      const savedEvent = await response.json();
      console.log(savedEvent);
      navigate("/login?redirect=/vcalculator");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div className="wrapper">
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-slideshow">
          <div className="slide"></div>
          <div className="slide"></div>
        </div>
        <div className="hero-content text-center sliding-text-container">
          <div />
          <h1 className="sliding-text">Plan Your Perfect Event</h1>
          <p className="sliding-subtext">
            From weddings to corporate gatherings, our virtual event planner has
            everything you need to make your event a success.
          </p>
        </div>
        <div className="modal-button">
          <MDBBtn
            onClick={toggleShow}
            className="start-button"
            style={{ marginTop: 7 }}
          >
            Get Started
          </MDBBtn>
          <MDBModal
            staticBackdrop
            show={basicModal}
            setShow={setBasicModal}
            tabIndex="-1"
          >
            <MDBModalDialog className="modal-fullscreen-lg-down modal-lg">
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>Create Your Own Event</MDBModalTitle>
                  <MDBBtn
                    className="btn-close"
                    color="none"
                    onClick={toggleShow}
                  ></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                  <MDBInput
                    className="mb-2 form-control-lg"
                    label="Name of Event"
                    id="form1"
                    type="text"
                    required
                  />
                  <Form.Group controlId="eventpicker">
                    <Form.Select required aria-label="Default select example">
                      <option>Type of Event</option>
                      <option value="Birthday">Birthday</option>
                      <option value="Corporate">Corporate</option>
                      <option value="Party">Party</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Others">Others</option>
                    </Form.Select>
                    <div
                      className="d-flex"
                      style={{ justifyContent: "space-between" }}
                    >
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label mt-2"
                      >
                        {" "}
                        Start Date:
                      </label>
                      <Form.Control
                        type="date"
                        className="w-25 m-2"
                        name="startdate"
                        placeholder="Start Date"
                        required
                      />
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label mt-2"
                      >
                        {" "}
                        End Date:
                      </label>
                      <Form.Control
                        type="date"
                        className="w-25 m-2"
                        name="enddate"
                        placeholder="End Date"
                        required
                      />
                    </div>
                    <div
                      className="d-flex"
                      style={{ justifyContent: "space-between" }}
                    >
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label mt-2"
                      >
                        {" "}
                        Start Time:
                      </label>
                      <Form.Control
                        type="time"
                        className="w-25 m-2"
                        name="starttime"
                        placeholder="Start Time"
                        required
                      />
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label mt-2"
                      >
                        {" "}
                        End Time:
                      </label>
                      <Form.Control
                        type="time"
                        className="w-25 m-2"
                        name="endtime"
                        placeholder="End Time"
                        required
                      />
                    </div>
                  </Form.Group>
                </MDBModalBody>

                <MDBModalFooter>
                  <MDBBtn onClick={createHandler}>Create</MDBBtn>
                  <MDBBtn color="secondary" onClick={toggleShow}>
                    Close
                  </MDBBtn>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        </div>
      </section>

      <div className="home-body">
        <section className="features">
          <div className="container">
            <h1 className="text-center my-5">Features</h1>
            <div className="row features-row">
              <div className="col-md-4">
                <div className="feature">
                  <i className="fa fa-calendar"></i>
                  <h3>Event Calendar</h3>
                  <p>
                    Keep track of important dates and deadlines with our
                    built-in event calendar.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="feature"></div>
                <i className="fa fa-file-text"></i>
                <h3>Checklists & Templates</h3>
                <p>
                  Choose from a variety of pre-made checklists and templates to
                  help you plan your event.
                </p>
              </div>
              <div className="col-md-4">
                <div className="feature"></div>
                <i className="fa-solid fa-calculator"></i>
                <h3>Budget Calculator</h3>
                <p>
                  Stay on track with your finances with our budget calculator.
                </p>
              </div>
              <div className="col-md-4">
                <div className="feature"></div>
                <i className="fa fa-user"></i>
                <h3>Vendor Directory</h3>
                <p>
                  Browse and book vendors for your event directly through our
                  site.
                </p>
              </div>
            </div>

            <h1 className="text-center my-5">Types of Events</h1>
            <div className="features-row">
              <Card className="event-card">
                <Card.Img
                  variant="top"
                  src="/images/birthday.jpg"
                  style={{ width: "13vw", height: "15vw" }}
                />
                <Card.Body>
                  <Card.Text style={{ fontSize: "1vw" }}>Birthdays</Card.Text>
                </Card.Body>
              </Card>
              <Card className="event-card">
                <Card.Img
                  variant="top"
                  src="/images/corporate.jpg"
                  style={{ width: "13vw", height: "15vw" }}
                />
                <Card.Body>
                  <Card.Text style={{ fontSize: "1vw" }}>Corporate</Card.Text>
                </Card.Body>
              </Card>
              <Card className="event-card">
                <Card.Img
                  variant="top"
                  src="/images/party.jpg"
                  style={{ width: "13vw", height: "15vw" }}
                />
                <Card.Body>
                  <Card.Text style={{ fontSize: "1vw" }}>Parties</Card.Text>
                </Card.Body>
              </Card>
              <Card className="event-card">
                <Card.Img
                  variant="top"
                  src="/images/wedding.jpg"
                  style={{ width: "13vw", height: "15vw" }}
                />
                <Card.Body>
                  <Card.Text style={{ fontSize: "1vw" }}>Weddings</Card.Text>
                </Card.Body>
              </Card>
            </div>

            <h1 className="text-center my-5">What We Offer</h1>
            <div className="service-container">
              <div className="service-item">
                <div className="service-item-content">
                  <i className="fa-solid fa-2xl fa-bowl-rice"></i>
                  <h5>Catering</h5>
                </div>
              </div>
              <div className="service-item">
                <div className="service-item-content">
                  <i className="fa-solid fa-2xl fa-couch"></i>
                  <h5>Decor</h5>
                </div>
              </div>
              <div className="service-item">
                <div className="service-item-content">
                  <i className="fa-solid fa-2xl fa-guitar"></i>
                  <h5>Entertainment</h5>
                </div>
              </div>
              <div className="service-item">
                <div className="service-item-content">
                  <i className="fa-solid fa-2xl fa-leaf"></i>
                  <h5>Floral</h5>
                </div>
              </div>
              <div className="service-item">
                <div className="service-item-content">
                  <i className="fa-solid fa-2xl fa-user-tie"></i>
                  <h5>Organisers</h5>
                </div>
              </div>
              <div className="service-item">
                <div className="service-item-content">
                  <i className="fa-solid fa-2xl fa-camera"></i>
                  <h5>Photography</h5>
                </div>
              </div>
              <div className="service-item">
                <div className="service-item-content">
                  <i className="fa-solid fa-2xl fa-location-dot"></i>
                  <h5>Venue</h5>
                </div>
              </div>
            </div>

            <h1 className="text-center my-5">Portfolio</h1>
            <div className="portfolio-container"></div>

            <h1 className="text-center my-5">Our Team</h1>
            <div className="team-container">
              <div className="team-card"></div>
              <div className="team-card"></div>
              <div className="team-card"></div>
            </div>

            <div className="partners-container">
              <div className="partners-title">
                <h2>Our Partners</h2>
              </div>
              <div className="sponsors-container">
                <div className="slider">
                  <div className="slide-track">
                    <div className="logo-slide">
                      <Image
                        className="img"
                        src="./images/cater1.png"
                        style={{ width: "13vw" }}
                      ></Image>
                    </div>
                    <div className="logo-slide">
                      <Image
                        className="img"
                        src="./images/cater2.png"
                        style={{ width: "13vw" }}
                      ></Image>
                    </div>
                    <div className="logo-slide">
                      <Image
                        className="img"
                        src="./images/media1.png"
                        style={{ width: "13vw" }}
                      ></Image>
                    </div>
                    <div className="logo-slide">
                      <Image
                        className="img"
                        src="./images/decor1.png"
                        style={{ width: "13vw" }}
                      ></Image>
                    </div>
                    <div className="logo-slide">
                      <Image
                        className="img"
                        src="./images/decor2.png"
                        style={{ width: "13vw" }}
                      ></Image>
                    </div>
                    <div className="logo-slide">
                      <Image
                        className="img"
                        src="./images/floral1.png"
                        style={{ width: "13vw" }}
                      ></Image>
                    </div>
                    <div className="logo-slide">
                      <Image
                        className="img"
                        src="./images/photo1.png"
                        style={{ width: "13vw" }}
                      ></Image>
                    </div>
                    <div className="logo-slide">
                      <Image
                        className="img"
                        src="./images/organiser3.png"
                        style={{ width: "13vw" }}
                      ></Image>
                    </div>
                    <div className="logo-slide">
                      <Image
                        className="img"
                        src="./images/venue1.jpg"
                        style={{ width: "13vw" }}
                      ></Image>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-container">
              <div className="contact-title">
                <h2>Contact Us</h2>
              </div>
              <div className="social-container">
                <i className="fa-brands fa-whatsapp"></i>
                <i className="fa-brands fa-instagram"></i>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
