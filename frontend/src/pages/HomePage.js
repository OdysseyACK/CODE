import React from "react";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import GetStartedButton from "../components/GetStartedButton";
import Footer from "../components/Footer";

export default function HomePage() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const isVendor = userInfo?.isVendor || false;

  return (
    <div className="homepage">
      <section className="hero">
        <div>
          <h1 className="heroTitle text-focus-in">Plan Your Perfect Event.</h1>
          <p className="heroBody text-focus-in">
            From weddings to corporate gatherings, our virtual event planner has
            everything you need to make your event a success.
          </p>
        </div>
        {!isVendor && <GetStartedButton />}
      </section>
      <div className="custom-shape-divider-top-1683260030">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>

      <div className="div-ccd">
        <div className="features-section">
          <h1 className="featuresTitle text-center">Features</h1>
          <MDBRow className="features">
            <MDBCol sm={12} md={4} lg={4} className="mb-5">
              <div className="d-flex justify-content-center">
                <div className=" feature text-center">
                  <h3 className="featureTitle">Event Calendar</h3>
                  <p className="featureBody">
                    Keep track of important dates and deadlines with our
                    built-in event calendar.
                  </p>
                </div>
              </div>
            </MDBCol>
            <MDBCol sm={12} md={4} lg={4} className="mb-5">
              <div className="d-flex justify-content-center">
                <div className="feature text-center">
                  <h3 className="featureTitle">Budget Calculator</h3>
                  <p className="featureBody">
                    Stay on track with your finances with our budget calculator.
                  </p>
                </div>
              </div>
            </MDBCol>
            <MDBCol sm={12} md={4} lg={4} className="mb-5">
              <div className="d-flex justify-content-center">
                <div className="feature text-center">
                  <h3 className="featureTitle">Vendor Directory</h3>
                  <p className="featureBody">
                    Browse and book vendors for your event directly through our
                    site.
                  </p>
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </div>
      </div>

      <div className="custom-shape-divider-bottom-1683291772">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>

      <div className="event-section">
        <div className="eventTypeTitle">
          <h1 className=" text-center">Types of Events</h1>
        </div>
        <MDBRow className="text-center">
          <MDBCol sm={12} md={6} lg={3} className="mb-5">
            <div className="d-flex justify-content-center">
              <div className="birthday-book">
                <div className="birthday-cover">
                  <p>Birthdays</p>
                </div>
              </div>
            </div>
          </MDBCol>
          <MDBCol sm={12} md={6} lg={3} className="mb-5">
            <div className="d-flex justify-content-center">
              <div className="corporate-book">
                <div className="corporate-cover">
                  <p>Corporate</p>
                </div>
              </div>
            </div>
          </MDBCol>
          <MDBCol sm={12} md={6} lg={3} className="mb-5">
            <div className="d-flex justify-content-center">
              <div className="party-book">
                <div className="party-cover color-change-5x">
                  <p>Parties</p>
                </div>
              </div>
            </div>
          </MDBCol>
          <MDBCol sm={12} md={6} lg={3} className="mb-5">
            <div className="d-flex justify-content-center">
              <div className="wedding-book">
                <div className="wedding-cover">
                  <p>Weddings</p>
                </div>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </div>

      <div className="custom-shape-divider-top-1683298748">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
            className="shape-fill"
          ></path>
        </svg>
      </div>

      <div className="offer-section">
        <div className="offer-title">
          <h1 className="text-center">What We Offer</h1>
        </div>
        <div className="service-container">
          <div className="service-item">
            <div className="service-item-content">
              <div>
                <i className="fa-solid fa-2xl fa-bowl-rice mb-4"></i>
              </div>
              <div>
                <h5>Catering</h5>
              </div>
            </div>
          </div>
          <div className="service-item">
            <div className="service-item-content">
              <div>
                <i className="fa-solid fa-2xl fa-couch mb-4"></i>
              </div>
              <div>
                <h5>Decor</h5>
              </div>
            </div>
          </div>
          <div className="service-item">
            <div className="service-item-content">
              <div>
                <i className="fa-solid fa-2xl fa-guitar mb-4"></i>
              </div>
              <div>
                <h5>Entertainment</h5>
              </div>
            </div>
          </div>
          <div className="service-item">
            <div className="service-item-content">
              <div>
                <i className="fa-solid fa-2xl fa-leaf mb-4"></i>
              </div>
              <div>
                <h5>Floral</h5>
              </div>
            </div>
          </div>
          <div className="service-item">
            <div className="service-item-content">
              <div>
                <i className="fa-solid fa-2xl fa-user-tie mb-4"></i>
              </div>
              <div>
                <h5>Organisers</h5>
              </div>
            </div>
          </div>
          <div className="service-item">
            <div className="service-item-content">
              <div>
                <i className="fa-solid fa-2xl fa-camera mb-4"></i>
              </div>
              <div>
                <h5>Photography</h5>
              </div>
            </div>
          </div>
          <div className="service-item">
            <div className="service-item-content">
              <div>
                <i className="fa-solid fa-2xl fa-location-dot mb-4"></i>
              </div>
              <div>
                <h5>Venue</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="custom-shape-divider-bottom-1683299503">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V6c0,21.6,291,111.46,741,110.26,445.39,3.6,459-88.3,459-110.26V0Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>

      <div className="partners-section" style={{ marginBottom: "-100px" }}>
        <div className="partners-container">
          <div className="partners-title">
            <h2>Our Partners</h2>
          </div>
          <div className="sponsors-container">
            <div className="partner-cards">
              <div
                style={{ backgroundImage: "url(./images/cater1.png)" }}
              ></div>
              <div
                style={{ backgroundImage: "url(./images/cater2.png)" }}
              ></div>
              <div
                style={{ backgroundImage: "url(./images/media1.png)" }}
              ></div>
              <div
                style={{ backgroundImage: "url(./images/decor1.png)" }}
              ></div>
              <div
                style={{ backgroundImage: "url(./images/decor2.png)" }}
              ></div>
              <div
                style={{ backgroundImage: "url(./images/floral1.png)" }}
              ></div>
              <div
                style={{ backgroundImage: "url(./images/photo1.png)" }}
              ></div>
              <div
                style={{ backgroundImage: "url(./images/organiser3.png)" }}
              ></div>
              <div
                style={{ backgroundImage: "url(./images/venue1.jpg)" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
