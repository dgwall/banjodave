import React from "react";
import "./Games.css";
import emblem from "./../../assets/images/games/emblem.png";

function Games() {
  return (
    <section>
      <header>
        <h1>
          <span>0DG</span>ames
        </h1>
      </header>
      <div className="overview-container">
        <div className="overview">
          <h2>Cutting-Edge Throwbacks</h2>
          <p>
            Rooted in the vision of a solo dev, 0DGames brings to life action
            games that stand out. I'm dedicated to crafting experiences
            characterized by unique artwork, precise controls, and compelling
            mechanics, which stretch the imagination and challenge. For the
            casual gamer looking for a fun diversion, and the elite player
            seeking to uncover advanced techniques, 0DGames has something for
            you.
          </p>
        </div>
        <div className="emblem">
          <img src={emblem} alt="0DG Emblem" />
        </div>
      </div>
      <article>
        <h2>Updates</h2>
        <p className="under-construction">Under Construction.</p>
      </article>
      <article>
        <h2>Games</h2>
        <p className="under-construction">Banjo's Arcade</p>
      </article>
    </section>
  );
}

export default Games;
