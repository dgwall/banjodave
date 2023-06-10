import React from "react";
import "./N.css";
import {
  Lightbox,
  LightboxTrigger,
  LightboxContent,
} from "../../shared/Lightbox";

function PlusPlus() {
  return (
    <section>
      <header>N++</header>
      <article>
        <div className="product">
          <h2 className="header-m">BanjoDave N++ Poster</h2>
          <div className="product-carousel">
            <Lightbox>
              <LightboxTrigger>
                <img
                  src="../../../img/n/poster-npp.png"
                  alt="BanjoDave N++ Poster"
                  className="lightbox-trigger"
                />
              </LightboxTrigger>
              <LightboxContent
                src="../../../img/n/poster-npp.png"
                alt="BanjoDave N++ Poster"
              />
            </Lightbox>
          </div>
          <div className="product-description">
            <h2 className="header-d">BanjoDave N++ Poster</h2>
            <p>A2, Single Sided, Classic Silk, Matt Lamination.</p>
            <p>
              <a href="#top" target="_blank" rel="noreferrer">
                Full-resolution [9920 x 7016] download on Patreon
              </a>
            </p>
            <button className="under-construction">Add to Cart</button>
          </div>
        </div>
      </article>
    </section>
  );
}

export default PlusPlus;
