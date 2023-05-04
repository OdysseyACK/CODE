import React from "react";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import { Card } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import GetStartedButton from "../components/GetStartedButton";

export default function HomePage() {
  return (
    <div className="wrapper">
      <section className="hero">
        <div>
          <h1 className="heroTitle text-focus-in">Plan Your Perfect Event</h1>
          <p className="heroBody text-focus-in">
            From weddings to corporate gatherings, our virtual event planner has
            everything you need to make your event a success.
          </p>
        </div>
        <GetStartedButton />
      </section>

      <div className="home-body">
        <section className="features">
          <div className="container">
            <h1 className="featuresTitle text-center my-5">Features</h1>
            <MDBRow>
              <MDBCol sm={12} md={4} lg={4}>
                <div className=" feature text-center">
                  <h3 className="featureTitle">Event Calendar</h3>
                  <p className="featureBody">
                    Keep track of important dates and deadlines with our
                    built-in event calendar.
                  </p>
                </div>
              </MDBCol>
              <MDBCol sm={12} md={4} lg={4}>
                <div className="feature text-center">
                  <h3 className="featureTitle">Budget Calculator</h3>
                  <p className="featureBody">
                    Stay on track with your finances with our budget calculator.
                  </p>
                </div>
              </MDBCol>
              <MDBCol sm={12} md={4} lg={4}>
                <div className="feature text-center">
                  <h3 className="featureTitle">Vendor Directory</h3>
                  <p className="featureBody">
                    Browse and book vendors for your event directly through our
                    site.
                  </p>
                </div>
              </MDBCol>
            </MDBRow>

            <h1 className="text-center my-5">Types of Events</h1>
            <MDBRow className="text-center">
              <MDBCol sm={12} md={3} lg={3}>
                <div className="event-card">
                  <img
                    variant="top"
                    src="/images/birthday.jpg"
                    style={{ maxWidth: "300px", maxHeight: "425px" }}
                    alt=""
                  />
                  <div>
                    <h3 style={{ fontSize: "1vw" }}>Birthdays</h3>
                  </div>
                </div>
              </MDBCol>

              <MDBCol sm={12} md={3} lg={3}>
                <div className="event-card">
                  <img
                    variant="top"
                    src="/images/corporate.jpg"
                    style={{ maxHeight: "500px" }}
                    alt=""
                  />
                  <div>
                    <h3 style={{ fontSize: "1vw" }}>Corporate</h3>
                  </div>
                </div>
              </MDBCol>

              <MDBCol sm={12} md={3} lg={3}>
                <div className="event-card">
                  <img
                    variant="top"
                    src="/images/party.jpg"
                    style={{ maxWidth: "300px", maxHeight: "425px" }}
                    alt=""
                  />
                  <div>
                    <h3 style={{ fontSize: "1vw" }}>Parties</h3>
                  </div>
                </div>
              </MDBCol>

              <MDBCol sm={12} md={3} lg={3}>
                <div className="event-card">
                  <img
                    variant="top"
                    src="/images/wedding.jpg"
                    style={{ maxWidth: "300px", maxHeight: "425px" }}
                    alt=""
                  />
                  <div>
                    <h3 style={{ fontSize: "1vw" }}>Weddings</h3>
                  </div>
                </div>
              </MDBCol>
            </MDBRow>

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
