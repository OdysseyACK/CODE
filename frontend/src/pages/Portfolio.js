import React from "react";

function Portfolio() {
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
      <h2 className="text-center">Portfolio</h2>
      <div className="container portfolio">
        <figure className="portfolio-grid">
          <img
            src="https://assets.codepen.io/12005/windmill.jpg"
            alt="A windmill"
            className="portfolio-img"
          />
        </figure>
        <figure className="portfolio-grid">
          <img
            src="https://assets.codepen.io/12005/suspension-bridge.jpg"
            alt="The Clifton Suspension Bridge"
            className="portfolio-img"
          />
        </figure>
        <figure className="portfolio-grid">
          <img
            className="portfolio-img"
            src="https://assets.codepen.io/12005/sunset.jpg"
            alt="Sunset and boats"
          />
        </figure>
        <figure className="portfolio-grid">
          <img
            className="portfolio-img"
            src="https://assets.codepen.io/12005/snowy.jpg"
            alt="a river in the snow"
          />
        </figure>
        <figure className="portfolio-grid">
          <img
            className="portfolio-img"
            src="https://assets.codepen.io/12005/bristol-balloons1.jpg"
            alt="a single checked balloon"
          />
        </figure>
        <figure className="portfolio-grid">
          <img
            className="portfolio-img"
            src="https://assets.codepen.io/12005/dog-balloon.jpg"
            alt="a hot air balloon shaped like a dog"
          />
        </figure>
        <figure className="portfolio-grid">
          <img
            className="portfolio-img"
            src="https://assets.codepen.io/12005/abq-balloons.jpg"
            alt="View from a hot air balloon of other balloons"
          />
        </figure>
        <figure className="portfolio-grid">
          <img
            className="portfolio-img"
            src="https://assets.codepen.io/12005/disney-balloon.jpg"
            alt="a balloon fairground ride"
          />
        </figure>
        <figure className="portfolio-grid">
          <img
            className="portfolio-img"
            src="https://assets.codepen.io/12005/bristol-harbor.jpg"
            alt="sunrise over a harbor"
          />
        </figure>
        <figure className="portfolio-grid">
          <img
            className="portfolio-img"
            src="https://assets.codepen.io/12005/bristol-balloons2.jpg"
            alt="three hot air balloons in a blue sky"
          />
        </figure>
        <figure className="portfolio-grid">
          <img
            className="portfolio-img"
            src="https://assets.codepen.io/12005/toronto.jpg"
            alt="the Toronto light up sign at night"
          />
        </figure>
      </div>
    </div>
  );
}

export default Portfolio;
