import React from "react";
import "./Games.css";
import emblem from "./../../assets/images/games/emblem.png";

function BanjosArcade() {
  return (
    <section>
      <header>
        <h1>
          <span>0DG</span>
        </h1>
      </header>

      <div className="overview-container">
        <div className="overview">
          <h2>Banjo's Arcade</h2>
          <p className="under-construction">Under Construction</p>
        </div>
        <div className="emblem">
          <img src={emblem} alt="0DG Emblem" />
        </div>
      </div>
    </section>
  );
}

export default BanjosArcade;
