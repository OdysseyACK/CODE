import React from "react";
import Footer from "../components/Footer";

function Portfolio() {
  return (
    <div style={{ marginTop: "10rem", paddingBottom: "10rem" }}>
      <h2
        style={{
          marginBottom: "2rem",
          fontSize: "60px",
          color: "white",
          fontFamily: "lato",
          fontStyle: "italic",
        }}
        className="text-center"
      >
        Portfolio
      </h2>
      <div className="container portfolio">
        <figure className="portfolio-grid">
          <img
            src="../images/andra-c-taylor-jr-soJBvazDKL0-unsplash.jpg"
            alt=""
            className="portfolio-img"
          />
        </figure>
        <figure className="portfolio-grid">
          <img
            src="../images/ben-rosett-nYugmV-SY6s-unsplash.jpg"
            alt="The Clifton Suspension Bridge"
            className="portfolio-img"
          />
        </figure>
        <figure className="portfolio-grid">
          <img
            className="portfolio-img"
            src="../images/bruno-cervera-ZpNBwBR38fA-unsplash.jpg"
            alt="Sunset and boats"
          />
        </figure>
        <figure className="portfolio-grid">
          <img
            className="portfolio-img"
            src="../images/CompanyDnD.jpg"
            alt="a river in the snow"
          />
        </figure>
        <figure className="portfolio-grid">
          <img
            className="portfolio-img"
            src="../images/corporate.jpg"
            alt="a single checked balloon"
          />
        </figure>
        <figure className="portfolio-grid">
          <img
            className="portfolio-img"
            src="../images/kal-visuals-sAANwlejqTQ-unsplash.jpg"
            alt="a hot air balloon shaped like a dog"
          />
        </figure>
        <figure className="portfolio-grid">
          <img
            className="portfolio-img"
            src="../images/DJ4.jpg"
            alt="View from a hot air balloon of other balloons"
          />
        </figure>
        <figure className="portfolio-grid">
          <img
            className="portfolio-img"
            src="../images/events2.jpg"
            alt="a balloon fairground ride"
          />
        </figure>
        <figure className="portfolio-grid">
          <img
            className="portfolio-img"
            src="../images/mohammad-saifullah-NEqPK_bF3HQ-unsplash.jpg"
            alt="sunrise over a harbor"
          />
        </figure>
        <figure className="portfolio-grid">
          <img
            className="portfolio-img"
            src="../images/danny-howe-bn-D2bCvpik-unsplash.jpg"
            alt="three hot air balloons in a blue sky"
          />
        </figure>
        <figure className="portfolio-grid">
          <img
            className="portfolio-img"
            src="../images/dave-lastovskiy-RygIdTavhkQ-unsplash.jpg"
            alt=""
          />
        </figure>
        <figure className="portfolio-grid">
          <img
            className="portfolio-img"
            src="../images/wedding.jpg"
            alt="the Toronto light up sign at night"
          />
        </figure>
        <figure className="portfolio-grid">
          <img className="portfolio-img" src="../images/Drummer2.jpg" alt="" />
        </figure>
        <figure className="portfolio-grid">
          <img
            className="portfolio-img"
            src="../images/nathan-dumlao-5BB_atDT4oA-unsplash.jpg"
            alt=""
          />
        </figure>
        <figure className="portfolio-grid">
          <img
            className="portfolio-img"
            src="../images/andrea-mininni-VLlkOJdzLG0-unsplash.jpg"
            alt=""
          />
        </figure>
        <figure className="portfolio-grid">
          <img
            className="portfolio-img"
            src="../images/kal-visuals-6TNTdttwMC8-unsplash.jpg"
            alt=""
          />
        </figure>
        <figure className="portfolio-grid">
          <img
            className="portfolio-img"
            src="../images/photos-by-lanty-O38Id_cyV4M-unsplash.jpg"
            alt=""
          />
        </figure>
      </div>
      <Footer />
    </div>
  );
}

export default Portfolio;
