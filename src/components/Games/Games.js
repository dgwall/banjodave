import React from "react";
import "./Games.css";
import emblem from "./../../assets/images/games/emblem.png";

function Games() {
  return (
    <section>
      <header>
        <h1>0DGames</h1>
        <h2>Cutting-Edge Throwbacks</h2>
      </header>
      <div className="overview-container">
        <div className="overview">
          <p>
            Rooted in the vision of a dedicated solo developer, 0DGames brings
            to life action games that stand out. I'm dedicated to creating
            experiences characterized by unique artwork that stretches the
            imagination, controls that respond with the precision of a thought,
            and mechanics that are as compelling as they are varied. No matter
            your skill level, from the casual gamer looking for a fun diversion
            to the elite player seeking the next big challenge, 0DGames has
            something for you.
          </p>
        </div>
      </div>
      <div className="emblem">
        <img src={emblem} alt="0DG Emblem" />
      </div>
    </section>
  );
}

export default Games;
