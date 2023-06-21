import React from "react";
import "./N.css";
import {
  Lightbox,
  LightboxTrigger,
  LightboxContent,
} from "../../components/modals/Lightbox";

function PlusPlus() {
  return (
    <section>
      <header className="under-construction">N++</header>
      <div className="pack-overview">
        <a href="https://www.nplusplus.org/" target="_blank" rel="noreferrer">
          N++
        </a>{" "}
        is the newest, most up-to-date version of N, available on Nintendo
        Switch, Xbox One, PS4, and Steam. I regularly publish maps for N++ under
        the name BanjoDave.
      </div>
      <div className="under-construction">Featured Maps</div>
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
                  loading="lazy"
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
                Full-resolution [9920 x 7016px] download on Patreon
              </a>
            </p>
            <button>Coming Soon</button>
          </div>
        </div>
      </article>
    </section>
  );
}

export default PlusPlus;
