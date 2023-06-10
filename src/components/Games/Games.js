import React from "react";
import "./Games.css";
import emblem from "./../../assets/images/games/emblem.png";
import SkewDiv from "./SkewDiv";

const gameData = [
  {
    imgSrc: "img/0dg/tile-ba.png",
    dest: "#top",
    title: "Banjo's Arcade",
    description: "Retro-remake collection.",
  },
  {
    imgSrc: "img/0dg/tile-ag.png",
    dest: "#top",
    title: "Another Game",
    description: "Something else.",
  },
  // Add more game data objects here as needed
];

function Games() {
  return (
    <section>
      <header>
        <h1>
          <span>0DG</span>
        </h1>
      </header>

      <div className="overview-container">
        <div className="overview">
          <h2>Cutting-Edge Throwbacks</h2>
          <p>
            Rooted in the vision of a solo dev, <span>0DGames</span> brings to
            life action games that stand out. I'm dedicated to crafting
            experiences characterized by unique artwork, precise controls, and
            compelling mechanics, which stretch the imagination and challenge.
            For the casual gamer looking for a fun diversion, and the elite
            player seeking to uncover advanced techniques, 0DGames has something
            for you.
          </p>
        </div>
        <div className="emblem">
          <img src={emblem} alt="0DG Emblem" />
        </div>
      </div>

      <section className="content">
        <article>
          <div className="game-tiles">
            {gameData.map((game, index) => (
              <SkewDiv
                key={index}
                imgSrc={game.imgSrc}
                altText={game.title}
                title={game.title}
                description={game.description}
              />
            ))}
          </div>
        </article>
      </section>
    </section>
  );
}

export default Games;
